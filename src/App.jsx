import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Circle,
  Command,
  Copy,
  GitBranch,
  Mail,
  MapPin,
  Menu,
  Play,
  RotateCcw,
  Send,
  Sparkles,
  Sun,
  Moon,
  X,
} from "lucide-react";
import projectsData from "./data/projects";
import skillsData from "./data/skills";
import experienceData from "./data/experience";
import siteData from "./data/site";

const navItems = [
  { label: "About", target: "about" },
  { label: "Work", target: "projects" },
  { label: "Approach", target: "approach" },
  { label: "Contact", target: "contact" },
];

const socialItems = [
  { label: "GitHub", href: siteData.github, icon: GitBranch },
  { label: "LinkedIn", href: siteData.linkedin, icon: BriefcaseBusiness },
  { label: "Email", href: `mailto:${siteData.email}`, icon: Mail },
];

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ number, eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <div className="section-heading__meta">
        <span className="section-number">{number}</span>
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function ProjectCard({ project, index, onOpen }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={`project-card project-card--${index % 3}`}
      onClick={() => onOpen(project)}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onOpen(project);
      }}
      aria-label={`Open case study for ${project.title}`}
    >
      <div className="project-card__media">
        <div className={`project-visual project-visual--${project.visual || project.slug}`} aria-hidden="true">
          <span className="project-visual__stamp">FLIGHT LOG / {String(index + 1).padStart(2, "0")}</span>
          <span className="project-visual__word">{project.visualLabel || project.title}</span>
          <span className="project-visual__grid" />
          <span className="project-visual__signal" />
        </div>
        <div className="project-card__topline">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <span className="project-card__open" aria-hidden="true">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="project-card__body">
        <div>
          <p className="project-card__index">0{index + 1} / 06</p>
          <h3>{project.title}</h3>
          <p className="project-card__tagline">{project.tagline}</p>
        </div>
        <div className="tag-list">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function CommandMenu({ open, onClose, onNavigate, onCopyEmail }) {
  const [query, setQuery] = useState("");
  const commands = [
    ...navItems.map((item) => ({ label: `Go to ${item.label}`, hint: "Navigate", action: () => onNavigate(item.target) })),
    { label: "Copy email address", hint: siteData.email, action: onCopyEmail },
    { label: "Open GitHub", hint: "External link", action: () => window.open(siteData.github, "_blank") },
  ];
  const filteredCommands = commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="command-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="modal__backdrop" onClick={onClose} aria-label="Close command menu" />
          <motion.div className="command-menu" initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }}>
            <div className="command-menu__input">
              <Command size={18} />
              <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What do you want to find?" onKeyDown={(event) => event.key === "Escape" && onClose()} />
              <kbd>ESC</kbd>
            </div>
            <div className="command-menu__list">
              {filteredCommands.length === 0 ? <p className="command-menu__empty">No command found.</p> : filteredCommands.map((command) => (
                <button key={command.label} onClick={() => { command.action(); onClose(); }}>
                  <span>{command.label}</span><small>{command.hint}</small><ArrowRight size={16} />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const projectIndex = projectsData.findIndex((project) => project.slug === slug);
  const project = projectsData[projectIndex];

  if (!project) {
    return (
      <div className="route-message">
        <span className="eyebrow">404 / coordinates unknown</span>
        <h1>This project went off-course.</h1>
        <button className="button button--primary" onClick={() => navigate("/")}>Return to base <ArrowUpRight size={16} /></button>
      </div>
    );
  }

  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];
  return (
    <div className="case-study-page">
      <header className="case-study-nav section-wrap">
        <button className="brand-mark" onClick={() => navigate("/")} aria-label="Back to home">{siteData.initials}<i>.</i></button>
        <button className="text-link" onClick={() => navigate(-1)}><ArrowRight size={16} style={{ transform: "rotate(180deg)" }} /> Back to index</button>
      </header>
      <main>
        <section className="case-study-hero section-wrap">
          <div className="case-study-hero__meta"><span className="eyebrow">{project.category} / {project.year}</span><span className="eyebrow">Case study 0{projectIndex + 1}</span></div>
          <h1>{project.title}<em>.</em></h1>
          <p>{project.tagline}</p>
          <div className={`case-study-visual project-visual--${project.visual || project.slug}`}><span className="project-visual__stamp">FLIGHT LOG / {String(projectIndex + 1).padStart(2, "0")}</span><span className="project-visual__word">{project.visualLabel || project.title}</span><span className="project-visual__grid" /><span className="project-visual__signal" /></div>
        </section>
        <section className="case-study-summary section-wrap"><div><span className="eyebrow">Role</span><strong>{project.role || "Creative engineer"}</strong></div><div><span className="eyebrow">Timeline</span><strong>{project.timeline || project.year}</strong></div><div><span className="eyebrow">Stack</span><strong>{project.tags.join(" · ")}</strong></div></section>
        <section className="case-study-body section-wrap">
          <div className="case-study-body__main"><span className="eyebrow">The brief</span><h2>{project.problem || "A focused digital experience built around clarity, momentum, and the needs of its users."}</h2><span className="eyebrow">The approach</span><div className="case-study-process">{(project.process?.length ? project.process : [{ title: "A concise, intentional system", description: project.tagline }]).map((step, index) => <div key={step.title} className="case-study-step"><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></div>)}</div></div>
          <aside className="case-study-body__aside"><span className="eyebrow">Outcomes</span>{project.results?.length ? <div className="result-grid">{project.results.map((result) => <div key={result.label}><strong>{result.value}</strong><span>{result.label}</span></div>)}</div> : <p className="case-study-note">A compact build focused on a clear interaction model and a strong visual point of view.</p>}<span className="eyebrow">Highlights</span><ul className="feature-list">{(project.features?.length ? project.features : ["Thoughtful interaction design", "Responsive by default", "Built to feel unmistakably its own"]).map((feature) => <li key={feature}><ChevronRight size={15} />{feature}</li>)}</ul></aside>
        </section>
        <section className="next-project section-wrap"><span className="eyebrow">Next coordinate</span><button onClick={() => navigate(`/work/${nextProject.slug}`)}><span>{nextProject.title}</span><ArrowUpRight size={22} /></button></section>
      </main>
    </div>
  );
}

function NotFoundPage() {
  const navigate = useNavigate();
  return <div className="route-message"><span className="eyebrow">404 / signal lost</span><h1>Houston, we have a small problem.</h1><p>The page you requested is not in this flight plan.</p><div><button className="button button--primary" onClick={() => navigate("/")}>Return to base</button><button className="text-link" onClick={() => navigate("/#contact")}>Contact me <ArrowRight size={16} /></button></div></div>;
}

function PortfolioApp() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [theme, setTheme] = useState(() => localStorage.getItem("flight-log-theme") || "dark");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [target, setTarget] = useState(null);
  const [telemetry, setTelemetry] = useState({ scroll: 0, time: "--:--" });
  const [roleIndex, setRoleIndex] = useState(0);

  const categories = useMemo(() => ["All", ...new Set(projectsData.map((project) => project.category))], []);
  const filteredProjects = useMemo(() => projectsData.filter((project) => filter === "All" || project.category === filter), [filter]);

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((isOpen) => !isOpen);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (!commandOpen) return undefined;
    const handleEscape = (event) => event.key === "Escape" && setCommandOpen(false);
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [commandOpen]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("flight-log-theme", theme);
  }, [theme]);

  useEffect(() => {
    const updateTelemetry = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scroll = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 0;
      setTelemetry({ scroll, time: new Intl.DateTimeFormat([], { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()) });
    };
    updateTelemetry();
    window.addEventListener("scroll", updateTelemetry, { passive: true });
    const clock = window.setInterval(updateTelemetry, 30000);
    return () => { window.removeEventListener("scroll", updateTelemetry); window.clearInterval(clock); };
  }, []);

  useEffect(() => {
    const rotation = window.setInterval(() => setRoleIndex((index) => (index + 1) % siteData.roles.length), 3200);
    return () => window.clearInterval(rotation);
  }, []);

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = window.setTimeout(() => setTimeLeft((time) => {
      if (time <= 1) {
        setIsPlaying(false);
        setTarget(null);
        return 0;
      }
      return time - 1;
    }), 1000);
    return () => window.clearTimeout(timer);
  }, [isPlaying, timeLeft]);

  const scrollTo = (targetId) => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
    setCommandOpen(false);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteData.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${siteData.email}`;
    }
  };

  const spawnTarget = () => setTarget({ x: Math.random() * 76 + 12, y: Math.random() * 58 + 24 });
  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setIsPlaying(true);
    spawnTarget();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setIsSubmitting(false);
    setIsSuccess(true);
    event.currentTarget.reset();
    window.setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className={`site-shell theme-${theme}`}>
      <header className="site-nav">
        <button className="brand-mark" onClick={() => scrollTo("hero")} aria-label={`Back to top — ${siteData.name}`}>
          <span>{siteData.initials}</span><i>.</i>
        </button>
        <nav className="site-nav__links" aria-label="Main navigation">
          {navItems.map((item) => <button key={item.target} onClick={() => scrollTo(item.target)}>{item.label}</button>)}
        </nav>
        <div className="site-nav__actions">
          <span className="availability"><i /> {siteData.availability}</span>
          <button className="theme-trigger" onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>{theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}</button>
          <button className="command-trigger" onClick={() => setCommandOpen(true)} aria-label="Open command menu"><Command size={15} /><kbd>⌘K</kbd></button>
          <button className="hire-trigger" onClick={() => scrollTo("contact")}>Hire me</button>
          <button className="menu-trigger" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation menu">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && <motion.div className="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
          {navItems.map((item) => <button key={item.target} onClick={() => scrollTo(item.target)}>{item.label}<ArrowUpRight size={18} /></button>)}
          <button onClick={() => setCommandOpen(true)}>Open command menu <Command size={18} /></button>
        </motion.div>}
      </AnimatePresence>

      <main>
        <section className="hero section-wrap" id="hero">
          <div className="hero__grid" aria-hidden="true"><span /><span /><span /><span /><span /></div>
          <div className="hero__telemetry" aria-label="Live portfolio telemetry"><span>SYS / ONLINE</span><span>LOCAL {telemetry.time}</span><span>SCROLL {String(telemetry.scroll).padStart(2, "0")}%</span></div>
          <div className="hero__copy">
          <div className="hero__eyebrow"><span className="eyebrow-dot" /> {siteData.name} / {siteData.location}</div>
            <h1>Digital products<br /><em>with clarity</em><br /><strong>and character.</strong></h1>
            <p className="hero__intro">{siteData.tagline}</p>
            <div className="hero__actions">
              <button className="button button--primary" onClick={() => scrollTo("projects")}>Explore selected work <ArrowUpRight size={17} /></button>
              <button className="text-link" onClick={() => scrollTo("contact")}>Start a conversation <ArrowRight size={17} /></button>
            </div>
          </div>
          <div className="hero__visual">
            <svg className="hero__trajectory" viewBox="0 0 640 520" aria-hidden="true"><path d="M-30 420 C160 40 420 30 670 245 C490 430 250 505 40 255 C175 115 430 125 670 420" /><circle cx="435" cy="104" r="5" /><circle cx="435" cy="104" r="12" /></svg>
            <div className="portrait-card">
              <div className="portrait-graphic" aria-label="Abstract portrait graphic"><span>{siteData.initials}</span><i /><b /><em /></div>
              <span className="portrait-card__label">01 / 04 — profile</span>
              <div className="portrait-card__caption"><span>{siteData.name.split(" ")[0]}<br />{siteData.name.split(" ").slice(1).join(" ")}</span><small>Building digital spaces<br />with a little more feeling.</small></div>
            </div>
            <div className="hero__orbit hero__orbit--one" />
            <div className="hero__orbit hero__orbit--two" />
          <div className="hero__note"><Sparkles size={14} /> <span className="role-rotator">{siteData.roles[roleIndex]}</span></div>
          </div>
          <div className="hero__footer">
            <span>Scroll to explore</span><div className="scroll-line"><i /></div><span>01 — 06</span>
          </div>
        </section>

        <section className="signal-strip">
          <div><span>Based in</span><strong>{siteData.location}</strong></div>
          <div><span>Focus</span><strong>Frontend · UI/UX · WebGL</strong></div>
          <div><span>Currently</span><strong>{siteData.availability}</strong></div>
          <div><span>Local time</span><strong>09:42 — EST</strong></div>
        </section>

        <section className="section-wrap about-section" id="about">
          <Reveal className="section-intro-row"><SectionLabel number="01" eyebrow="A little context" title="The work sits between logic and feeling." description="I design and build digital products for people who care about how something works — and how it makes someone feel." /><div className="section-intro-row__aside"><span className="aside-mark">↘</span><p>From complex data tools to expressive brand systems, I turn ambitious ideas into interfaces that feel obvious in hindsight.</p></div></Reveal>
          <div className="about-grid">
            <Reveal className="about-copy" delay={0.08}><p>{siteData.bio.split("\n\n")[0]}</p><p>{siteData.bio.split("\n\n")[1]}</p><button className="text-link" onClick={() => scrollTo("contact")}>More about the approach <ArrowRight size={17} /></button></Reveal>
            <Reveal className="principle-card" delay={0.14}><span className="eyebrow">How I work</span><div className="principle-card__quote">Good interfaces are quiet about the complexity behind them.</div><div className="principle-card__footer"><span>02 / 03</span><div className="principle-dots"><i className="is-active" /><i /><i /></div></div></Reveal>
          </div>
        </section>

        <section className="projects-section section-wrap" id="projects">
          <Reveal><SectionLabel number="02" eyebrow="Selected work" title="A few things I’ve shipped." description="A small edit of product, platform, and brand work. Click a project to see the thinking behind it." /></Reveal>
          <Reveal className="project-toolbar" delay={0.08}><div className="filter-row" aria-label="Filter projects">{categories.map((category) => <button key={category} className={filter === category ? "is-active" : ""} onClick={() => setFilter(category)}>{category}</button>)}</div><span className="project-count">{String(filteredProjects.length).padStart(2, "0")} projects</span></Reveal>
          <motion.div layout className="projects-grid">{filteredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} onOpen={() => navigate(`/work/${project.slug}`)} />)}</motion.div>
        </section>

        <section className="approach-section section-wrap" id="approach">
          <Reveal><SectionLabel number="03" eyebrow="The toolkit" title="Systems make room for better ideas." description="The tools change with the problem. The standard stays the same: thoughtful structure, expressive details, and an experience that gets out of the way." /></Reveal>
          <div className="toolkit-grid">
            <Reveal className="skill-cloud" delay={0.08}><div className="skill-cloud__header"><span className="eyebrow">Working toolkit</span><span>01 — 04</span></div><div className="skill-cloud__items">{skillsData.map((skill, index) => <span key={skill.id} className={index % 5 === 0 ? "is-featured" : ""}>{skill.label}</span>)}</div><div className="skill-cloud__footer"><span>Most fluent in</span><strong>React / Design systems / Motion</strong></div></Reveal>
            <Reveal className="experience-list" delay={0.14}><div className="skill-cloud__header"><span className="eyebrow">Selected experience</span><span>02 — 04</span></div>{experienceData.map((job) => <div className="experience-item" key={job.id}><div className="experience-item__year">{job.dates.split(" ")[0]}<br />— {job.dates.split(" ").pop()}</div><div><h3>{job.role}</h3><p>{job.company} · {job.location}</p><div className="experience-item__tags">{job.tech.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}</div></div></div>)}</Reveal>
          </div>
        </section>

        <section className="lab-section section-wrap">
          <Reveal className="lab-card"><div className="lab-card__copy"><div className="section-heading__meta"><span className="section-number">04</span><span className="eyebrow">Selected experiments</span></div><h2>Small systems.<br /><em>Carefully considered.</em></h2><p>A compact interaction study exploring timing, feedback, and the details that make a product feel responsive.</p><button className="button button--outline" onClick={startGame}>{isPlaying ? "Running…" : <><Play size={15} /> {timeLeft === 0 ? "Run again" : "Run the study"}</>}</button></div><div className="reaction-stage" aria-label="Interactive timing study">{!isPlaying && timeLeft !== 0 && <div className="reaction-stage__idle"><Circle size={24} /><span>Start the study.<br />Follow the signal.</span></div>}{isPlaying && <><div className="reaction-stage__stats"><span>Score <strong>{score}</strong></span><span>Time <strong>00:{String(timeLeft).padStart(2, "0")}</strong></span></div>{target && <button className="reaction-target" onClick={() => { setScore((current) => current + 1); spawnTarget(); }} style={{ left: `${target.x}%`, top: `${target.y}%` }} aria-label="Hit target" />}</>}{!isPlaying && timeLeft === 0 && <div className="reaction-stage__result"><span>Final score</span><strong>{score}</strong><button onClick={startGame}><RotateCcw size={15} /> reset</button></div>}</div></Reveal>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <Reveal className="contact-heading"><div className="section-heading__meta"><span className="section-number">05</span><span className="eyebrow">Start a conversation</span></div><h2>Let’s build<br /><em>something useful.</em></h2><p>Tell me what you’re working on, where you are in the process, and what a successful outcome looks like.</p></Reveal>
          <div className="contact-grid"><Reveal className="contact-form-wrap" delay={0.08}>{isSuccess ? <div className="success-state"><span><Check size={22} /></span><h3>Message received.</h3><p>Thanks for reaching out — I’ll get back to you shortly.</p><button className="text-link" onClick={() => setIsSuccess(false)}>Send another <ArrowRight size={16} /></button></div> : <form className="contact-form" onSubmit={handleSubmit}><label>Name<input name="name" required minLength="2" placeholder="Your name" /></label><label>Email<input name="email" required type="email" placeholder="you@company.com" /></label><label>What are we making?<textarea name="message" required minLength="10" rows="4" placeholder="A few words about the project…" /></label><button className="button button--primary" disabled={isSubmitting}>{isSubmitting ? "Sending…" : <>Send the signal <Send size={16} /></>}</button></form>}</Reveal><Reveal className="contact-details" delay={0.14}><div className="contact-email"><span className="eyebrow">Direct line</span><button onClick={copyEmail}>{siteData.email}<span>{copied ? <Check size={17} /> : <Copy size={17} />}</span></button><small>{copied ? "Copied to clipboard" : "Click to copy email"}</small></div><div className="contact-socials"><span className="eyebrow">Elsewhere</span>{socialItems.map(({ label, href, icon: Icon }) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{label}<Icon size={16} /></a>)}</div><div className="contact-location"><MapPin size={16} /><span>{siteData.location}<br />Available worldwide</span></div></Reveal></div>
        </section>
      </main>

      <footer className="site-footer"><div className="brand-lockup"><span>{siteData.initials}</span><i>.</i></div><p>Designed, built, and occasionally overthought by {siteData.name}.</p><button onClick={() => scrollTo("hero")} aria-label="Back to top">Back to top <ArrowUpRight size={16} /></button></footer>
      <CommandMenu open={commandOpen} onClose={() => setCommandOpen(false)} onNavigate={scrollTo} onCopyEmail={copyEmail} />
    </div>
  );
}

function App() {
  return <BrowserRouter><Routes><Route path="/" element={<PortfolioApp />} /><Route path="/work/:slug" element={<ProjectPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></BrowserRouter>;
}

export default App;
