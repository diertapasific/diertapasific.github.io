interface ExperienceItem {
  title: string
  org: string
  period: string
  bullets: string[]
}

interface Section {
  label: string
  items: ExperienceItem[]
}

const SECTIONS: Section[] = [
  {
    label: 'Working',
    items: [
      {
        title: 'Jr Forward Deployed Engineer',
        org: 'Staffinc Group',
        period: 'Feb 2026 – Present',
        bullets: [
          'Designed and built end-to-end automation workflows that eliminated ~500+ hours/year of manual operational work across reporting, document processing, and data delivery.',
          'Developed browser automation systems integrated with cloud storage, credential management, and real-time notifications to streamline recurring back-office processes at scale.',
          'Built internal API integrations and scraping services to automate data collection across third-party platforms, reducing manual data entry at scale.',
        ],
      },
      {
        title: 'AI Engineer',
        org: 'Neuram.AI',
        period: 'Aug 2025 – Feb 2026',
        bullets: [
          'Enhanced an AI-powered CV/Resume Analyzer, improving candidate engagement and recruiter workflow by implementing dynamic UI pop-ups and automated email invitations, reducing manual follow-ups by 40%.',
          'Designed and deployed OCR-based text extraction pipelines to process unstructured CV data (PDFs & images), achieving high-accuracy conversion by 90% into structured, machine-readable formats.',
          'Collaborated with the team to refine extraction logic, data validation rules, and UX flows, contributing to a more scalable and production-ready resume analysis system.',
        ],
      },
      {
        title: 'Data Scientist — Project Based Virtual Internship',
        org: 'Home Credit Indonesia × Rakamin Academy',
        period: 'Jul 2025 – Aug 2025',
        bullets: [
          'Designed and implemented end-to-end machine learning models to address real-world business challenges, from data preprocessing to model evaluation and interpretation.',
          'Conducted in-depth data analysis using SQL and Python to extract actionable insights from large-scale datasets relevant to marketing and product use cases.',
          'Gained hands-on experience with core data science workflows, including data cleaning, feature engineering, model selection, and performance tuning based on industry best practices.',
        ],
      },
      {
        title: 'Back End Developer',
        org: 'Inovasi Daya Solusi',
        period: 'Feb 2024 – Feb 2025',
        bullets: [
          'Developed and deployed secure, scalable APIs to support frontend applications, enabling seamless data exchange and improving overall system reliability by 20%.',
          'Optimized database queries to enhance data processing efficiency, reducing query execution time by up to 30%, leading to faster user response times.',
          'Worked closely with frontend developers, QA teams, and product managers to deliver cohesive solutions, reducing post-deployment bugs by 25% through thorough testing and collaboration.',
        ],
      },
      {
        title: 'Mobile Apps Developer — Project Based Virtual Internship',
        org: 'Bank Mandiri × Rakamin Academy',
        period: 'Dec 2023 – Jan 2024',
        bullets: [
          'Developed and deployed cross-platform mobile apps for the banking sector using modern frameworks, ensuring compatibility across Android and iOS.',
          'Designed intuitive, user-friendly interfaces that improved usability and customer engagement.',
          'Gained hands-on experience with end-to-end mobile development, from UI/UX design to testing and deployment.',
        ],
      },
    ],
  },
  {
    label: 'Organizational',
    items: [
      {
        title: 'Creative and Design Staff',
        org: 'HIMTI — Bina Nusantara University',
        period: '2021 – 2023',
        bullets: [
          'Designed promotional materials and visual content for organizational events and campaigns.',
          'Led as Chairman of TECHFEST 2023, achieving a target of 250+ participants across competitions, expos, and talk shows.',
          'Participated in multiple HIMTI events including TECHFEST, BINECHA, Comparative Study, and Company Visit.',
        ],
      },
      {
        title: 'Learning and Training Staff',
        org: 'Bina Nusantara Computer Club (BNCC)',
        period: '2021 – 2023',
        bullets: [
          "Mentored new members, improving technical skills through hands-on learning and practical coding challenges.",
          "Developed training materials to enhance members' understanding of programming and technology.",
          'Responsible for LnT Camp, Techbinar, and Opening Season events.',
        ],
      },
    ],
  },
  {
    label: 'Volunteer',
    items: [
      {
        title: 'Chairman of TECHFEST 2023',
        org: 'HIMTI',
        period: '2022 – 2023',
        bullets: [
          'Led planning and execution of a technology event achieving 250 total participants.',
          'Set vision, coordinated competitions, expo, and talk show sessions, managed logistics end-to-end.',
        ],
      },
      {
        title: 'Freshman Leader — B26 First Year Program',
        org: 'Bina Nusantara University',
        period: '2022',
        bullets: [
          'Organized and oversaw a one-week orientation program welcoming and supporting incoming freshmen.',
          'Facilitated the transition of 50+ freshmen with guidance, support, and campus life insights.',
        ],
      },
      {
        title: 'Back End Development Mentor',
        org: 'LnT Camp 2022 — BNCC',
        period: '2022',
        bullets: [
          'Mentored students in backend development concepts and hands-on coding practice.',
        ],
      },
      {
        title: 'Security & Safety Division Coordinator',
        org: 'TECHFEST 2022 — HIMTI',
        period: '2022',
        bullets: [
          'Ensured safety of all participants and staff. Devised safety protocols and conducted risk assessments.',
        ],
      },
      {
        title: 'Event Coordinator',
        org: 'Techbinar July 2022 — BNCC',
        period: '2022',
        bullets: [
          'Orchestrated event planning, logistics, and execution. Coordinated with speakers for smooth presentations.',
        ],
      },
      {
        title: 'Equipment Coordinator',
        org: 'BINECHA — HIMTI',
        period: '2022',
        bullets: [
          'Ensured flawless operation of all technical equipment for the esports event.',
        ],
      },
    ],
  },
]

export default function Experiences() {
  return (
    <div className="px-6 md:px-10 lg:px-14 max-w-4xl mx-auto pb-20">
      <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-[0.18em] mb-5 animate-fade-in">
        Career
      </p>
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[0.95] animate-fade-in" style={{ animationDelay: '0.04s' }}>
        Experience
      </h1>
      <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-3 animate-fade-in" style={{ animationDelay: '0.08s' }}>
        Work, leadership, and community contributions.
      </p>

      <div className="mt-12 space-y-12">
        {SECTIONS.map((section, sIdx) => (
          <div key={section.label} className="animate-fade-in" style={{ animationDelay: `${0.1 + sIdx * 0.08}s` }}>
            <p className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-6">
              {section.label}
            </p>

            <div className="relative pl-5 border-l border-zinc-200 dark:border-zinc-800 space-y-8">
              {section.items.map((item, i) => (
                <div key={i} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[21px] top-[6px] w-2.5 h-2.5 rounded-full bg-zinc-50 dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-blue-500" />

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">{item.title}</h3>
                      <p className="text-xs text-blue-600 dark:text-blue-500 mt-0.5 font-medium">{item.org}</p>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-600 flex-shrink-0 sm:mt-0.5">
                      {item.period}
                    </span>
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {item.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed">
                        <span className="flex-shrink-0 mt-[5px] w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
