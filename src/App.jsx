import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Circle,
  Code2,
  Command,
  Copy,
  ExternalLink,
  GitBranch,
  Mail,
  MapPin,
  Menu,
  Play,
  RotateCcw,
  Send,
  Sparkles,
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
        <img src={project.cover} alt="" loading="lazy" />
        <div className="project-card__shade" />
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

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <button className="modal__backdrop" onClick={onClose} aria-label="Close case study" />
      <motion.div
        className="modal__panel"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close case study">
          <X size={20} />
        </button>
        <div className="modal__hero">
          <img src={project.cover} alt={project.title} />
          <div className="modal__hero-shade" />
          <div className="modal__hero-copy">
            <span className="eyebrow">{project.category} / {project.year}</span>
            <h2>{project.title}</h2>
            <p>{project.tagline}</p>
          </div>
        </div>
        <div className="modal__content">
          <div className="modal__main">
            <div className="modal__section">
              <span className="eyebrow">The brief</span>
              <p className="modal__lead">{project.problem || project.tagline}</p>
            </div>
            {project.process?.length > 0 && (
              <div className="modal__section">
                <span className="eyebrow">The process</span>
                <div className="process-list">
                  {project.process.map((step, index) => (
                    <div className="process-item" key={step.title}>
                      <span className="process-item__number">0{index + 1}</span>
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <aside className="modal__aside">
            <div className="modal__aside-block">
              <span className="eyebrow">Stack</span>
              <div className="tag-list tag-list--large">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
            {project.features?.length > 0 && (
              <div className="modal__aside-block">
                <span className="eyebrow">Highlights</span>
                <ul className="feature-list">
                  {project.features.map((feature) => (
                    <li key={feature}><ChevronRight size={15} />{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="modal__links">
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live site <ExternalLink size={15} /></a>}
              {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer">Source code <Code2 size={15} /></a>}
            </div>
          </aside>
        </div>
      </motion.div>
    </motion.div>
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

  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [filter, setFilter] = useState("All");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [target, setTarget] = useState(null);

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
    if (!activeProject && !commandOpen) return undefined;
    const handleEscape = (event) => event.key === "Escape" && (setActiveProject(null), setCommandOpen(false));
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeProject, commandOpen]);

  useEffect(() => {
    if (!isPlaying) return undefined;
    if (timeLeft <= 0) {
      setIsPlaying(false);
      setTarget(null);
      return undefined;
    }
    const timer = window.setTimeout(() => setTimeLeft((time) => time - 1), 1000);
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
    <div className="site-shell">
      <header className="site-nav">
        <button className="brand-mark" onClick={() => scrollTo("hero")} aria-label="Back to top">
          <span>JD</span><i>.</i>
        </button>
        <nav className="site-nav__links" aria-label="Main navigation">
          {navItems.map((item) => <button key={item.target} onClick={() => scrollTo(item.target)}>{item.label}</button>)}
        </nav>
        <div className="site-nav__actions">
          <span className="availability"><i /> Available for select work</span>
          <button className="command-trigger" onClick={() => setCommandOpen(true)} aria-label="Open command menu"><Command size={15} /><kbd>⌘K</kbd></button>
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
          <div className="hero__copy">
            <div className="hero__eyebrow"><span className="eyebrow-dot" /> Independent creative engineer / {siteData.location}</div>
            <h1>Interfaces<br /><em>with a</em><br /><strong>point of view.</strong></h1>
            <p className="hero__intro">{siteData.tagline}</p>
            <div className="hero__actions">
              <button className="button button--primary" onClick={() => scrollTo("projects")}>Explore selected work <ArrowUpRight size={17} /></button>
              <button className="text-link" onClick={() => scrollTo("contact")}>Start a conversation <ArrowRight size={17} /></button>
            </div>
          </div>
          <div className="hero__visual">
            <div className="portrait-card">
              <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=85&w=900" alt="Portrait" />
              <div className="portrait-card__tint" />
              <span className="portrait-card__label">01 / 04 — profile</span>
              <div className="portrait-card__caption"><span>JANE<br />DOE</span><small>Building digital spaces<br />with a little more feeling.</small></div>
            </div>
            <div className="hero__orbit hero__orbit--one" />
            <div className="hero__orbit hero__orbit--two" />
            <div className="hero__note"><Sparkles size={14} /> Human-centered / system-minded</div>
          </div>
          <div className="hero__footer">
            <span>Scroll to explore</span><div className="scroll-line"><i /></div><span>01 — 06</span>
          </div>
        </section>

        <section className="signal-strip">
          <div><span>Based in</span><strong>{siteData.location}</strong></div>
          <div><span>Focus</span><strong>Frontend · UI/UX · WebGL</strong></div>
          <div><span>Currently</span><strong>Open to the right problem</strong></div>
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
          <motion.div layout className="projects-grid">{filteredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} onOpen={setActiveProject} />)}</motion.div>
        </section>

        <section className="approach-section section-wrap" id="approach">
          <Reveal><SectionLabel number="03" eyebrow="The toolkit" title="Systems make room for better ideas." description="The tools change with the problem. The standard stays the same: thoughtful structure, expressive details, and an experience that gets out of the way." /></Reveal>
          <div className="toolkit-grid">
            <Reveal className="skill-cloud" delay={0.08}><div className="skill-cloud__header"><span className="eyebrow">Working toolkit</span><span>01 — 04</span></div><div className="skill-cloud__items">{skillsData.map((skill, index) => <span key={skill.id} className={index % 5 === 0 ? "is-featured" : ""}>{skill.label}</span>)}</div><div className="skill-cloud__footer"><span>Most fluent in</span><strong>React / Design systems / Motion</strong></div></Reveal>
            <Reveal className="experience-list" delay={0.14}><div className="skill-cloud__header"><span className="eyebrow">Selected experience</span><span>02 — 04</span></div>{experienceData.map((job) => <div className="experience-item" key={job.id}><div className="experience-item__year">{job.dates.split(" ")[0]}<br />— {job.dates.split(" ").pop()}</div><div><h3>{job.role}</h3><p>{job.company} · {job.location}</p><div className="experience-item__tags">{job.tech.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}</div></div></div>)}</Reveal>
          </div>
        </section>

        <section className="lab-section section-wrap">
          <Reveal className="lab-card"><div className="lab-card__copy"><div className="section-heading__meta"><span className="section-number">04</span><span className="eyebrow">The lab</span></div><h2>Small experiments.<br /><em>Useful mischief.</em></h2><p>A tiny reaction test, because a portfolio should have at least one thing that does not belong in a case study.</p><button className="button button--outline" onClick={startGame}>{isPlaying ? "Running…" : <><Play size={15} /> {timeLeft === 0 ? "Try again" : "Start the test"}</>}</button></div><div className="reaction-stage" aria-label="Reaction test game">{!isPlaying && timeLeft !== 0 && <div className="reaction-stage__idle"><Circle size={24} /><span>Click start.<br />Find the dot.</span></div>}{isPlaying && <><div className="reaction-stage__stats"><span>Score <strong>{score}</strong></span><span>Time <strong>00:{String(timeLeft).padStart(2, "0")}</strong></span></div>{target && <button className="reaction-target" onClick={() => { setScore((current) => current + 1); spawnTarget(); }} style={{ left: `${target.x}%`, top: `${target.y}%` }} aria-label="Hit target" />}</>}{!isPlaying && timeLeft === 0 && <div className="reaction-stage__result"><span>Final score</span><strong>{score}</strong><button onClick={startGame}><RotateCcw size={15} /> reset</button></div>}</div></Reveal>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <Reveal className="contact-heading"><div className="section-heading__meta"><span className="section-number">05</span><span className="eyebrow">Let’s make something</span></div><h2>Have a good<br /><em>problem?</em></h2><p>Tell me what you’re working through. I’m always interested in the part that hasn’t been figured out yet.</p></Reveal>
          <div className="contact-grid"><Reveal className="contact-form-wrap" delay={0.08}>{isSuccess ? <div className="success-state"><span><Check size={22} /></span><h3>Message received.</h3><p>Thanks for reaching out — I’ll get back to you shortly.</p><button className="text-link" onClick={() => setIsSuccess(false)}>Send another <ArrowRight size={16} /></button></div> : <form className="contact-form" onSubmit={handleSubmit}><label>Name<input name="name" required minLength="2" placeholder="Your name" /></label><label>Email<input name="email" required type="email" placeholder="you@company.com" /></label><label>What are we making?<textarea name="message" required minLength="10" rows="4" placeholder="A few words about the project…" /></label><button className="button button--primary" disabled={isSubmitting}>{isSubmitting ? "Sending…" : <>Send the signal <Send size={16} /></>}</button></form>}</Reveal><Reveal className="contact-details" delay={0.14}><div className="contact-email"><span className="eyebrow">Direct line</span><button onClick={copyEmail}>{siteData.email}<span>{copied ? <Check size={17} /> : <Copy size={17} />}</span></button><small>{copied ? "Copied to clipboard" : "Click to copy email"}</small></div><div className="contact-socials"><span className="eyebrow">Elsewhere</span>{socialItems.map(({ label, href, icon: Icon }) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{label}<Icon size={16} /></a>)}</div><div className="contact-location"><MapPin size={16} /><span>{siteData.location}<br />Available worldwide</span></div></Reveal></div>
        </section>
      </main>

      <footer className="site-footer"><div className="brand-lockup"><span>JD</span><i>.</i></div><p>Designed, built, and occasionally overthought by {siteData.name}.</p><button onClick={() => scrollTo("hero")} aria-label="Back to top">Back to top <ArrowUpRight size={16} /></button></footer>
      <CommandMenu open={commandOpen} onClose={() => setCommandOpen(false)} onNavigate={scrollTo} onCopyEmail={copyEmail} />
      <AnimatePresence>{activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}</AnimatePresence>
    </div>
  );
}

export default App;
