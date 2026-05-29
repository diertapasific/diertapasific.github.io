const SKILLS: Record<string, string[]> = {
  'Languages': ['Python', 'Java', 'SQL', 'C', 'JavaScript', 'Swift', 'HTML / CSS'],
  'Tools & Frameworks': [
    'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib',
    'Streamlit', 'Google Cloud Platform', 'Git & GitHub', 'Figma',
  ],
}

export default function About() {
  return (
    <div className="px-6 md:px-10 lg:px-16 max-w-5xl mx-auto pb-20">
      {/* Editorial hero */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-8">
        {/* Left: text */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-[0.18em] mb-5 animate-fade-in">
            About Me
          </p>
          <h1
            className="text-6xl md:text-7xl font-bold tracking-tight leading-[0.92] animate-fade-in"
            style={{ animationDelay: '0.04s' }}
          >
            <span className="text-zinc-900 dark:text-zinc-100">Dierta</span>
            <br />
            <span className="text-zinc-400 dark:text-zinc-600">Pasific</span>
          </h1>
          <p
            className="text-xs text-zinc-500 mt-4 font-mono tracking-wide animate-fade-in"
            style={{ animationDelay: '0.08s' }}
          >
            AI Engineer &nbsp;&middot;&nbsp; Jakarta, Indonesia
          </p>

          <div
            className="mt-8 space-y-3.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[48ch] animate-fade-in"
            style={{ animationDelay: '0.12s' }}
          >
            <p>
              Aspiring AI Engineer driven by a passion for artificial intelligence, machine learning,
              and data-driven innovation. Actively seeking full-time opportunities in the AI/ML field.
            </p>
            <p>
              Focused on building AI solutions that are practical, scalable, and create genuine impact.
              Deeply curious about how intelligent systems can solve real-world problems.
            </p>
            <p>
              Beyond coding — reads books, listens to tech podcasts, and continuously explores
              new technologies to stay at the frontier of the field.
            </p>
          </div>
        </div>

        {/* Right: photo */}
        <div
          className="flex-shrink-0 flex justify-start md:justify-end animate-fade-in"
          style={{ animationDelay: '0.06s' }}
        >
          <div className="relative w-48 h-48 md:w-64 md:h-72">
            <img
              src="/assets/img/diertapasific.jpg"
              alt="Dierta Pasific"
              className="w-full h-full object-cover rounded-3xl"
            />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10 dark:ring-white/10" />
            {/* Subtle emerald accent dot */}
            <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 mt-14 mb-10" />

      {/* Skills */}
      <div className="space-y-8">
        {Object.entries(SKILLS).map(([category, items], catIdx) => (
          <div key={category} className="animate-fade-in" style={{ animationDelay: `${0.18 + catIdx * 0.06}s` }}>
            <p className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-3">
              {category}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-full hover:border-blue-500 dark:hover:border-blue-500/60 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-150 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
