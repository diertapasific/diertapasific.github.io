import { useState, useRef, useEffect } from 'react'
import { PaperPlaneTilt, Robot, CircleNotch, WarningCircle } from '@phosphor-icons/react'
import { useChatbot } from '../hooks/useChatbot'

export default function Chat() {
  const [input, setInput] = useState('')
  const { messages, sendMessage, modelStatus, isTyping } = useChatbot()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    sendMessage(text)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const inputDisabled = modelStatus !== 'ready' || isTyping

  const statusEl = {
    loading: (
      <span className="flex items-center gap-1.5 text-xs text-zinc-500">
        <CircleNotch size={10} className="animate-spin text-amber-400" />
        Loading model...
      </span>
    ),
    ready: (
      <span className="flex items-center gap-1.5 text-xs text-zinc-500">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse-glow" />
        Online
      </span>
    ),
    error: (
      <span className="flex items-center gap-1.5 text-xs text-red-400">
        <WarningCircle size={10} />
        Unavailable
      </span>
    ),
    'mobile-disabled': (
      <span className="text-xs text-zinc-500">Desktop only</span>
    ),
  }[modelStatus]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-3 px-6 md:px-8 py-4 border-b border-zinc-200 dark:border-zinc-800/60">
        <div className="w-8 h-8 rounded-xl bg-zinc-900 dark:bg-zinc-800 border border-white/10 flex items-center justify-center flex-shrink-0">
          <Robot size={15} weight="fill" className="text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-none tracking-tight">ChatDP</p>
          <div className="mt-0.5">{statusEl}</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 md:px-8 py-6 space-y-4">
        {modelStatus === 'loading' && messages.length === 0 && (
          <div className="flex items-start gap-2.5 animate-fade-in">
            <div className="w-7 h-7 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-2 pt-1">
              <div className="h-3.5 w-52 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse" />
              <div className="h-3.5 w-36 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse" />
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 animate-fade-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            style={{ animationDelay: `${i * 0.03}s` }}
          >
            {msg.role === 'bot' && (
              <div className="w-7 h-7 rounded-xl bg-zinc-900 dark:bg-zinc-800 border border-white/10 flex items-center justify-center flex-shrink-0 mb-0.5">
                <Robot size={13} weight="fill" className="text-blue-400" />
              </div>
            )}
            <div
              className={`
                max-w-[78%] md:max-w-[62%] px-4 py-3 text-sm leading-relaxed
                ${msg.role === 'user'
                  ? 'bg-blue-600 dark:bg-blue-500 text-white rounded-2xl rounded-br-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800/70 text-zinc-800 dark:text-zinc-200 rounded-2xl rounded-bl-sm border border-zinc-200 dark:border-zinc-700/50'
                }
              `}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-end gap-2 animate-fade-in">
            <div className="w-7 h-7 rounded-xl bg-zinc-900 dark:bg-zinc-800 border border-white/10 flex items-center justify-center flex-shrink-0">
              <Robot size={13} weight="fill" className="text-blue-400" />
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl rounded-bl-sm px-4 py-3.5">
              <div className="flex items-center gap-1">
                {[0, 150, 300].map(delay => (
                  <span
                    key={delay}
                    className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-dot-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 px-4 md:px-8 py-4 border-t border-zinc-200 dark:border-zinc-800/60">
        <div
          className={`
            flex items-center gap-3 bg-white dark:bg-zinc-900 border rounded-2xl px-4 py-3
            transition-colors duration-150
            ${inputDisabled
              ? 'border-zinc-200 dark:border-zinc-800'
              : 'border-zinc-300 dark:border-zinc-700 focus-within:border-zinc-400 dark:focus-within:border-zinc-500'
            }
          `}
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={inputDisabled}
            placeholder={
              modelStatus === 'loading' ? 'Loading ChatDP...' :
              modelStatus === 'mobile-disabled' ? 'Available on desktop only' :
              'Ask me anything about Dierta...'
            }
            className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={inputDisabled || !input.trim()}
            className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600 dark:bg-blue-500 text-white flex-shrink-0 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 hover:bg-blue-500 dark:hover:bg-blue-400"
          >
            {isTyping
              ? <CircleNotch size={13} className="animate-spin" />
              : <PaperPlaneTilt size={13} weight="fill" />
            }
          </button>
        </div>
        <p className="text-center text-[10px] text-zinc-400 dark:text-zinc-600 mt-2 font-mono">
          responses based on Dierta's profile data
        </p>
      </div>
    </div>
  )
}
