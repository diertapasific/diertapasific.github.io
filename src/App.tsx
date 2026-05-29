import { useState, useRef, useEffect } from 'react'
import { ChatCircle } from '@phosphor-icons/react'
import Nav from './components/Nav'
import Home from './pages/Home'
import Chat from './pages/Chat'
import About from './pages/About'
import Projects from './pages/Projects'
import Experiences from './pages/Experiences'
import Blog from './pages/Blog'

export type Page = 'home' | 'chat' | 'projects' | 'experiences' | 'blog' | 'about'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [isDark, setIsDark] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [page])

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home onNavigate={setPage} />
      case 'chat':
        return (
          <div className="h-[100dvh] pt-16 md:pt-20">
            <Chat />
          </div>
        )
      case 'projects':
        return <div className="pt-24 md:pt-28"><Projects /></div>
      case 'experiences':
        return <div className="pt-24 md:pt-28"><Experiences /></div>
      case 'blog':
        return <div className="pt-24 md:pt-28"><Blog /></div>
      case 'about':
        return <div className="pt-24 md:pt-28"><About /></div>
    }
  }

  return (
    <div className="relative bg-zinc-50 dark:bg-zinc-950">
      <Nav
        currentPage={page}
        onNavigate={setPage}
        isDark={isDark}
        onToggleTheme={() => setIsDark(v => !v)}
      />

      <div
        ref={scrollRef}
        key={page}
        className="h-dvh overflow-y-auto scrollbar-none animate-fade-in"
      >
        {renderPage()}
      </div>

      {/* Quick-access chat — everywhere except the hero (which has its own CTA) and chat itself */}
      {page !== 'home' && page !== 'chat' && (
        <button
          onClick={() => setPage('chat')}
          aria-label="Chat with ChatDP"
          className="group fixed bottom-5 right-5 md:bottom-7 md:right-7 z-40 flex items-center gap-2.5 pl-3.5 pr-4 py-3 rounded-full bg-blue-500 text-white shadow-[0_8px_30px_rgba(37,99,235,0.4)] transition-all duration-200 hover:bg-blue-400 hover:-translate-y-0.5 active:scale-95 animate-fade-in"
        >
          <span className="relative flex items-center justify-center">
            <ChatCircle size={18} weight="fill" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-blue-500 animate-pulse-glow" />
          </span>
          <span className="text-sm font-semibold max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 group-hover:max-w-[120px] group-hover:opacity-100 md:max-w-[120px] md:opacity-100">
            Ask ChatDP
          </span>
        </button>
      )}

      {/* Fixed film grain for depth — never on a scrolling layer */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.025] mix-blend-overlay grain-overlay" />
    </div>
  )
}
