import { useState } from 'react'
import {
  House,
  ChatCircle,
  Wrench,
  Briefcase,
  Article,
  User,
  List,
  X,
  Sun,
  Moon,
  LinkedinLogo,
  GithubLogo,
  Envelope,
} from '@phosphor-icons/react'
import type { Page } from '../App'

const NAV_ITEMS: { page: Page; label: string; Icon: React.ElementType }[] = [
  { page: 'home', label: 'Home', Icon: House },
  { page: 'projects', label: 'Projects', Icon: Wrench },
  { page: 'experiences', label: 'Experience', Icon: Briefcase },
  { page: 'blog', label: 'Blog', Icon: Article },
  { page: 'about', label: 'About', Icon: User },
  { page: 'chat', label: 'Chat', Icon: ChatCircle },
]

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dierta-pasific/', Icon: LinkedinLogo },
  { label: 'GitHub', href: 'http://github.com/diertapasific', Icon: GithubLogo },
  { label: 'Email', href: 'mailto:pasificdierta@gmail.com', Icon: Envelope },
]

interface NavProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  isDark: boolean
  onToggleTheme: () => void
}

export default function Nav({ currentPage, onNavigate, isDark, onToggleTheme }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const go = (page: Page) => {
    onNavigate(page)
    setMenuOpen(false)
  }

  return (
    <>
      {/* ===== Desktop floating glass pill ===== */}
      <nav className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-40 items-center gap-1 px-2 py-2 rounded-full border border-white/10 bg-zinc-900/60 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_30px_rgba(0,0,0,0.4)]">
        <button
          onClick={() => go('home')}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 mr-1 transition-transform active:scale-90"
          aria-label="Home"
        >
          <span className="text-zinc-950 text-sm font-bold tracking-tight">D</span>
        </button>

        {NAV_ITEMS.slice(1).map(({ page, label }) => {
          const active = currentPage === page
          return (
            <button
              key={page}
              onClick={() => go(page)}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 active:scale-95
                ${active
                  ? 'bg-white/10 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                }
              `}
            >
              {label}
            </button>
          )
        })}

        <div className="w-px h-5 bg-white/10 mx-1" />

        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="flex items-center justify-center w-8 h-8 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all"
        >
          {isDark ? <Sun size={15} weight="fill" /> : <Moon size={15} weight="fill" />}
        </button>
      </nav>

      {/* ===== Mobile top bar ===== */}
      <div className="md:hidden fixed top-3 left-3 right-3 z-40 flex items-center justify-between px-3 py-2.5 rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <button
          onClick={() => go('home')}
          className="flex items-center gap-2.5"
          aria-label="Home"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500 text-zinc-950 text-xs font-bold">D</span>
          <span className="text-sm font-semibold text-white tracking-tight">Dierta Pasific</span>
        </button>
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle navigation"
          className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 text-zinc-300 active:scale-90 transition-transform"
        >
          {menuOpen ? <X size={16} weight="bold" /> : <List size={16} weight="bold" />}
        </button>
      </div>

      {/* ===== Mobile full-screen menu ===== */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-zinc-950/95 backdrop-blur-xl flex flex-col justify-center px-8 animate-fade-in">
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ page, label, Icon }, i) => {
              const active = currentPage === page
              return (
                <li
                  key={page}
                  className="animate-fade-in"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <button
                    onClick={() => go(page)}
                    className={`
                      w-full flex items-center gap-4 py-3 text-3xl font-semibold tracking-tight transition-colors
                      ${active ? 'text-blue-400' : 'text-zinc-500 hover:text-white'}
                    `}
                  >
                    <Icon size={22} weight={active ? 'fill' : 'regular'} />
                    {label}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mt-10 flex items-center gap-5">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <Icon size={22} weight="fill" />
              </a>
            ))}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="ml-auto flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
            >
              {isDark ? <Sun size={18} weight="fill" /> : <Moon size={18} weight="fill" />}
              {isDark ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
