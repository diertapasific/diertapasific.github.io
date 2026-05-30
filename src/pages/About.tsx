const SKILLS: Record<string, string[]> = {
  'Top Skills': ['Agentic AI Development', 'Requirements Gathering', 'Product Development'],
  'Programming Languages': ['Python', 'Java', 'SQL', 'JavaScript', 'C', 'C++'],
  'AI & Machine Learning': ['LLMs', 'NLP', 'OCR', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Hugging Face', 'Pandas', 'NumPy'],
  'Visualization & Automation': ['Streamlit', 'Pywinauto', 'Matplotlib', 'Seaborn'],
  'Developer Tools': ['Git', 'GitHub', 'Postman', 'Google Colab', 'GCP', 'Firebase', 'Figma', 'Microsoft Office'],
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
            Jr AI Engineer · Staffinc &nbsp;&middot;&nbsp; Jakarta, Indonesia
          </p>

          <div
            className="mt-8 space-y-3.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[48ch] animate-fade-in"
            style={{ animationDelay: '0.12s' }}
          >
            <p>
              Forward Deployed Engineer with a Computer Science background, focused on delivering
              applied solutions that bridge technical execution and real-world business needs.
              Works closely with stakeholders to translate requirements into reliable,
              production-ready systems.
            </p>
            <p>
              Experience includes building automation and cloud-based solutions, contributing to
              scalable backend systems, and supporting end-to-end delivery from implementation
              through iteration in production.
            </p>
            <p>
              Driven by hands-on execution, customer impact, and turning complex challenges into
              simple, usable solutions.
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
