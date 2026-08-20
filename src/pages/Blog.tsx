import { ArrowUpRight } from '@phosphor-icons/react'
interface BlogPost {
  title: string
  date: string
  preview: string
  href: string
  featured?: boolean
}
const POSTS: BlogPost[] = [
  {
    title: 'What if learning felt like Duolingo, but for anything?',
    date: 'Jun 01, 2026',
    preview: "I built Beacon — an AI-powered learning app that generates a personalized curriculum for any skill you want to learn.",
    href: 'https://medium.com/@diertapasific/what-if-duolingo-could-teach-you-anything-9409db920cac',
    featured: true,
  },
  {
    title: 'SumTube: YouTube Videos into Instant Summaries',
    date: 'Sep 09, 2025',
    preview: "YouTube has become the largest library of knowledge on the internet. From hour-long podcasts to educational lectures — here's how I built a tool to summarize it all instantly.",
    href: 'https://medium.com/@diertapasific/sumtube-turning-youtube-videos-into-instant-summaries-61b5e675595d',
  },
  {
    title: 'Cardify: LLM-Powered Flashcard Generator',
    date: 'Jul 02, 2025',
    preview: "Have you ever felt overwhelmed by a dense PDF you need to study? Here's how I turned the Groq LLM API into an automatic flashcard factory.",
    href: 'https://medium.com/@diertapasific/cardify-llm-powered-flashcard-generator-f0385585c924',
  },
  {
    title: 'Rupcara: AI That Reads Your Money',
    date: 'May 27, 2025',
    preview: "Imagine visually impaired individuals instantly recognizing the value of their money just by showing it to a camera. Here's how I built it with ResNet-18.",
    href: 'https://medium.com/@diertapasific/rupcara-empowering-the-visually-impaired-with-ai-money-recognition-adabc083be6d',
  },
  {
    title: 'ChatDP: AI-Powered Portfolio Chatbot',
    date: 'Apr 04, 2025',
    preview: "A portfolio website tells who you are — but I wanted mine to talk back. Here's the story behind building a chatbot that runs entirely in the browser.",
    href: 'https://medium.com/@diertapasific/chatdp-ai-powered-portfolio-chatbot-a9afd35141a3',
  },
  {
    title: 'Getting Started with Mobile App Development',
    date: 'Nov 07, 2023',
    preview: 'Mobile app development is the process of creating software for mobile devices. A practical introduction for anyone starting out on iOS or Android.',
    href: 'https://medium.com/@diertapasific/introduction-to-mobile-app-development-48098b2048c4',
  },
]
export default function Blog() {
  const [featured, ...rest] = POSTS
  return (
    <div className="px-6 md:px-10 lg:px-14 max-w-4xl mx-auto pb-20">
      <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-[0.18em] mb-5 animate-fade-in">
        Writing
      </p>
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[0.95] animate-fade-in" style={{ animationDelay: '0.04s' }}>
        Blog
      </h1>
      <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-3 animate-fade-in" style={{ animationDelay: '0.08s' }}>
        Thoughts on AI, software, and building things.
      </p>
      {/* Featured post */}
      <a
        href={featured.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-10 block border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 hover:border-blue-500/40 dark:hover:border-blue-500/30 bg-white dark:bg-zinc-900/40 transition-all duration-200 animate-fade-in"
        style={{ animationDelay: '0.12s' }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-semibold text-blue-500 uppercase tracking-widest">
              Latest
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mt-2 leading-snug max-w-[44ch]">
              {featured.title}
            </h2>
          </div>
          <div className="flex-shrink-0 w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-500/5 transition-all duration-200">
            <ArrowUpRight size={15} className="text-zinc-400 dark:text-zinc-600 group-hover:text-blue-500 transition-colors" />
          </div>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mt-3 max-w-[58ch]">
          {featured.preview}
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-4 font-mono">{featured.date}</p>
      </a>
      {/* Rest */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {rest.map((post, i) => (
          <a
            key={post.title}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-zinc-100 dark:border-zinc-800/60 rounded-2xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-900/40 transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${0.18 + i * 0.06}s` }}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">
                {post.title}
              </h3>
              <ArrowUpRight
                size={14}
                className="flex-shrink-0 text-zinc-300 dark:text-zinc-700 group-hover:text-blue-500 mt-0.5 transition-colors"
              />
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed mt-2 line-clamp-3">
              {post.preview}
            </p>
            <p className="text-[11px] text-zinc-300 dark:text-zinc-700 mt-3 font-mono">{post.date}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
