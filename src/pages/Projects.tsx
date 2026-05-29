import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react'

interface ProjectLink {
  label: string
  href: string
  icon: React.ElementType
}

interface Project {
  id: string
  name: string
  tagline: string
  description: string
  tags: string[]
  links: ProjectLink[]
}

const PROJECTS: Project[] = [
  {
    id: '01',
    name: 'SumTube',
    tagline: 'YouTube Videos into Instant Summaries',
    description: 'AI-powered Streamlit app that extracts transcripts and applies multi-pass HuggingFace summarization to distill any YouTube video into clean, readable insights with downloadable PDF reports.',
    tags: ['Python', 'Streamlit', 'HuggingFace', 'NLP'],
    links: [
      { label: 'Repository', href: 'https://github.com/diertapasific/sumtube', icon: GithubLogo },
      { label: 'Live Demo', href: 'https://sumtube.streamlit.app/', icon: ArrowUpRight },
    ],
  },
  {
    id: '02',
    name: 'Cardify',
    tagline: 'LLM-Powered Flashcard Generator from PDF',
    description: 'Web app that ingests uploaded PDF documents, chunks the text intelligently, and leverages the Groq LLM API to generate structured Q&A flashcards — with progress tracking and a PDF export.',
    tags: ['Python', 'Streamlit', 'Groq API', 'LLM'],
    links: [
      { label: 'Repository', href: 'https://github.com/diertapasific/cardify', icon: GithubLogo },
      { label: 'Live Demo', href: 'https://cardifyai.streamlit.app/', icon: ArrowUpRight },
    ],
  },
  {
    id: '03',
    name: 'Rupcara',
    tagline: 'AI Money Recognition for the Visually Impaired',
    description: 'Deep learning tool using a fine-tuned ResNet-18 model to recognize Indonesian Rupiah banknotes across multiple print years with real-time speech synthesis audio output for accessibility.',
    tags: ['PyTorch', 'ResNet-18', 'Computer Vision', 'TTS'],
    links: [
      { label: 'Repository', href: 'https://github.com/diertapasific/rupcara', icon: GithubLogo },
      { label: 'Live Demo', href: 'https://rupcara.streamlit.app/', icon: ArrowUpRight },
    ],
  },
  {
    id: '04',
    name: 'ChatDP',
    tagline: "AI Personal Assistant — this site's chatbot",
    description: 'Custom chatbot powered by a fine-tuned sentence transformer model converted to ONNX for client-side inference. Zero server costs, real-time semantic matching directly in the browser.',
    tags: ['ONNX', 'Transformers.js', 'TypeScript', 'Semantic Search'],
    links: [
      { label: 'Repository', href: 'https://github.com/diertapasific/diertapasific.github.io', icon: GithubLogo },
    ],
  },
  {
    id: '05',
    name: 'Frezz',
    tagline: 'AI Fruit Freshness Detector',
    description: 'CNN model achieving 98% accuracy classifying fresh and rotten apples, bananas, and oranges. Converted to TensorFlow.js and deployed as a Progressive Web Application.',
    tags: ['TensorFlow.js', 'CNN', 'PWA', 'Computer Vision'],
    links: [
      { label: 'Repository', href: 'https://github.com/shafamira/frezz', icon: GithubLogo },
      { label: 'Dataset', href: 'https://www.kaggle.com/datasets/sriramr/fruits-fresh-and-rotten-for-classification', icon: ArrowUpRight },
    ],
  },
  {
    id: '06',
    name: 'Telecom Churn Analysis',
    tagline: 'Customer Churn Prediction with Machine Learning',
    description: 'End-to-end ML pipeline for telecom churn prediction using Random Forest. Feature importance reveals Total Day Charge, Total Day Minutes, and Customer Service Calls as top predictors.',
    tags: ['Python', 'Scikit-learn', 'EDA', 'Random Forest'],
    links: [
      { label: 'Repository', href: 'https://github.com/diertapasific/telecom-churn', icon: GithubLogo },
      { label: 'Dataset', href: 'http://kaggle.com/datasets/mnassrib/telecom-churn-datasets', icon: ArrowUpRight },
    ],
  },
  {
    id: '07',
    name: 'VeganFuel',
    tagline: 'Vegan Food Ordering iOS App',
    description: 'Swift-based iOS food ordering app with user authentication, database management, and a clean plant-based meal discovery experience. Designed in Figma from wireframes to final handoff.',
    tags: ['Swift', 'iOS', 'Figma', 'Firebase'],
    links: [
      { label: 'Repository', href: 'https://github.com/diertapasific/VeganFuel', icon: GithubLogo },
      { label: 'UI Preview', href: 'https://www.figma.com/proto/oyGd1FC6OvZJboVkG6nnJi/Mock-Up-VeganFuel?node-id=117-35&starting-point-node-id=117%3A35', icon: ArrowUpRight },
    ],
  },
  {
    id: '08',
    name: 'Priocars',
    tagline: 'Car Rental Database System',
    description: 'Database systems class final project — structured schema design, optimized SQL queries for insertions, updates, and retrievals, and a clean interface for managing rental transactions.',
    tags: ['SQL', 'Database Design', 'Figma'],
    links: [
      { label: 'UI Preview', href: 'https://www.figma.com/proto/zB6oo2ksVjT02lNoeKLVxX/priocars?node-id=2-154&scaling=contain&content-scaling=fixed', icon: ArrowUpRight },
    ],
  },
]

export default function Projects() {
  return (
    <div className="px-6 md:px-10 lg:px-14 max-w-4xl mx-auto pb-20">
      <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-[0.18em] mb-5 animate-fade-in">
        Work
      </p>
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[0.95] animate-fade-in" style={{ animationDelay: '0.04s' }}>
        Projects
      </h1>
      <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-3 max-w-[52ch] animate-fade-in" style={{ animationDelay: '0.08s' }}>
        AI, software, and mobile — built to solve real problems.
      </p>

      <div className="mt-12 space-y-0">
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            className="group border-t border-zinc-200 dark:border-zinc-800/60 py-7 animate-fade-in"
            style={{ animationDelay: `${0.1 + i * 0.04}s` }}
          >
            <div className="flex flex-col md:flex-row md:items-start md:gap-8">
              {/* Number */}
              <span className="text-xs font-mono text-zinc-300 dark:text-zinc-700 mt-1.5 hidden md:block flex-shrink-0 w-6 group-hover:text-blue-500 transition-colors">
                {project.id}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.name}
                    </h2>
                    <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-0.5">{project.tagline}</p>
                  </div>
                  {/* Links — desktop */}
                  <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                    {project.links.map(link => {
                      const LinkIcon = link.icon
                      return (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-blue-500/50 dark:hover:border-blue-500/40 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-150 active:scale-95"
                        >
                          <LinkIcon size={12} weight="fill" />
                          {link.label}
                        </a>
                      )
                    })}
                  </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-3 max-w-[62ch]">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links — mobile */}
                <div className="flex flex-wrap gap-2 mt-4 md:hidden">
                  {project.links.map(link => {
                    const LinkIcon = link.icon
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:text-zinc-900 dark:hover:text-zinc-200 transition-all duration-150"
                      >
                        <LinkIcon size={12} weight="fill" />
                        {link.label}
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-zinc-200 dark:border-zinc-800/60" />
      </div>
    </div>
  )
}
