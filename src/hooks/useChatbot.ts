import { useState, useEffect, useRef, useCallback } from 'react'

declare global {
  interface Window {
    transformers: {
      AutoTokenizer: {
        from_pretrained: (model: string) => Promise<unknown>
      }
    }
    ort: {
      Tensor: new (type: string, data: BigInt64Array, dims: number[]) => unknown
      InferenceSession: { create: (path: string) => Promise<unknown> }
    }
  }
}

const SEQUENCE_LENGTH = 8
const CONFIDENCE_THRESHOLD = 0.6

interface DataItem {
  question: string
  answer: string
}

export interface Message {
  id: string
  role: 'user' | 'bot'
  content: string
}

export type ModelStatus = 'loading' | 'ready' | 'error' | 'mobile-disabled'

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0)
  const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0))
  const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0))
  return magA === 0 || magB === 0 ? 0 : dot / (magA * magB)
}

function meanPooling(outputs: Record<string, { data: Float32Array }>): number[] {
  const key = Object.keys(outputs)[0]
  return Array.from(outputs[key].data)
}

async function waitFor<T>(getter: () => T | undefined, maxMs = 15000): Promise<T> {
  const interval = 300
  let elapsed = 0
  while (elapsed < maxMs) {
    const value = getter()
    if (value) return value
    await new Promise(r => setTimeout(r, interval))
    elapsed += interval
  }
  throw new Error('Timeout waiting for dependency')
}

type XenovaTokenizer = (
  text: string,
  opts?: Record<string, unknown>
) => Promise<{
  input_ids: { data: BigInt64Array }
  attention_mask: { data: BigInt64Array }
}>

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [modelStatus, setModelStatus] = useState<ModelStatus>('loading')
  const [isTyping, setIsTyping] = useState(false)

  const sessionRef = useRef<unknown>(null)
  const tokenizerRef = useRef<XenovaTokenizer | null>(null)
  const datasetRef = useRef<DataItem[]>([])
  const embeddingsRef = useRef<Record<string, number[]>>({})

  const pushMessage = useCallback((role: 'user' | 'bot', content: string) => {
    setMessages(prev => [...prev, { id: crypto.randomUUID(), role, content }])
  }, [])

  const runInference = useCallback(async (text: string) => {
    const tokenizer = tokenizerRef.current!
    const session = sessionRef.current as {
      run: (inputs: Record<string, unknown>) => Promise<Record<string, { data: Float32Array }>>
    }

    const encoded = await tokenizer(text, {
      padding: 'max_length',
      truncation: true,
      max_length: SEQUENCE_LENGTH,
    })

    const inputTensor = new window.ort.Tensor('int64', encoded.input_ids.data, [1, SEQUENCE_LENGTH])
    const attnTensor = new window.ort.Tensor('int64', encoded.attention_mask.data, [1, SEQUENCE_LENGTH])

    const outputs = await session.run({ input_ids: inputTensor, attention_mask: attnTensor })
    return meanPooling(outputs)
  }, [])

  const findBestMatch = useCallback((embedding: number[]): string => {
    let best = { score: -1, question: '' }
    for (const [q, emb] of Object.entries(embeddingsRef.current)) {
      const score = cosineSimilarity(embedding, emb)
      if (score > best.score) best = { score, question: q }
    }
    if (best.score < CONFIDENCE_THRESHOLD) {
      return "I'm not sure about that. Feel free to contact Dierta directly via LinkedIn!"
    }
    return datasetRef.current.find(d => d.question === best.question)?.answer ?? "I'm not sure about that."
  }, [])

  useEffect(() => {
    if (window.innerWidth < 768) {
      setModelStatus('mobile-disabled')
      pushMessage('bot', "The chatbot is only available on desktop. Explore the site to learn more about Dierta — his background, experiences, and projects.")
      return
    }

    let cancelled = false

    async function boot() {
      try {
        const [transformersCtor, ortCtor] = await Promise.all([
          waitFor(() => window.transformers?.AutoTokenizer),
          waitFor(() => window.ort?.InferenceSession),
        ])

        const [tokenizer, session, dataRes] = await Promise.all([
          (transformersCtor as typeof window.transformers.AutoTokenizer).from_pretrained('Xenova/bert-base-uncased'),
          (ortCtor as typeof window.ort.InferenceSession).create('/assets/models/chatbot-model.onnx'),
          fetch('/assets/data/data.json'),
        ])

        if (cancelled) return

        tokenizerRef.current = tokenizer as XenovaTokenizer
        sessionRef.current = session
        datasetRef.current = await dataRes.json()

        for (const item of datasetRef.current) {
          if (cancelled) return
          embeddingsRef.current[item.question] = await runInference(item.question)
        }

        if (cancelled) return
        setModelStatus('ready')
        pushMessage('bot', "Hello! I'm ChatDP, Dierta's personal AI assistant. Ask me anything about him — try a full sentence like \"What are your projects?\" or \"Where do you work?\"")
      } catch (err) {
        if (cancelled) return
        console.error('Chatbot load error:', err)
        setModelStatus('error')
        pushMessage('bot', "ChatDP had trouble loading. Please refresh the page and try again.")
      }
    }

    boot()
    return () => { cancelled = true }
  }, [pushMessage, runInference])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || modelStatus !== 'ready' || isTyping) return

    pushMessage('user', text)
    setIsTyping(true)

    try {
      const embedding = await runInference(text)
      const response = findBestMatch(embedding)
      await new Promise(r => setTimeout(r, 350))
      pushMessage('bot', response)
    } catch {
      pushMessage('bot', "Something went wrong. Please try again.")
    } finally {
      setIsTyping(false)
    }
  }, [modelStatus, isTyping, pushMessage, runInference, findBestMatch])

  return { messages, sendMessage, modelStatus, isTyping }
}
