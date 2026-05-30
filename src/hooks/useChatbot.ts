import { useState, useCallback } from 'react'

const WORKER_URL = import.meta.env.VITE_CHATDP_WORKER_URL as string

export interface Message {
  id: string
  role: 'user' | 'bot'
  content: string
}

export type ModelStatus = 'ready' | 'error'

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      content: "Hey! I'm ChatDP, Dierta's personal AI assistant. Ask me anything about him — his projects, background, or even what he does for fun.",
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const modelStatus: ModelStatus = 'ready'

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    // Build conversation history in OpenAI format (exclude welcome message)
    const history = [...messages.filter(m => m.id !== 'welcome'), userMsg].map(m => ({
      role: m.role === 'bot' ? 'assistant' : 'user',
      content: m.content,
    }))

    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json() as { reply: string }
      setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'bot', content: data.reply }])
    } catch {
      setMessages(prev => [
        ...prev,
        { id: crypto.randomUUID(), role: 'bot', content: "Something went wrong. Please try again in a moment." },
      ])
    } finally {
      setIsTyping(false)
    }
  }, [messages, isTyping])

  return { messages, sendMessage, modelStatus, isTyping }
}
