/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";

// simple error boundary to show message instead of blank screen
export class AppErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = {hasError: false};
  }
  static getDerivedStateFromError() {
    return {hasError: true};
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-8 text-center text-red-500">An unexpected error occurred. Please try refreshing the page.</div>;
    }
    return this.props.children;
  }
}
import { BrowserRouter as Router, Routes, Route, Link, useLocation, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Calendar, 
  FileText, 
  Database, 
  Search, 
  MessageSquare, 
  Share2, 
  CheckCircle2, 
  ExternalLink,
  Clock,
  ShieldCheck,
  Zap,
  Layout as LayoutIcon,
  ArrowRight,
  Code2,
  BarChart3,
  Globe,
  GraduationCap,
  Award,
  Languages,
  Github,
  Linkedin,
  Phone,
  Home as HomeIcon,
  User,
  Briefcase,
  BookOpen,
  Send,
  Target,
  Users,
  Lock,
  Rocket,
  Menu,
  X,
  ChevronRight,
  Settings,
  ListChecks,
  SearchCode,
  Terminal,
  Sparkles,
  Cpu,
  RefreshCw
} from "lucide-react";

// --- Shared Components ---

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="min-h-[calc(100vh-64px)] pt-20 pb-20"
  >
    {children}
  </motion.div>
);

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-16">
    <h2 className="text-4xl md:text-5xl font-serif mb-4 tracking-tight">{title}</h2>
    {subtitle && <p className="text-stone-500 text-lg max-w-xl">{subtitle}</p>}
  </div>
);

// --- Portfolio Data ---

const VA_DATA = {
  role: "Virtual Assistant",
  title: "Saam | Virtual Assistant Portfolio",
  impact: "Helping busy professionals save time, stay organized, and operate more efficiently — one task at a time.",
  intro: "Professional Virtual Assistant dedicated to helping entrepreneurs and businesses stay organized, efficient, and focused on growth. I provide reliable administrative and operational support so my clients can focus on high-level priorities while I handle the details behind the scenes.",
  services: [
    {
      category: "Administrative Support",
      items: [
        "Email management & inbox organization",
        "Calendar scheduling & appointment setting",
        "Travel planning & meeting coordination",
        "Document formatting & file organization"
      ]
    },
    {
      category: "Data & Research",
      items: [
        "Accurate data entry",
        "Spreadsheet creation & organization (Excel / Google Sheets)",
        "Online research & summary reports",
        "CRM updates & database management"
      ]
    },
    {
      category: "Communication Support",
      items: [
        "Customer service email handling",
        "Follow-up messages & appointment confirmations",
        "Internal team coordination",
        "Professional business correspondence"
      ]
    },
    {
      category: "Social Media Assistance",
      items: [
        "Content scheduling",
        "Basic Canva graphics",
        "Caption writing",
        "Content calendar organization"
      ]
    }
  ],
  whyMe: [
    { title: "Strong Communication", desc: "I communicate clearly, professionally, and promptly to ensure smooth collaboration.", icon: <MessageSquare className="w-5 h-5" /> },
    { title: "Fast Learner", desc: "I quickly adapt to new tools, systems, and workflows with minimal supervision.", icon: <Zap className="w-5 h-5" /> },
    { title: "Detail-Oriented", desc: "I pay close attention to accuracy and organization, ensuring tasks are completed correctly the first time.", icon: <Target className="w-5 h-5" /> },
    { title: "Respectful of Confidentiality", desc: "I understand the importance of privacy and handle sensitive information with integrity and discretion.", icon: <Lock className="w-5 h-5" /> },
    { title: "Deadline-Driven", desc: "I prioritize tasks effectively and consistently meet deadlines.", icon: <Clock className="w-5 h-5" /> },
    { title: "Self-Managed", desc: "I take initiative, stay organized, and work independently without requiring constant oversight.", icon: <Users className="w-5 h-5" /> }
  ],
  tools: ["Google Workspace (Docs, Sheets, Calendar, Drive)", "Microsoft Excel & Word", "Trello & Asana", "Slack & Zoom", "Canva", "CRM systems", "Email platforms (Gmail, Outlook)"],
  workflow: [
    { 
      step: "01", 
      title: "Discovery & Briefing", 
      desc: "I start by understanding your specific needs, deadlines, and preferred communication style. We establish clear goals and access requirements.", 
      icon: <Search className="w-5 h-5" />,
      tools: [
        { name: "Google Workspace", reason: "For collaborative document sharing and initial project briefing." },
        { name: "Slack/Zoom", reason: "To maintain real-time communication and ensure alignment on expectations." }
      ]
    },
    { 
      step: "02", 
      title: "Task Prioritization", 
      desc: "Using tools like Trello or Asana, I organize tasks by urgency and importance, ensuring high-priority items are addressed first.", 
      icon: <ListChecks className="w-5 h-5" />,
      tools: [
        { name: "Trello/Asana", reason: "Visual task tracking helps in managing multiple deadlines without missing details." },
        { name: "Google Calendar", reason: "To sync deadlines and ensure time-blocking for deep work." }
      ]
    },
    { 
      step: "03", 
      title: "Execution & Quality Check", 
      desc: "I perform the tasks with high attention to detail. Every email, spreadsheet, or report undergoes a rigorous quality check before completion.", 
      icon: <CheckCircle2 className="w-5 h-5" />,
      tools: [
        { name: "MS Excel/Sheets", reason: "For structured data management and accurate record-keeping." },
        { name: "Python Scripts", reason: "I use Python to automate repetitive data entry or file organization tasks, increasing speed and reducing human error." }
      ]
    },
    { 
      step: "04", 
      title: "Reporting & Feedback", 
      desc: "I provide regular status updates and a final summary. We review the results together to ensure they exceed your expectations.", 
      icon: <Send className="w-5 h-5" />,
      tools: [
        { name: "Loom", reason: "To provide video walkthroughs of completed complex tasks for better clarity." },
        { name: "Gmail/Outlook", reason: "For professional delivery of final reports and documentation." }
      ]
    }
  ],
  problemSolving: "When faced with complex administrative challenges, I break them down into smaller, manageable sub-tasks. I research the best tools for automation (like Zapier or specialized CRM features) to create sustainable, long-term solutions rather than quick fixes.",
  sampleWorkIntro: "Available upon request or viewable via shared Drive folder, including:",
  samples: ["Organized spreadsheet samples", "Research summaries", "Email templates", "Task trackers", "Canva graphics"]
};

const DATA_DATA = {
  role: "Data Analyst",
  title: "Saam | Data Analyst Portfolio",
  impact: "Turning raw data into actionable business insights through precision and visualization.",
  intro: "Aspiring Data Analyst focused on helping businesses make informed decisions through data processing, statistical analysis, and clear visualization. I bridge the gap between complex data sets and strategic business outcomes.",
  services: [
    {
      category: "Data Processing",
      items: [
        "Data entry, cleaning, and validation",
        "Dataset organization and structuring",
        "Basic SQL queries for data extraction",
        "Data migration and auditing"
      ]
    },
    {
      category: "Visualization & Reporting",
      items: [
        "Interactive dashboard creation",
        "Statistical charts and graphs",
        "Executive summary reports",
        "Performance tracking visualizations"
      ]
    },
    {
      category: "Financial Analysis",
      items: [
        "Budget tracking and reporting",
        "Financial health assessments",
        "Cost-benefit analysis support",
        "Revenue trend visualization"
      ]
    }
  ],
  whyMe: [
    { title: "Analytical Mindset", desc: "I look beyond the numbers to find the underlying stories and trends.", icon: <Search className="w-5 h-5" /> },
    { title: "Precision & Accuracy", desc: "High attention to detail ensures that data integrity is maintained at every step.", icon: <ShieldCheck className="w-5 h-5" /> },
    { title: "Business Context", desc: "I understand how data translates into real-world business decisions.", icon: <Briefcase className="w-5 h-5" /> },
    { title: "Tool Mastery", desc: "Advanced proficiency in analytical software ensures efficient processing.", icon: <Database className="w-5 h-5" /> }
  ],
  tools: ["Python (Pandas, NumPy, Matplotlib)", "MS Excel (Advanced)", "Basic SQL", "Power BI / Tableau (Basics)", "Google Sheets", "Data Visualization Tools", "Financial Modeling Software"],
  workflow: [
    { 
      step: "01", 
      title: "Data Acquisition", 
      desc: "Identifying and gathering raw data from diverse sources including SQL databases, CSV files, and web APIs.", 
      icon: <Database className="w-5 h-5" />,
      tools: [
        { name: "SQL", reason: "To query and extract specific datasets from relational databases." },
        { name: "Python (Requests/BeautifulSoup)", reason: "I use Python for web scraping and API integration when data isn't readily available in a database." }
      ]
    },
    { 
      step: "02", 
      title: "Cleaning & Preparation", 
      desc: "The most critical step. I handle missing values, remove duplicates, and normalize data to ensure absolute integrity.", 
      icon: <Settings className="w-5 h-5" />,
      tools: [
        { name: "Python (Pandas/NumPy)", reason: "My primary choice for data cleaning. It allows for complex transformations that are impossible or too slow in Excel." },
        { name: "OpenRefine", reason: "For handling messy text data and ensuring consistency across large datasets." }
      ]
    },
    { 
      step: "03", 
      title: "Exploratory Analysis", 
      desc: "Using statistical methods to identify patterns, correlations, and outliers that reveal the true story behind the numbers.", 
      icon: <SearchCode className="w-5 h-5" />,
      tools: [
        { name: "Python (SciPy/Statsmodels)", reason: "For rigorous statistical testing and hypothesis validation." },
        { name: "Excel Pivot Tables", reason: "For quick, high-level summaries and cross-tabulations during initial exploration." }
      ]
    },
    { 
      step: "04", 
      title: "Visualization & Storytelling", 
      desc: "Transforming complex findings into intuitive, interactive dashboards and executive reports that drive action.", 
      icon: <BarChart3 className="w-5 h-5" />,
      tools: [
        { name: "Power BI/Tableau", reason: "To create interactive, business-ready dashboards for stakeholders." },
        { name: "Python (Seaborn/Plotly)", reason: "For custom, publication-quality static and interactive visualizations that require fine-grained control." }
      ]
    }
  ],
  problemSolving: "I approach complex data problems by first defining the 'Business Question'. I then work backwards to determine what data is needed, how to validate it, and which visualization will most effectively answer that question for stakeholders.",
  sampleWorkIntro: "Case studies and analytical reports available for review:",
  samples: ["Financial health reports", "Market trend analysis", "Interactive dashboards", "Data cleaning projects"]
};

const WEB_DATA = {
  role: "Web Developer",
  title: "Saam | Web Developer Portfolio",
  impact: "Building fast, responsive, and user-centric digital experiences that drive engagement.",
  intro: "Software Engineer and Web Developer dedicated to creating functional, beautiful, and accessible web platforms. I combine technical engineering skills with a keen eye for design to deliver high-quality digital products.",
  services: [
    {
      category: "Frontend Development",
      items: [
        "Responsive website building",
        "HTML/CSS implementation",
        "Modern framework integration (React)",
        "Mobile-first design approach"
      ]
    },
    {
      category: "UI/UX & Design",
      items: [
        "Branding and identity kits",
        "Digital campaign design",
        "Canva & Adobe Express graphics",
        "User interface prototyping"
      ]
    },
    {
      category: "Technical Support",
      items: [
        "Python & Node.js Backend Development",
        "Git version control & deployment",
        "Technical coaching for beginners",
        "Digital literacy training"
      ]
    }
  ],
  whyMe: [
    { title: "Clean Code", desc: "I write maintainable, well-structured code that follows industry best practices.", icon: <Code2 className="w-5 h-5" /> },
    { title: "Design Eye", desc: "I ensure that technical functionality is matched by aesthetic excellence.", icon: <LayoutIcon className="w-5 h-5" /> },
    { title: "Problem Solver", desc: "I enjoy tackling complex technical challenges and finding efficient solutions.", icon: <Zap className="w-5 h-5" /> },
    { title: "Continuous Learner", desc: "Always staying updated with the latest web technologies and trends.", icon: <Rocket className="w-5 h-5" /> }
  ],
  tools: ["HTML/CSS", "JavaScript", "React", "Python", "VS Code", "Node.js", "Git / GitHub", "Canva", "Adobe Express", "Tailwind CSS"],
  workflow: [
    { 
      step: "01", 
      title: "Requirement Analysis", 
      desc: "Deep diving into user needs, technical constraints, and business goals to define the project scope and architecture.", 
      icon: <FileText className="w-5 h-5" />,
      tools: [
        { name: "Notion", reason: "To document technical requirements and maintain a centralized project wiki." },
        { name: "Miro", reason: "For visual brainstorming and mapping out user flows." }
      ]
    },
    { 
      step: "02", 
      title: "Design & Prototyping", 
      desc: "Creating wireframes and high-fidelity mockups in Canva or Figma to visualize the user journey and interface.", 
      icon: <LayoutIcon className="w-5 h-5" />,
      tools: [
        { name: "Figma", reason: "Industry standard for high-fidelity UI/UX design and prototyping." },
        { name: "Canva", reason: "For quick asset creation and social media integration graphics." }
      ]
    },
    { 
      step: "03", 
      title: "Development & Coding", 
      desc: "Writing clean, modular, and performant code using React and Tailwind CSS, following modern engineering standards.", 
      icon: <Terminal className="w-5 h-5" />,
      tools: [
        { name: "React & Tailwind", reason: "For building fast, responsive, and maintainable frontend interfaces." },
        { name: "Python (Django/FastAPI)", reason: "I use Python for backend development when building complex, data-driven web applications." }
      ]
    },
    { 
      step: "04", 
      title: "Testing & Deployment", 
      desc: "Rigorous cross-device testing and debugging followed by seamless deployment using Git-based workflows.", 
      icon: <Rocket className="w-5 h-5" />,
      tools: [
        { name: "Git/GitHub", reason: "For version control and collaborative development." },
        { name: "Vercel/Netlify", reason: "For automated deployment and hosting with continuous integration." }
      ]
    }
  ],
  problemSolving: "My technical problem-solving involves isolating issues through systematic debugging, researching documentation, and leveraging community best practices. I prioritize building scalable components that prevent future technical debt.",
  sampleWorkIntro: "Live projects and design portfolios available:",
  samples: ["Responsive business sites", "NGO branding campaigns", "Training platforms", "UI design prototypes"]
};

// --- Opportunity Panel Component ---

interface Opportunity {
  title: string;
  type: string;
  sponsor: string;
  deadline: string;
  guide: string;
  standoutTips: string;
  preparation: string;
  steps: string[];
  categories: string[];
  benefits: {
    accommodation: boolean;
    visa: boolean;
    flight: boolean;
    stipend: boolean;
  };
  link?: string;
}

const CATEGORIES = [
  "All",
  "Entry Level",
  "Fellowship",
  "Scholarship",
  "Internship",
  "Sponsorship",
  "Paid Learning",
  "Visa Support",
  "Flight Included",
  "Free Accommodation"
];

const OpportunityPanel = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isScraping, setIsScraping] = useState(false);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");


  // basic runtime type guard so that malformed AI output doesn't crash the
  // UI.  We simply ignore any item that doesn't satisfy the minimal schema.
  const isValidOpportunity = (o: any): o is Opportunity => {
    if (!o || typeof o !== "object") return false;
    if (typeof o.title !== "string") return false;
    if (typeof o.type !== "string") return false;
    if (typeof o.sponsor !== "string") return false;
    if (typeof o.deadline !== "string") return false;
    if (!Array.isArray(o.categories)) return false;
    if (!Array.isArray(o.steps)) return false;
    if (typeof o.benefits !== "object") return false;
    return true;
  };

  // caching helpers --------------------------------------------------------
  const CACHE_KEY = "hiddenOpportunityHubCache";
  interface CacheEntry {
    timestamp: number;
    data: Opportunity[];
  }

  const loadCache = (): Opportunity[] | null => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const entry: CacheEntry = JSON.parse(raw);
      // expire cache after 6 hours
      if (Date.now() - entry.timestamp < 6 * 60 * 60 * 1000) {
        return entry.data;
      }
      return null;
    } catch {
      return null;
    }
  };

  const saveCache = (data: Opportunity[]) => {
    try {
      const entry: CacheEntry = { timestamp: Date.now(), data };
      localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
    } catch {
      // ignore
    }
  };

  /**
   * Fetch the latest opportunities JSON; update state only when the
   * payload differs.  This function is lightweight and suitable for
   * polling, which keeps the listing effectively realtime.
   */
  const fetchOpportunities = async (): Promise<void> => {
    if (isScraping) return;
    setError(null);

    setIsScraping(true);
    try {
      const res = await fetch('/opportunities.json', { cache: 'no-store' });
      if (!res.ok) {
        throw new Error('Failed to load opportunities');
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error('Unexpected data format');
      }
      const validItems: Opportunity[] = data.filter(isValidOpportunity as any);
      setOpportunities(prev => {
        if (JSON.stringify(prev) === JSON.stringify(validItems)) return prev;
        return validItems;
      });
      saveCache(validItems);
    } catch (err: any) {
      console.error('Scraping error:', err);
      setError(err.message || 'Failed to load opportunities.');
    } finally {
      setIsScraping(false);
    }
  };

  /**
   * Start scraping sequence.  Uses cache if available but still fetches once
   * immediately so data is up-to-date.  The component also establishes a
   * 1-second polling interval to keep the list refreshed.
   */
  const startScraping = async (forceRefresh = false): Promise<() => void> => {
    if (!forceRefresh) {
      const cached = loadCache();
      if (cached) {
        setOpportunities(cached);
        // background update
        fetchOpportunities();
      } else {
        await fetchOpportunities();
      }
    } else {
      await fetchOpportunities();
    }
    return () => {};
  };

  // memoize filtering so we don't recompute on every render when nothing
  // has changed.
  const filteredOpportunities = useMemo(() => {
    const filterFns: Record<string, (opp: Opportunity) => boolean> = {
      All: () => true,
      "Free Accommodation": opp => opp.benefits.accommodation,
      "Visa Support": opp => opp.benefits.visa,
      "Flight Included": opp => opp.benefits.flight,
    };

    return opportunities.filter(opp => {
      const fn = filterFns[activeFilter];
      if (fn) return fn(opp);
      // otherwise look in categories or type string
      return opp.categories.includes(activeFilter) || opp.type.includes(activeFilter);
    });
  }, [opportunities, activeFilter]);

  useEffect(() => {
    let intervalId: number | null = null;

    const init = async () => {
      await startScraping();
      // begin polling every second
      intervalId = window.setInterval(fetchOpportunities, 1000);
    };

    if (isOpen) {
      init();
    }

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-stone-950/95 backdrop-blur-xl overflow-y-auto p-6 md:p-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-stone-800 rounded-2xl">
              <Sparkles className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h2 className="text-3xl font-serif text-white">Hidden Opportunity Hub</h2>
              <p className="text-stone-400 text-sm">Curated opportunity list (data scraped via Python)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-4 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {isScraping ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mb-8"
            >
              <RefreshCw className="w-16 h-16 text-amber-400" />
            </motion.div>
            <h3 className="text-2xl font-serif text-white mb-4">Loading opportunities...</h3>
            <p className="text-stone-500 max-w-md">Fetching the latest scraped data provided by the Python script.</p>
            <div className="mt-8 flex gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 mb-8">{error}</p>
            <button 
              onClick={startScraping}
              className="px-8 py-4 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-all"
            >
              Retry Scraping
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Filters */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-stone-800">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeFilter === cat 
                      ? 'bg-amber-400 text-stone-950' 
                      : 'bg-stone-900 text-stone-500 hover:text-stone-300 border border-stone-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
              {/* List */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-stone-400 uppercase tracking-widest text-xs font-bold">
                    {filteredOpportunities.length} Opportunities Found
                  </h3>
                  <button
                    onClick={() => startScraping(true)}
                    disabled={isScraping}
                    className="text-amber-400 text-xs flex items-center gap-1 hover:underline disabled:opacity-50"
                  >
                    <RefreshCw className="w-3 h-3" /> Refresh
                  </button>
                </div>
                {filteredOpportunities.length > 0 ? filteredOpportunities.map((opp, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedOpp(opp);
                  }}
                    className={`w-full text-left p-6 rounded-3xl border transition-all ${
                      selectedOpp?.title === opp.title 
                        ? 'bg-stone-800 border-amber-400/50 shadow-lg shadow-amber-400/5' 
                        : 'bg-stone-900 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-wrap gap-1">
                        {opp.categories.map(c => (
                          <span key={c} className="text-[8px] uppercase tracking-widest text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded">
                            {c}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] text-stone-500">{opp.deadline}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">{opp.title}</h4>
                    <p className="text-stone-500 text-sm mb-4">{opp.sponsor}</p>
                    
                    <div className="flex gap-3">
                      {opp.benefits.accommodation && <HomeIcon className="w-3 h-3 text-stone-600" title="Accommodation" />}
                      {opp.benefits.visa && <ShieldCheck className="w-3 h-3 text-stone-600" title="Visa Support" />}
                      {opp.benefits.flight && <Globe className="w-3 h-3 text-stone-600" title="Flight Included" />}
                      {opp.benefits.stipend && <Award className="w-3 h-3 text-stone-600" title="Stipend" />}
                    </div>
                  </button>
                )) : (
                  <div className="py-12 text-center text-stone-600 italic">
                    No opportunities match this filter.
                  </div>
                )}
              </div>

            {/* Details */}
            <div className="lg:col-span-7">
              {selectedOpp ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-stone-900 rounded-[3rem] p-8 md:p-12 border border-stone-800"
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-serif text-white">Opportunity Details</h3>
                  </div>

                  <div className="space-y-12">
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className={`p-4 rounded-2xl border ${selectedOpp.benefits.accommodation ? 'bg-amber-400/10 border-amber-400/20' : 'bg-stone-800/20 border-stone-800 opacity-50'}`}>
                        <HomeIcon className={`w-5 h-5 mb-2 ${selectedOpp.benefits.accommodation ? 'text-amber-400' : 'text-stone-600'}`} />
                        <p className={`text-[10px] uppercase font-bold ${selectedOpp.benefits.accommodation ? 'text-amber-400' : 'text-stone-600'}`}>Accommodation</p>
                      </div>
                      <div className={`p-4 rounded-2xl border ${selectedOpp.benefits.visa ? 'bg-blue-400/10 border-blue-400/20' : 'bg-stone-800/20 border-stone-800 opacity-50'}`}>
                        <ShieldCheck className={`w-5 h-5 mb-2 ${selectedOpp.benefits.visa ? 'text-blue-400' : 'text-stone-600'}`} />
                        <p className={`text-[10px] uppercase font-bold ${selectedOpp.benefits.visa ? 'text-blue-400' : 'text-stone-600'}`}>Visa Support</p>
                      </div>
                      <div className={`p-4 rounded-2xl border ${selectedOpp.benefits.flight ? 'bg-emerald-400/10 border-emerald-400/20' : 'bg-stone-800/20 border-stone-800 opacity-50'}`}>
                        <Globe className={`w-5 h-5 mb-2 ${selectedOpp.benefits.flight ? 'text-emerald-400' : 'text-stone-600'}`} />
                        <p className={`text-[10px] uppercase font-bold ${selectedOpp.benefits.flight ? 'text-emerald-400' : 'text-stone-600'}`}>Flight</p>
                      </div>
                      <div className={`p-4 rounded-2xl border ${selectedOpp.benefits.stipend ? 'bg-purple-400/10 border-purple-400/20' : 'bg-stone-800/20 border-stone-800 opacity-50'}`}>
                        <Award className={`w-5 h-5 mb-2 ${selectedOpp.benefits.stipend ? 'text-purple-400' : 'text-stone-600'}`} />
                        <p className={`text-[10px] uppercase font-bold ${selectedOpp.benefits.stipend ? 'text-purple-400' : 'text-stone-600'}`}>Stipend</p>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-stone-400 uppercase tracking-widest text-[10px] font-bold mb-4 flex items-center gap-2">
                        <FileText className="w-3 h-3" /> Full Guide
                      </h4>
                      <p className="text-stone-300 leading-relaxed font-light">{selectedOpp.guide}</p>
                    </section>

                    <section className="grid md:grid-cols-2 gap-8">
                      <div className="p-6 bg-stone-800/50 rounded-3xl border border-stone-800">
                        <h4 className="text-amber-400 uppercase tracking-widest text-[10px] font-bold mb-4 flex items-center gap-2">
                          <Sparkles className="w-3 h-3" /> How to Standout
                        </h4>
                        <p className="text-stone-400 text-sm leading-relaxed">{selectedOpp.standoutTips}</p>
                      </div>
                      <div className="p-6 bg-stone-800/50 rounded-3xl border border-stone-800">
                        <h4 className="text-blue-400 uppercase tracking-widest text-[10px] font-bold mb-4 flex items-center gap-2">
                          <Cpu className="w-3 h-3" /> Preparation & Training
                        </h4>
                        <p className="text-stone-400 text-sm leading-relaxed">{selectedOpp.preparation}</p>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-stone-400 uppercase tracking-widest text-[10px] font-bold mb-6 flex items-center gap-2">
                        <Clock className="w-3 h-3" /> Step-by-Step Application Guide
                      </h4>
                      <div className="space-y-4">
                        {selectedOpp.steps.map((step, i) => (
                          <div key={i} className="flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-full bg-stone-800 flex items-center justify-center text-[10px] font-bold text-stone-400 shrink-0 mt-1">
                              {i + 1}
                            </div>
                            <p className="text-stone-400 text-sm leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>
                    </section>


                    <div className="pt-8 border-t border-stone-800 flex flex-wrap gap-4">
                      {selectedOpp.link && (
                        <a 
                          href={selectedOpp.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 bg-stone-800 text-white py-4 rounded-full font-bold hover:bg-stone-700 transition-all gap-2"
                        >
                          Visit Official Site <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-stone-800 rounded-[3rem]">
                  <div className="p-6 bg-stone-900 rounded-full mb-6">
                    <Search className="w-12 h-12 text-stone-700" />
                  </div>
                  <h3 className="text-xl font-serif text-stone-500 mb-2">Select an Opportunity</h3>
                  <p className="text-stone-600 max-w-xs">Choose an item from the list to view the full application guide and AI insights.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  </motion.div>
);
};

// --- Page Components ---

const RolePortfolio = ({ data }: { data: typeof VA_DATA }) => (
  <PageWrapper>
    <section className="max-w-4xl mx-auto px-6">
      {/* Impact Statement */}
      <div className="mb-16 text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-stone-400 italic text-xl font-serif"
        >
          "{data.impact}"
        </motion.p>
      </div>

      {/* Header */}
      <div className="mb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-serif mb-8 tracking-tight">{data.title}</h1>
        <p className="text-xl text-stone-600 leading-relaxed font-light max-w-3xl mx-auto">
          {data.intro}
        </p>
      </div>

      {/* Services */}
      <div className="mb-32">
        <h2 className="text-3xl font-serif mb-12 flex items-center gap-4">
          <Briefcase className="w-8 h-8 text-stone-300" /> Services I Provide
        </h2>
        <div className="grid md:grid-cols-2 gap-16">
          {data.services.map((service, i) => (
            <div key={i}>
              <h3 className="text-xl font-bold mb-6 border-b border-stone-100 pb-4 text-stone-900">{service.category}</h3>
              <ul className="space-y-4">
                {service.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-stone-600">
                    <CheckCircle2 className="w-5 h-5 text-stone-300 shrink-0 mt-0.5" />
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Why Me */}
      <div className="mb-32 bg-stone-50 p-12 md:p-24 rounded-[4rem] border border-stone-100">
        <h2 className="text-3xl font-serif mb-16 flex items-center gap-4">
          <Award className="w-8 h-8 text-stone-400" /> Why Clients Enjoy Working With Me
        </h2>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {data.whyMe.map((trait, i) => (
            <div key={i}>
              <h4 className="font-bold mb-3 flex items-center gap-3 text-stone-900">
                <div className="p-2 bg-white rounded-lg shadow-sm">{trait.icon}</div> {trait.title}
              </h4>
              <p className="text-stone-600 text-sm leading-relaxed font-light">{trait.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow Section */}
      <div className="mb-32">
        <h2 className="text-3xl font-serif mb-12 flex items-center gap-4">
          <Clock className="w-8 h-8 text-stone-300" /> My Step-by-Step Workflow
        </h2>
        <div className="space-y-12">
          {data.workflow.map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-8 md:gap-12 p-10 bg-white border border-stone-100 rounded-[3rem] hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 md:w-1/4">
                <span className="text-5xl font-serif text-stone-200">{item.step}</span>
                <div className="p-4 bg-stone-50 rounded-2xl text-stone-900 shadow-sm">{item.icon}</div>
              </div>
              <div className="md:w-3/4">
                <h4 className="text-2xl font-bold mb-3 text-stone-900">{item.title}</h4>
                <p className="text-stone-600 font-light leading-relaxed mb-8 text-lg">{item.desc}</p>
                
                {/* Tools used in this step */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {item.tools.map((tool, j) => (
                    <div key={j} className="p-5 bg-stone-50 rounded-2xl border border-stone-100">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                        <span className="font-bold text-sm text-stone-900">{tool.name}</span>
                      </div>
                      <p className="text-xs text-stone-500 leading-relaxed">{tool.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Problem Solving */}
      <div className="mb-32 bg-stone-900 text-white p-12 md:p-24 rounded-[4rem]">
        <h2 className="text-3xl font-serif mb-8 flex items-center gap-4">
          <Zap className="w-8 h-8 text-stone-400" /> Solving Complex Problems
        </h2>
        <p className="text-xl text-stone-300 font-light leading-relaxed italic">
          "{data.problemSolving}"
        </p>
      </div>

      {/* Tools */}
      <div className="mb-32">
        <h2 className="text-3xl font-serif mb-12 flex items-center gap-4">
          <Zap className="w-8 h-8 text-stone-300" /> Tools & Platforms
        </h2>
        <div className="flex flex-wrap gap-3">
          {data.tools.map((tool, i) => (
            <span key={i} className="px-8 py-4 bg-white border border-stone-100 rounded-full text-sm shadow-sm hover:shadow-md transition-shadow">
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Sample Work */}
      <div className="mb-32 border-t border-stone-100 pt-24">
        <h2 className="text-3xl font-serif mb-12 flex items-center gap-4">
          <FileText className="w-8 h-8 text-stone-300" /> Sample Work
        </h2>
        <p className="text-stone-600 mb-10 text-lg">{data.sampleWorkIntro}</p>
        <div className="grid md:grid-cols-2 gap-4">
          {data.samples.map((sample, i) => (
            <div key={i} className="p-8 bg-stone-50 rounded-3xl flex items-center gap-4 border border-transparent hover:border-stone-200 transition-colors">
              <div className="w-2 h-2 rounded-full bg-stone-300" />
              <span className="font-medium text-stone-700">{sample}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-stone-900 text-white p-16 md:p-24 rounded-[4rem] shadow-2xl">
        <h3 className="text-4xl font-serif mb-8">Let’s Work Together</h3>
        <p className="text-stone-400 mb-12 max-w-md mx-auto text-lg font-light">
          I am ready to support your business with professionalism, efficiency, and attention to detail.
        </p>
        <Link to="/contact" className="inline-flex items-center gap-3 bg-white text-stone-900 px-12 py-6 rounded-full font-bold hover:scale-105 transition-all shadow-xl">
          Send a Message <Send className="w-5 h-5" />
        </Link>
      </div>
    </section>
  </PageWrapper>
);

const Home = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <PageWrapper>
      <section className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center min-h-[70vh] text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-stone-500 font-medium tracking-[0.3em] uppercase text-[10px] mb-8"
        >
          Junior Data Analyst | Virtual Assistant | Web Developer
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-9xl font-serif leading-[1] mb-12 tracking-tighter"
        >
          Saam <span className="inline-block">
            <span 
              onClick={() => setIsPanelOpen(true)}
              className="cursor-pointer hover:text-amber-400 transition-colors"
            >Atu</span>mkezie
          </span> Kenah
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl text-stone-600 leading-relaxed mb-16 max-w-2xl mx-auto font-light"
        >
          Helping busy professionals save time, stay organized, and operate more efficiently — one task at a time.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <Link 
            to="/portfolio" 
            className="flex items-center gap-2 bg-stone-900 text-white px-10 py-5 rounded-full font-medium hover:bg-stone-800 transition-all shadow-xl shadow-stone-200"
          >
            Explore My Portfolios <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex gap-4 items-center">
            <a href="https://www.linkedin.com/in/saam-atumkezie-kenah-63057a285" target="_blank" className="p-4 bg-white border border-stone-100 rounded-full hover:bg-stone-50 transition-colors shadow-sm">
              <Linkedin className="w-5 h-5 text-stone-700" />
            </a>
            <a href="https://github.com/kenah77" target="_blank" className="p-4 bg-white border border-stone-100 rounded-full hover:bg-stone-50 transition-colors shadow-sm">
              <Github className="w-5 h-5 text-stone-700" />
            </a>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {isPanelOpen && (
          <OpportunityPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

const About = () => (
  <PageWrapper>
    <section className="max-w-6xl mx-auto px-6">
      <SectionHeader title="About Me" subtitle="A blend of technical expertise and creative problem solving." />
      <div className="grid md:grid-cols-12 gap-16 items-start">
        <div className="md:col-span-7">
          <div className="space-y-8 text-stone-700 text-2xl leading-relaxed font-serif italic">
            <p>
              "I am a self-motivated and versatile aspiring data analyst with a background in web development and virtual assistance."
            </p>
            <p className="not-italic text-lg text-stone-600 font-sans">
              Certified in financial analysis, software engineering, public speaking, and digital skills, I am adept at problem-solving, client engagement, and content creation. Passionate about using technology and communication to inspire, empower, and deliver measurable results.
            </p>
          </div>
        </div>
        <div className="md:col-span-5 grid grid-cols-2 gap-4">
          {[
            { label: "Projects", value: "50+", sub: "Delivered" },
            { label: "Experience", value: "4+", sub: "Years" },
            { label: "Certs", value: "6+", sub: "Earned" },
            { label: "Languages", value: "3", sub: "Fluent", dark: true }
          ].map((stat, i) => (
            <div key={i} className={`p-8 rounded-2xl border border-stone-100 shadow-sm ${stat.dark ? 'bg-stone-900 text-white' : 'bg-white'}`}>
              <div className="text-4xl font-serif mb-2">{stat.value}</div>
              <div className={`text-[10px] uppercase tracking-widest ${stat.dark ? 'text-stone-400' : 'text-stone-400'}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageWrapper>
);

const Services = () => (
  <PageWrapper>
    <section className="max-w-6xl mx-auto px-6">
      <SectionHeader title="Expertise & Services" subtitle="A multi-disciplinary approach to solving business challenges." />
      <div className="space-y-12">
        {[
          { icon: <BarChart3 className="w-5 h-5 text-white" />, title: "Data Analysis", items: ["Data Entry & Visualization", "Basic SQL Queries", "Spreadsheet creation", "Research summaries"] },
          { icon: <Code2 className="w-5 h-5 text-white" />, title: "Web Development", items: ["Responsive Websites", "HTML/CSS", "Node.js & Python Backend", "Git Version Control"] },
          { icon: <LayoutIcon className="w-5 h-5 text-white" />, title: "Virtual Assistance", items: ["Inbox Management", "Calendar Scheduling", "Travel Coordination", "CRM Management"] },
          { icon: <Share2 className="w-5 h-5 text-white" />, title: "Creative & Content", items: ["Social Media Campaigns", "Email Marketing", "Canva Design", "Brand Development"] }
        ].map((service, i) => (
          <div key={i} className="grid md:grid-cols-3 gap-8 border-t border-stone-200 pt-12 hover:bg-stone-50/50 transition-colors p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center shrink-0 shadow-lg">
                {service.icon}
              </div>
              <h3 className="text-2xl font-serif">{service.title}</h3>
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              {service.items.map((item) => (
                <div key={item} className="flex items-start gap-3 group">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-stone-900 transition-colors shrink-0" />
                  <span className="text-stone-600 group-hover:text-stone-900 transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  </PageWrapper>
);

const PortfolioHub = () => (
  <PageWrapper>
    <section className="max-w-6xl mx-auto px-6">
      <SectionHeader title="Portfolio Hub" subtitle="Explore detailed portfolios for each of my professional roles." />
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { to: "/portfolio/va", title: "Virtual Assistant", desc: "Administrative, operational, and communication support for busy professionals.", icon: <LayoutIcon className="w-6 h-6" /> },
          { to: "/portfolio/data", title: "Data Analyst", desc: "Turning raw data into actionable insights through precision and visualization.", icon: <BarChart3 className="w-6 h-6" /> },
          { to: "/portfolio/web", title: "Web Developer", desc: "Building fast, responsive, and user-centric digital experiences.", icon: <Code2 className="w-6 h-6" /> }
        ].map((role, i) => (
          <Link 
            key={i} 
            to={role.to}
            className="group p-12 bg-stone-50 rounded-[3rem] border border-stone-100 hover:bg-white hover:shadow-2xl transition-all flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:bg-stone-900 group-hover:text-white transition-all">
              {role.icon}
            </div>
            <h3 className="text-2xl font-serif mb-4">{role.title}</h3>
            <p className="text-stone-500 mb-8 font-light leading-relaxed">{role.desc}</p>
            <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 group-hover:text-stone-900 transition-colors">
              View Detailed Portfolio <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  </PageWrapper>
);

const Experience = () => (
  <PageWrapper>
    <section className="max-w-6xl mx-auto px-6">
      <SectionHeader title="Experience" subtitle="My professional journey and key contributions." />
      <div className="space-y-16">
        {[
          { role: "Trade Finance Intern", company: "Euro Exim Bank (Remote)", period: "2024 – Present", desc: "Assisting in global trade finance documentation and processing letters of credit." },
          { role: "Freelance VA & Web Developer", company: "Fiverr, Upwork & Independent", period: "2022 – Present", desc: "Delivered over 50+ virtual assistance and design projects. Built responsive websites using HTML/CSS." },
          { role: "Graphic Designer & Media Producer", company: "Self-employed", period: "2021 – Present", desc: "Produced visual storytelling and music content. Designed branding kits for NGOs." },
          { role: "Public Speaking & Leadership", company: "Community Initiatives", period: "2020 – Present", desc: "Coaching peers and training youth in self-confidence and digital literacy." }
        ].map((exp, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-8 md:gap-20 pb-16 border-b border-stone-100 last:border-0">
            <div className="md:w-1/4">
              <span className="text-stone-400 font-serif text-xl italic">{exp.period}</span>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-3xl font-serif mb-2">{exp.role}</h3>
              <p className="text-stone-500 text-lg mb-6">{exp.company}</p>
              <p className="text-stone-600 leading-relaxed text-lg font-light">{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </PageWrapper>
);

const Education = () => (
  <PageWrapper>
    <section className="max-w-6xl mx-auto px-6">
      <SectionHeader title="Education & Certs" subtitle="Academic background and specialized certifications." />
      <div className="grid md:grid-cols-2 gap-24">
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-stone-100 rounded-xl"><GraduationCap className="w-6 h-6 text-stone-900" /></div>
            <h3 className="text-3xl font-serif">Academic</h3>
          </div>
          <div className="space-y-12">
            {[
              { title: "Industrial Chemistry", school: "University of Buea", year: "2025" },
              { title: "Software Engineering", school: "Holberton School", year: "2021 – 2022" },
              { title: "High School Diploma", school: "GHS BT", year: "2019, 2021" }
            ].map((edu, i) => (
              <div key={i} className="relative pl-8 border-l border-stone-100">
                <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-stone-900" />
                <h4 className="text-xl font-semibold mb-1">{edu.title}</h4>
                <p className="text-stone-500">{edu.school} | {edu.year}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-stone-100 rounded-xl"><Award className="w-6 h-6 text-stone-900" /></div>
            <h3 className="text-3xl font-serif">Certifications</h3>
          </div>
          <div className="grid sm:grid-cols-1 gap-4">
            {[
              { title: "Data Analytics", issuer: "GOOGLE" },
              { title: "Financial Analysis", issuer: "CFI" },
              { title: "Virtual Assistant", issuer: "Canva" },
              { title: "Digital Skills Fellowship", issuer: "Nkwa for Change" },
              { title: "Public Speaking", issuer: "CREMA" }
            ].map((cert, i) => (
              <div key={i} className="p-6 bg-stone-50 rounded-2xl border border-stone-100 flex justify-between items-center hover:bg-white hover:shadow-lg transition-all">
                <h4 className="font-medium">{cert.title}</h4>
                <span className="text-[10px] uppercase tracking-widest text-stone-400">{cert.issuer}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </PageWrapper>
);

const Contact = () => (
  <PageWrapper>
    <section className="max-w-6xl mx-auto px-6 text-center py-20">
      <SectionHeader title="Let’s Work Together" subtitle="Ready to support your business with professionalism and data-driven insights." />
      
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
        {[
          { icon: <Mail className="w-8 h-8" />, label: "Email Me", val: "saamkenah@gmail.com", href: "mailto:saamkenah@gmail.com" },
          { icon: <Phone className="w-8 h-8" />, label: "Call Me", val: "+237 673 608 784", href: "tel:+237673608784" },
          { icon: <Linkedin className="w-8 h-8" />, label: "LinkedIn", val: "Connect with me", href: "https://www.linkedin.com/in/saam-atumkezie-kenah-63057a285" }
        ].map((item, i) => (
          <a key={i} href={item.href} target="_blank" className="p-12 bg-stone-50 rounded-[3rem] text-center hover:bg-white hover:shadow-2xl transition-all border border-stone-100">
            <div className="text-stone-900 mb-6 flex justify-center">{item.icon}</div>
            <div className="font-semibold text-lg mb-2">{item.label}</div>
            <div className="text-stone-500 font-light">{item.val}</div>
          </a>
        ))}
      </div>

      <div className="bg-stone-900 text-white p-16 rounded-[4rem] shadow-2xl">
        <h3 className="text-4xl font-serif mb-8">Have a specific project?</h3>
        <p className="text-stone-400 mb-12 max-w-xl mx-auto">I'm currently accepting new clients for Virtual Assistance, Data Analysis, and Web Development projects.</p>
        <a href="mailto:saamkenah@gmail.com" className="inline-flex items-center gap-3 bg-white text-stone-900 px-12 py-6 rounded-full font-bold hover:scale-105 transition-all">
          Send a Message <Send className="w-5 h-5" />
        </a>
      </div>
    </section>
  </PageWrapper>
);

// --- Layout ---

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/experience", label: "Experience" },
    { to: "/education", label: "Education" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <div className="min-h-screen bg-[#fdfcfb] selection:bg-stone-200">
      <nav className="fixed top-0 w-full z-50 bg-[#fdfcfb]/80 backdrop-blur-xl border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl font-bold tracking-tighter hover:opacity-70 transition-opacity">Saam.</Link>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-10 text-[11px] uppercase tracking-[0.2em] font-bold text-stone-400">
            {navLinks.map((link) => (
              <NavLink 
                key={link.to}
                to={link.to} 
                className={({ isActive }) => 
                  `transition-all hover:text-stone-900 ${isActive ? 'text-stone-900' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/contact" 
              className="hidden sm:block bg-stone-900 text-white px-8 py-3 rounded-full text-xs font-bold hover:bg-stone-800 transition-all shadow-lg"
            >
              Hire Me
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-stone-100 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <NavLink 
                    key={link.to}
                    to={link.to} 
                    className={({ isActive }) => 
                      `text-lg font-serif flex items-center justify-between ${isActive ? 'text-stone-900' : 'text-stone-400'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label} <ChevronRight className="w-4 h-4 opacity-30" />
                  </NavLink>
                ))}
                <Link 
                  to="/contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-4 bg-stone-900 text-white px-8 py-4 rounded-2xl text-center font-bold shadow-xl"
                >
                  Hire Me
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence mode="wait">
        <main>
          {children}
        </main>
      </AnimatePresence>

      <footer className="border-t border-stone-100 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <span className="font-serif text-3xl font-bold tracking-tighter mb-4 block">Saam Atumkezie Kenah</span>
            <p className="text-stone-400 text-sm max-w-xs">Professional Virtual Assistant, Data Analyst, and Web Developer based in Cameroon.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-8 text-stone-400">
              <a href="https://github.com/kenah77" target="_blank" className="hover:text-stone-900 transition-all hover:scale-110"><Github className="w-6 h-6" /></a>
              <a href="https://www.linkedin.com/in/saam-atumkezie-kenah-63057a285" target="_blank" className="hover:text-stone-900 transition-all hover:scale-110"><Linkedin className="w-6 h-6" /></a>
              <a href="mailto:saamkenah@gmail.com" className="hover:text-stone-900 transition-all hover:scale-110"><Mail className="w-6 h-6" /></a>
            </div>
            <p className="text-stone-300 text-[10px] uppercase tracking-widest font-bold">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<PortfolioHub />} />
          <Route path="/portfolio/va" element={<RolePortfolio data={VA_DATA} />} />
          <Route path="/portfolio/data" element={<RolePortfolio data={DATA_DATA} />} />
          <Route path="/portfolio/web" element={<RolePortfolio data={WEB_DATA} />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}
