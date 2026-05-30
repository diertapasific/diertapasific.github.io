import { lazy, Suspense } from 'react'
import {
  ArrowRight,
  ChatCircle,
  LinkedinLogo,
  GithubLogo,
  Envelope,
} from '@phosphor-icons/react'
import type { Page } from '../App'

const Scene3D = lazy(() => import('../components/Scene3D'))

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dierta-pasific/', Icon: LinkedinLogo },
  { label: 'GitHub', href: 'http://github.com/diertapasific', Icon: GithubLogo },
  { label: 'Email', href: 'mailto:pasificdierta@gmail.com', Icon: Envelope },
]

interface HomeProps {
  onNavigate: (page: Page) => void
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-zinc-950">
      {/* 3D scene — full bleed background */}
      <div className="absolute inset-0">
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-blue-600/20 blur-3xl animate-pulse-glow" />
            </div>
          }
        >
          <Scene3D />
        </Suspense>
      </div>

      {/* Readability scrim — strong on the left where text lives */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-transparent dark:from-zinc-950 dark:via-zinc-950/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 min-h-[100dvh] flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-6 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse-glow" />
              <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-[0.2em]">
                Jr AI Engineer · Staffinc
              </span>
            </div>

            <h1
              className="text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.9] text-white animate-fade-in"
              style={{ animationDelay: '0.05s' }}
            >
              Dierta
              <br />
              <span className="text-zinc-600">Pasific</span>
            </h1>

            <p
              className="mt-7 text-base md:text-lg text-zinc-400 leading-relaxed max-w-[46ch] animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              Forward Deployed Engineer bridging technical execution and
              real-world business needs. I build automation, AI, and backend
              systems that actually ship and scale.
            </p>

            <div
              className="mt-9 flex flex-wrap items-center gap-3 animate-fade-in"
              style={{ animationDelay: '0.15s' }}
            >
              <button
                onClick={() => onNavigate('chat')}
                className="group flex items-center gap-2 px-5 py-3 rounded-full bg-blue-500 text-white text-sm font-semibold transition-all duration-150 hover:bg-blue-400 active:scale-95"
              >
                <ChatCircle size={17} weight="fill" />
                Chat with ChatDP
                <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => onNavigate('projects')}
                className="px-5 py-3 rounded-full border border-white/15 text-zinc-200 text-sm font-semibold transition-all duration-150 hover:bg-white/[0.06] hover:border-white/25 active:scale-95"
              >
                View work
              </button>
            </div>

            <div
              className="mt-10 flex items-center gap-5 animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <Icon size={19} weight="fill" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll / drag hint */}
      <div className="absolute bottom-6 right-6 md:right-12 z-10 text-[10px] font-mono text-zinc-600 tracking-wide animate-fade-in" style={{ animationDelay: '0.3s' }}>
        move cursor to orbit
      </div>
    </section>
  )
}
