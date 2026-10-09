// ──────────────────────────────────────────────
// Portfolio Data — Replace placeholders with real info
// ──────────────────────────────────────────────

export const personal = {
  name: "Muhammad Muneeb",
  initials: "MM",
  role: "AI / ML Engineer",
  tagline: "I build intelligent systems for real-world problems.",
  shortBio:
    "I'm an AI/ML engineer interested in building practical machine learning systems, experimenting with modern architectures, and turning research ideas into working products.",
  longBio: [
    "I like understanding how systems behave.",
    "That means looking beyond the model — the data, the edge cases, the infrastructure, and what happens when the real world doesn't behave like the training set.",
    "My focus is not simply training models, but understanding the problem, building the pipeline around the model, evaluating it properly, and turning the result into something people can actually use.",
  ],
  email: "muneebdev35@gmail.com",
  github: "https://github.com/Muneeb-Tahir",
  linkedin: "https://linkedin.com/in/muhammad-muneeb09",
  resume: "/resume.pdf",
  location: "Faisalabad, Pakistan",
};

export const heroRotatingPhrases = [
  "Machine Learning",
  "AI Systems",
  "Time-Series Intelligence",
  "Intelligent Applications",
];

export const principles = [
  {
    number: "01",
    title: "Start with the problem.",
    description:
      "A sophisticated model is useless if the problem is poorly defined.",
  },
  {
    number: "02",
    title: "Build the baseline first.",
    description: "Complexity should earn its place.",
  },
  {
    number: "03",
    title: "Measure before claiming.",
    description: "No invented metrics. No fake benchmarks.",
  },
  {
    number: "04",
    title: "A model is only part of the system.",
    description:
      "Data pipelines, monitoring, latency, reliability, and deployment matter.",
  },
];

export type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  problem: string;
  approach: string;
  technologies: string[];
  status: "Research" | "Prototype" | "Production" | "Experiment" | "Development";
  github?: string;
  demo?: string;
  paper?: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
  architecture?: string[];
  learnings?: string[];
};

export const projects: Project[] = [
  {
    id: "vectoguard-pk",
    number: "01",
    title: "VectoGuard-PK",
    subtitle: "Real-Time Anomaly Detection for Digital & Physical Systems",
    category: "Machine Learning",
    description:
      "A machine-learning monitoring system designed to detect abnormal behavior in environments ranging from cloud services and APIs to industrial machinery, while accounting for unstable power conditions common in developing infrastructure.",
    problem:
      "Traditional anomaly detection systems interpret sudden environmental changes — like power fluctuations — as system failures, generating expensive false positives.",
    approach:
      "Built a context-aware detection pipeline using wavelet transforms for signal decomposition, GRU/LSTM sequence models for temporal patterns, and conformal prediction for calibrated anomaly scoring.",
    technologies: [
      "Python",
      "PyTorch",
      "GRU",
      "LSTM",
      "PyWavelets",
      "Conformal Prediction",
      "FFT",
      "FastAPI",
    ],
    status: "Research",
    github: "https://github.com/Muneeb-Tahir/vectoguard-pk",
    featured: true,
    metrics: [
      { label: "F1 Score", value: "0.91" },
      { label: "Precision", value: "0.93" },
      { label: "Recall", value: "0.89" },
    ],
    architecture: [
      "Data Sources",
      "Data Processing",
      "Signal Processing",
      "ML / DL Models",
      "Anomaly Intelligence",
      "Alert",
    ],
    learnings: [
      "Contextual signals dramatically reduce false positive rates",
      "Wavelet features outperform raw time-series for non-stationary data",
      "Conformal prediction provides distribution-free uncertainty estimates",
    ],
  },
  {
    id: "eventsphere",
    number: "02",
    title: "EventSphere",
    subtitle: "Intelligent Event Management Platform",
    category: "Software Engineering",
    description:
      "A full-stack event management platform with intelligent recommendations, real-time analytics, and automated scheduling optimization.",
    problem:
      "Event organizers lack tools that combine management workflows with data-driven decision making.",
    approach:
      "Built a modular platform with recommendation engines for attendee matching and schedule optimization using constraint satisfaction.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "React",
      "Docker",
      "Redis",
    ],
    status: "Prototype",
    github: "https://github.com/Muneeb-Tahir/FYP_Event_Sphere",
    featured: false,
    learnings: [
      "Recommendation quality depends more on feature engineering than model complexity",
      "Real-time systems need careful cache invalidation strategies",
    ],
  },
  {
    id: "autonomous-news-research",
    number: "03",
    title: "Autonomous News Research",
    subtitle: "AI-Powered News Intelligence & Research Aggregation",
    category: "AI Engineering",
    description:
      "Built an AI-powered news intelligence and research aggregation system that collects news from 25+ sources and academic papers from four research databases. Features automated deduplication, six-factor relevance scoring, story clustering, authenticity checks, and Gemini-powered analysis through a responsive dark-themed dashboard.",
    problem:
      "News and academic research are scattered across multiple platforms, making it difficult to identify important developments, compare coverage across sources, assess credibility, and discover relevant research efficiently.",
    approach:
      "Engineered an end-to-end aggregation pipeline using Python and FastAPI. Integrated RSS feeds, NewsAPI, arXiv, Crossref, Semantic Scholar, and OpenAlex; implemented content normalization, similarity-based deduplication, weighted article scoring, story clustering, and multi-signal authenticity checks. Integrated Gemini for research paper analysis, news presentation, and natural-language queries, with Supabase PostgreSQL for persistent storage.",
    technologies: [
      "Python",
      "FastAPI",
      "Google Gemini",
      "Supabase",
      "PostgreSQL",
      "Natural Language Processing",
      "RSS & REST APIs",
      "feedparser",
      "Scikit-learn",
      "APScheduler",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    status: "Development",
    github:
      "https://github.com/Muneeb-Tahir/Autonomous-News-Research-Aggregation-system-with-AI-powered-analysis",
    featured: false,
    learnings: [
      "Multi-source aggregation requires robust normalization and deduplication to create a consistent, useful intelligence feed.",
      "Combining recency, credibility, importance, and urgency produces more meaningful news rankings than relying on publication time alone.",
      "AI-generated research summaries are more useful when paired with source metadata, original links, and structured retrieval pipelines.",
      "Separating collection, processing, storage, AI services, and API delivery makes an aggregation system easier to maintain and extend.",
    ],
  },
];

export type SkillCategory = {
  label: string;
  items: Skill[];
};

export type Skill = {
  name: string;
  detail?: string;
  relatedProjects?: string[];
};

export const skillLevels: {
  level: string;
  description: string;
  categories: SkillCategory[];
}[] = [
    {
      level: "Primary",
      description: "Core tools I reach for daily",
      categories: [
        {
          label: "Machine Learning",
          items: [
            {
              name: "Python",
              detail: "Primary language for all ML work",
              relatedProjects: ["VectoGuard-PK", "ML Experiments"],
            },
            {
              name: "PyTorch",
              detail: "Deep learning framework of choice",
              relatedProjects: ["VectoGuard-PK"],
            },
            {
              name: "Scikit-learn",
              detail: "Classical ML and preprocessing",
              relatedProjects: ["ML Experiments"],
            },
            {
              name: "Pandas / NumPy",
              detail: "Data manipulation and numerical computing",
            },
          ],
        },
        {
          label: "Deep Learning",
          items: [
            { name: "LSTM / GRU", detail: "Sequence modeling for time-series" },
            { name: "CNN", detail: "Feature extraction and classification" },
            {
              name: "Attention Mechanisms",
              detail: "Transformer architectures",
            },
          ],
        },
      ],
    },
    {
      level: "Working Knowledge",
      description: "Comfortable building with these",
      categories: [
        {
          label: "Engineering",
          items: [
            { name: "FastAPI", detail: "API development and serving" },
            { name: "SQL / PostgreSQL", detail: "Data storage and querying" },
            { name: "Docker", detail: "Containerization" },
            { name: "Git", detail: "Version control" },
            { name: "REST APIs", detail: "Service integration" },
          ],
        },
        {
          label: "Data",
          items: [
            { name: "Data Preprocessing", detail: "Cleaning and transformation" },
            { name: "Statistical Analysis", detail: "Hypothesis testing, distributions" },
            { name: "Visualization", detail: "Matplotlib, Seaborn, Plotly" },
          ],
        },
      ],
    },
    {
      level: "Exploring",
      description: "Currently learning and experimenting",
      categories: [
        {
          label: "Frontier",
          items: [
            { name: "Transformers", detail: "Architecture deep-dives" },
            { name: "LLMs", detail: "Large language model applications" },
            { name: "MLOps", detail: "Model deployment and monitoring" },
            { name: "Reinforcement Learning", detail: "Agent-based systems" },
            { name: "AI Agents", detail: "Autonomous intelligent systems" },
          ],
        },
      ],
    },
  ];

export const technicalFocus = [
  {
    category: "Machine Learning",
    items: [
      "Supervised Learning",
      "Unsupervised Learning",
      "Time-Series Analysis",
      "Anomaly Detection",
      "Classification",
      "Regression",
      "Feature Engineering",
    ],
  },
  {
    category: "Deep Learning",
    items: [
      "PyTorch",
      "LSTM",
      "GRU",
      "Transformers",
      "CNN",
      "Attention Mechanisms",
    ],
  },
  {
    category: "Data",
    items: [
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Data Preprocessing",
      "Statistical Analysis",
      "Visualization",
    ],
  },
  {
    category: "AI Systems",
    items: [
      "AI Agents",
      "Inference Pipelines",
      "Model Evaluation",
      "Real-Time Prediction",
      "Intelligent Automation",
    ],
  },
  {
    category: "Engineering",
    items: ["Python", "FastAPI", "REST APIs", "Git", "Docker", "SQL", "PostgreSQL"],
  },
];

export const pipelineSteps = [
  {
    number: "01",
    title: "Collect",
    description: "Gather data from APIs, sensors, databases, or files",
    details: ["API ingestion", "Sensor streams", "Database queries", "File parsing"],
  },
  {
    number: "02",
    title: "Clean",
    description: "Handle missing values, outliers, and formatting issues",
    details: ["Null handling", "Outlier detection", "Type conversion", "Deduplication"],
  },
  {
    number: "03",
    title: "Explore",
    description: "Understand distributions, correlations, and patterns",
    details: [
      "Statistical summaries",
      "Distribution analysis",
      "Correlation mapping",
      "Visual exploration",
    ],
  },
  {
    number: "04",
    title: "Engineer Features",
    description: "Transform raw data into meaningful model inputs",
    details: [
      "Domain features",
      "Frequency transforms",
      "Temporal encoding",
      "Normalization",
    ],
  },
  {
    number: "05",
    title: "Train",
    description: "Select and train appropriate model architectures",
    details: ["Baseline models", "LSTM / GRU", "Transformer", "Hyperparameter search"],
  },
  {
    number: "06",
    title: "Evaluate",
    description: "Measure performance with proper validation methodology",
    details: [
      "Cross-validation",
      "Precision / Recall",
      "Confusion matrix",
      "Statistical tests",
    ],
  },
  {
    number: "07",
    title: "Deploy",
    description: "Package and serve models for real-world consumption",
    details: ["API serving", "Containerization", "Model versioning", "Load testing"],
  },
  {
    number: "08",
    title: "Monitor",
    description: "Track model performance and detect drift in production",
    details: [
      "Performance tracking",
      "Data drift detection",
      "Alert systems",
      "Retraining triggers",
    ],
  },
];

export type ResearchItem = {
  year: string;
  title: string;
  type: "Research" | "Experiment" | "Prototype" | "Production";
  tags: string[];
  description: string;
  paper?: { title: string; url: string; year: string };
  extension?: string;
};

export const research: ResearchItem[] = [
  {
    year: "2026",
    title: "Frequency-Aware Anomaly Detection",
    type: "Research",
    tags: ["Time-Series", "GRU", "LSTM", "FFT"],
    description:
      "Investigating how frequency-domain features from FFT and wavelet transforms improve anomaly detection accuracy compared to raw time-series input.",
    paper: {
      title: "Deep Learning for Anomaly Detection: A Review",
      url: "#",
      year: "2024",
    },
    extension: "GRU comparison + cross-dataset evaluation",
  },
  {
    year: "2026",
    title: "Conformal Prediction for Uncertainty Quantification",
    type: "Experiment",
    tags: ["Conformal Prediction", "Calibration", "Anomaly Detection"],
    description:
      "Exploring distribution-free uncertainty estimation methods for anomaly scoring without strong distributional assumptions.",
  },
  {
    year: "2025",
    title: "Baseline Comparison Framework",
    type: "Prototype",
    tags: ["Evaluation", "Scikit-learn", "Benchmarking"],
    description:
      "Built a standardized framework for comparing classical ML baselines against deep learning approaches on tabular and time-series data.",
  },
];

export type TimelineItem = {
  year: string;
  title: string;
  organization: string;
  description: string;
  type: "education" | "experience" | "training";
};

export const timeline: TimelineItem[] = [
  {
    year: "2026",
    title: "AI / ML Training",
    organization: "NAVTTC",
    description:
      "Intensive training program covering machine learning, deep learning, and AI system design.",
    type: "training",
  },
  {
    year: "2026",
    title: "BS Computer Science",
    organization: "[ADD UNIVERSITY]",
    description: "Undergraduate degree with focus on algorithms, data structures, and software engineering.",
    type: "education",
  },
  {
    year: "2025",
    title: "Machine Learning Projects",
    organization: "Self-directed",
    description:
      "Independent research and development of ML systems, experiments, and open-source tools.",
    type: "experience",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  url?: string;
};

export const certifications: Certification[] = [
  // {
  //   name: "[ADD CERTIFICATION]",
  //   issuer: "[ADD ISSUER]",
  //   year: "2026",
  //   url: "#",
  // },
];

export const githubInfo = {
  username: "Muneeb-Tahir",
  repositories: 8,
  projects: 0,
  experiments: 0,
  recentRepos: ["VectoGuard-PK", "EventSphere", "Autonomous-News-Research"],
  languages: ["Python", "TypeScript", "SQL", "Jupyter", "HTML", "CSS", "JavaScript", "Flutter","Dart"],
};

export const modelComparison = [
  {
    model: "LSTM",
    f1: 0.87,
    latency: "42ms",
    description: "Strong baseline for sequential data",
    strengths: "Good at capturing long-term dependencies",
    weaknesses: "Slower training, more parameters than GRU",
    useCase: "When sequence memory is critical",
  },
  {
    model: "GRU",
    f1: 0.89,
    latency: "35ms",
    description: "Efficient alternative to LSTM",
    strengths: "Faster training, fewer parameters, comparable accuracy",
    weaknesses: "May miss very long-range patterns",
    useCase: "When computational efficiency matters",
  },
  {
    model: "Transformer",
    f1: 0.91,
    latency: "58ms",
    description: "Attention-based architecture",
    strengths: "Captures complex temporal relationships",
    weaknesses: "Higher latency, needs more data",
    useCase: "When accuracy is the priority",
  },
];

export const commandPaletteItems = [
  { label: "Search Projects", action: "projects", shortcut: "" },
  { label: "About Me", action: "about", shortcut: "" },
  // { label: "Research", action: "research", shortcut: "" },
  { label: "Skills", action: "skills", shortcut: "" },
  { label: "GitHub", action: "github-external", shortcut: "" },
  { label: "LinkedIn", action: "linkedin-external", shortcut: "" },
  { label: "Contact", action: "contact", shortcut: "" },
  { label: "Toggle Theme", action: "theme", shortcut: "" },
  { label: "Download Resume", action: "resume", shortcut: "" },
];
