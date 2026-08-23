"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";

import { skillGroups } from "@/data/capabilities";
import {
  projectFilters,
  projects,
  type Project,
  type ProjectFilter,
} from "@/data/projects";
import { navigation, siteConfig } from "@/data/site";
import {
  technologies,
  technologyById,
  type Technology,
} from "@/data/technologies";
import { ProjectVisual } from "./ProjectVisual";
import { TechIcon } from "./TechIcon";
import { AutomationEngine } from "./AutomationEngine";

const heroWorkflow = [
  { label: "Webhook", detail: "Event received" },
  { label: "Validation", detail: "Payload trusted" },
  { label: "Business Rules", detail: "Route selected" },
  { label: "AI Analysis", detail: "Output structured" },
  { label: "Database", detail: "State recorded" },
  { label: "Notification", detail: "Team informed" },
] as const;

const practiceKeywords = [
  "Responsive systems",
  "Typed APIs",
  "AI agents",
  "Reliable state",
  "Human handoff",
] as const;

const technicalEase = [0.22, 1, 0.36, 1] as const;

const heroHeadlineVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.09 } },
};

const heroLineVariants = {
  hidden: { y: "112%" },
  visible: {
    y: "0%",
    transition: { duration: 0.92, ease: technicalEase },
  },
};

const heroSystemNodeVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.62,
      delay: 0.26 + index * 0.12,
      ease: technicalEase,
    },
  }),
};

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [accent, setAccent] = useState("#44cfff");
  const [introReady, setIntroReady] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const completeIntro = useCallback(() => setIntroReady(true), []);

  const openProject = (project: Project, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSelectedProject(project);
  };

  return (
    <div
      className="portfolio-shell"
      style={{ "--active-accent": accent } as CSSProperties}
    >
      <Loader onComplete={completeIntro} />
      <AnimationSystem />
      <CustomCursor />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />

      <main id="main-content">
        <Hero introReady={introReady} />
        <PracticeBridge />
        <ProjectsSection onAccent={setAccent} onOpen={openProject} />
        <AutomationEngine />
        <TechnologySection />
        <SkillsSection />
        <ContactSection />
      </main>

      <AnimatePresence>
        {selectedProject ? (
          <CaseStudyOverlay
            key={selectedProject.id}
            project={selectedProject}
            returnFocusRef={triggerRef}
            onClose={() => setSelectedProject(null)}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Loader({ onComplete }: { onComplete: () => void }) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduceMotion || window.sessionStorage.getItem("rr-loader-seen")) {
      const frame = window.requestAnimationFrame(() => {
        setVisible(false);
        onComplete();
      });
      return () => window.cancelAnimationFrame(frame);
    }

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem("rr-loader-seen", "true");
      setVisible(false);
      onComplete();
    }, 1450);

    return () => window.clearTimeout(timer);
  }, [onComplete, reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="loader-orbit">
            <div className="loader-mark">
              <span>R</span>
              <span>R</span>
              <i />
            </div>
          </div>
          <div className="loader-progress"><span /></div>
          <p>Interface connected to infrastructure</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function AnimationSystem() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let destroy = () => undefined;

    const setup = async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });
      const updateScroll = () => ScrollTrigger.update();
      const tick = (time: number) => lenis.raf(time * 1000);
      const stopScroll = () => lenis.stop();
      const startScroll = () => lenis.start();

      lenis.on("scroll", updateScroll);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      window.addEventListener("portfolio:scroll-stop", stopScroll);
      window.addEventListener("portfolio:scroll-start", startScroll);

      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 54, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.95,
              ease: "power4.out",
              scrollTrigger: { trigger: element, start: "top 88%", once: true },
            },
          );
        });

        gsap.to(".practice-rail.frontend", {
          xPercent: 2.5,
          ease: "none",
          scrollTrigger: { trigger: ".practice-bridge", scrub: 1, start: "top bottom", end: "bottom top" },
        });
        gsap.to(".practice-rail.automation", {
          xPercent: -2.5,
          ease: "none",
          scrollTrigger: { trigger: ".practice-bridge", scrub: 1, start: "top bottom", end: "bottom top" },
        });
      });

      destroy = () => {
        context.revert();
        window.removeEventListener("portfolio:scroll-stop", stopScroll);
        window.removeEventListener("portfolio:scroll-start", startScroll);
        gsap.ticker.remove(tick);
        lenis.off("scroll", updateScroll);
        lenis.destroy();
      };
    };

    void setup();
    return () => {
      disposed = true;
      destroy();
    };
  }, []);

  return null;
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canUse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canUse || reduceMotion) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    document.body.classList.add("has-custom-cursor");
    let frame = 0;
    let x = -100;
    let y = -100;

    const render = () => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = 0;
    };
    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      cursor.classList.toggle("is-view", Boolean(target?.closest("[data-cursor='view']")));
      cursor.classList.toggle("is-link", Boolean(target?.closest("a, button")));
      if (!frame) frame = window.requestAnimationFrame(render);
    };
    const leave = () => cursor.classList.add("is-hidden");
    const enter = () => cursor.classList.remove("is-hidden");

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span>View</span>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="monogram" href="#top" aria-label="Raheeb ur Rehman, back to top">
        {siteConfig.initials}<span className="monogram-dot" aria-hidden="true" />
      </a>
      <nav aria-label="Primary navigation">
        <ul className="nav-list">
          {navigation.map((item) => (
            <li key={item.href}><a href={item.href}>{item.label}</a></li>
          ))}
        </ul>
      </nav>
      <a className="availability-pill" href={`mailto:${siteConfig.email}`}>
        <span aria-hidden="true" /> Available
      </a>
    </header>
  );
}

function Hero({ introReady }: { introReady: boolean }) {
  const reduceMotion = useReducedMotion();
  const motionState = introReady || reduceMotion ? "visible" : "hidden";

  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="section-coordinates">
        <span>Frontend / Automation / AI</span>
        <span>31.52° N / Remote worldwide</span>
      </div>

      <div className="hero-lockup">
        <div className="hero-copy">
          <div className="hero-identity" data-reveal>
            <p className="hero-name">{siteConfig.name}</p>
            <p>{siteConfig.role}</p>
          </div>
          <motion.h1
            id="hero-title"
            initial={reduceMotion ? false : "hidden"}
            animate={motionState}
            variants={heroHeadlineVariants}
          >
            <span className="mask-line"><motion.span variants={heroLineVariants}>I build polished</motion.span></span>
            <span className="mask-line accent-cyan"><motion.span variants={heroLineVariants}>digital products</motion.span></span>
            <span className="mask-line"><motion.span variants={heroLineVariants}>and automate the</motion.span></span>
            <span className="mask-line accent-coral"><motion.span variants={heroLineVariants}>systems behind them.</motion.span></span>
          </motion.h1>
        </div>
        <HeroSystem introReady={introReady} />
      </div>

      <div className="hero-support" data-reveal>
        <p>{siteConfig.introduction}</p>
        <div className="hero-meta">
          <span>Based in {siteConfig.location}</span>
          <span>Working remotely worldwide</span>
          <span>{siteConfig.availability}</span>
        </div>
      </div>

      <div className="keyword-strip" aria-label="Technical focus areas">
        <span>Currently engineering</span>
        <div className="keyword-window">
          <div>{practiceKeywords.map((keyword) => <b key={keyword}>{keyword}</b>)}</div>
        </div>
      </div>

      <HeroWorkflow />

      <a className="scroll-cue" href="#work">
        <span aria-hidden="true">↓</span>
        Scroll to explore selected work
      </a>
    </section>
  );
}

function HeroSystem({ introReady }: { introReady: boolean }) {
  const reduceMotion = useReducedMotion();
  const motionState = introReady || reduceMotion ? "visible" : "hidden";

  return (
    <motion.div
      className="hero-system"
      aria-hidden="true"
      initial={reduceMotion ? false : "hidden"}
      animate={motionState}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: technicalEase } },
      }}
    >
      <motion.div
        className="hero-system-bar"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.12, duration: 0.45 } } }}
      >
        <span>Live system / 01</span>
        <span><i /> Connected</span>
      </motion.div>
      <div className="hero-system-map">
        <motion.span
          className="hero-system-path path-a"
          initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)", opacity: 0 }}
          animate={motionState === "visible" ? { clipPath: "inset(0 0% 0 0)", opacity: 1 } : { clipPath: "inset(0 100% 0 0)", opacity: 0 }}
          transition={{ delay: 0.78, duration: 1.15, ease: technicalEase }}
        />
        <motion.span
          className="hero-system-path path-b"
          initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)", opacity: 0 }}
          animate={motionState === "visible" ? { clipPath: "inset(0 0% 0 0)", opacity: 1 } : { clipPath: "inset(0 100% 0 0)", opacity: 0 }}
          transition={{ delay: 1.02, duration: 1.15, ease: technicalEase }}
        />
        <motion.i
          className="hero-system-packet"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={motionState === "visible" ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.65, duration: 0.35 }}
        />
        <motion.div className="hero-system-node node-ui" custom={0} variants={heroSystemNodeVariants}>
          <small>01 / Interface</small><b>Product UI</b><em>Next.js · React</em>
        </motion.div>
        <motion.div className="hero-system-node node-api" custom={1} variants={heroSystemNodeVariants}>
          <small>02 / Contract</small><b>Typed API</b><em>Validated data</em>
        </motion.div>
        <motion.div className="hero-system-node node-flow" custom={2} variants={heroSystemNodeVariants}>
          <small>03 / Orchestration</small><b><TechIcon id="n8n" /> n8n flow</b><em>Rules · state · retries</em>
        </motion.div>
        <motion.div className="hero-system-node node-output" custom={3} variants={heroSystemNodeVariants}>
          <small>04 / Intelligence</small><b>AI + Data</b><em>Analysis · actions</em>
        </motion.div>
      </div>
      <motion.div
        className="hero-system-footer"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.92, duration: 0.45 } } }}
      >
        <span>Frontend engineering</span><span>Automation systems</span>
      </motion.div>
    </motion.div>
  );
}

function HeroWorkflow() {
  return (
    <div className="hero-workflow" data-reveal>
      <div className="workflow-heading">
        <span>Production logic / 01</span>
        <span className="n8n-mark"><TechIcon id="n8n" /> n8n orchestration</span>
      </div>
      <ol>
        {heroWorkflow.map((node, index) => (
          <li key={node.label} className={index === 3 ? "is-ai" : undefined}>
            <span className="node-number">{String(index + 1).padStart(2, "0")}</span>
            <div><b>{node.label}</b><small>{node.detail}</small></div>
            {index < heroWorkflow.length - 1 ? <i className="signal-packet" aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

function PracticeBridge() {
  return (
    <section className="practice-bridge" aria-labelledby="practice-title">
      <p className="eyebrow" id="practice-title">Two practices / one product system</p>
      <div className="practice-rail frontend"><span>Frontend engineering</span><i>→</i></div>
      <div className="api-core">
        <span className="api-core-kicker">System bridge / 00</span>
        <strong>API</strong>
        <span className="api-core-ports" aria-hidden="true"><i /><i /></span>
        <small><b>Shared contract</b><em>REST / events</em></small>
      </div>
      <div className="practice-rail automation"><i>←</i><span>Automation + AI</span></div>
    </section>
  );
}

function ProjectMedia({
  project,
  imageIndex = 0,
  expanded = false,
}: {
  project: Project;
  imageIndex?: number;
  expanded?: boolean;
}) {
  const image = project.gallery[imageIndex];

  if (!image?.image || !image.alt) {
    return <ProjectVisual kind={project.preview} expanded={expanded} />;
  }

  return (
    <div className={`project-visual project-image-visual ${expanded ? "is-expanded" : ""}`}>
      <div className="project-image-canvas">
        <Image
          src={image.image}
          alt={image.alt}
          fill
          sizes="(max-width: 820px) 100vw, (max-width: 1120px) 90vw, 44vw"
          quality={88}
        />
      </div>
    </div>
  );
}

function ProjectsSection({
  onAccent,
  onOpen,
}: {
  onAccent: (accent: string) => void;
  onOpen: (project: Project, trigger: HTMLElement) => void;
}) {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const visibleProjects = useMemo(
    () => projects.filter((project) => filter === "all" || project.filterTags.includes(filter)),
    [filter],
  );
  const hoveredProject = projects.find((project) => project.id === hoveredId) ?? null;
  const previewProject = hoveredProject ?? visibleProjects[0] ?? projects[0];
  const projectTotal = String(projects.length).padStart(2, "0");

  const activate = (project: Project) => {
    setHoveredId(project.id);
    onAccent(project.accent);
  };

  const deactivate = () => {
    setHoveredId(null);
    onAccent("#44cfff");
  };

  return (
    <section
      className="projects-section"
      id="work"
      aria-labelledby="work-title"
      data-has-hover={Boolean(hoveredId)}
      style={{ "--section-accent": hoveredProject?.accent ?? "#44cfff", "--section-surface": hoveredProject?.surface ?? "#0d1013" } as CSSProperties}
      onPointerLeave={deactivate}
    >
      <div className="projects-heading" data-reveal>
        <div>
          <p className="eyebrow">Selected work / 01—{projectTotal}</p>
          <h2 id="work-title">The product is only half the system.</h2>
        </div>
        <p>Large interfaces, careful APIs, and automation designed around real operational edges.</p>
      </div>

      <div className="project-filters" role="group" aria-label="Filter selected work">
        {projectFilters.map((item) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={filter === item.id}
            onClick={() => {
              setFilter(item.id);
              deactivate();
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{visibleProjects.length} projects shown.</p>

      <div className="project-index-grid" onPointerLeave={deactivate}>
        <motion.ol className="project-list" layout>
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProjects.map((project) => (
              <motion.li
                layout
                key={project.id}
                className={`project-row ${hoveredId === project.id ? "is-active" : ""}`}
                style={{ "--project-accent": project.accent, "--project-surface": project.surface } as CSSProperties}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  data-cursor="view"
                  aria-label={`Open case study for ${project.title}`}
                  onPointerEnter={() => activate(project)}
                  onPointerCancel={deactivate}
                  onFocus={() => activate(project)}
                  onBlur={deactivate}
                  onClick={(event) => onOpen(project, event.currentTarget)}
                >
                  <span className="project-number">{project.number}</span>
                  <span className="project-main">
                    <motion.span className="project-title" layoutId={`project-title-${project.id}`}>
                      {project.title}
                    </motion.span>
                    <span className="project-category">{project.category}</span>
                  </span>
                  <span className="project-role"><small>Role</small>{project.role}</span>
                  <span className="project-stack"><small>Stack</small>{project.stack.slice(0, 4).join(" · ")}</span>
                  <span className="project-year"><small>Year</small>{project.year}</span>
                  <span className="project-arrow" aria-hidden="true">↗</span>
                  <span className="project-techs" aria-hidden="true">
                    {project.technologyIds.slice(0, 5).map((technologyId) => (
                      <span key={technologyId}><TechIcon id={technologyId} /></span>
                    ))}
                  </span>
                  <span className="mobile-project-visual">
                    <ProjectMedia project={project} />
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ol>

        <aside
          className="project-preview-dock"
          aria-hidden="true"
          style={{ "--project-accent": previewProject.accent, "--project-surface": previewProject.surface } as CSSProperties}
        >
          <div className="preview-dock-toolbar">
            <span>System preview / live</span>
            <span>{previewProject.number} / {projectTotal}</span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={previewProject.id}
              className="preview-dock-stage"
              layoutId={`project-frame-${previewProject.id}`}
              initial={{ opacity: 0, clipPath: "inset(6% 0 12% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
              exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectMedia project={previewProject} />
            </motion.div>
          </AnimatePresence>
          <div className="preview-dock-caption">
            <span>Current focus</span>
            <strong>{previewProject.title}</strong>
            <small>{previewProject.category}</small>
            <div>
              {previewProject.technologyIds.slice(0, 5).map((technologyId) => (
                <span key={technologyId}><TechIcon id={technologyId} /></span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function CaseStudyOverlay({
  project,
  onClose,
  returnFocusRef,
}: {
  project: Project;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const returnFocus = returnFocusRef.current;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("portfolio:scroll-stop"));
    closeRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          "button, a[href], [tabindex]:not([tabindex='-1'])",
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.dispatchEvent(new Event("portfolio:scroll-start"));
      document.removeEventListener("keydown", handleKey);
      returnFocus?.focus();
    };
  }, [onClose, returnFocusRef]);

  return (
    <motion.div
      className="case-backdrop"
      data-lenis-prevent=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        className="case-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`case-title-${project.id}`}
        initial={{ y: "8vh", opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "6vh", opacity: 0 }}
        transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        style={{ "--project-accent": project.accent, "--project-surface": project.surface } as CSSProperties}
      >
        <header className="case-header">
          <span>Case study / {project.number}</span>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close case study">
            Close <i aria-hidden="true">×</i>
          </button>
        </header>

        <div className="case-hero">
          <div>
            <p className="eyebrow">{project.category}</p>
            <motion.h2 layoutId={`project-title-${project.id}`} id={`case-title-${project.id}`}>
              {project.title}
            </motion.h2>
            <p>{project.role} / {project.periodLabel}</p>
          </div>
          <motion.div className="case-hero-visual" layoutId={`project-frame-${project.id}`}>
            <ProjectMedia project={project} expanded />
          </motion.div>
        </div>

        <div className="case-overview case-section">
          <p className="case-label">Overview</p>
          <div>{project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>

        <div className="case-two-column case-section">
          <div>
            <p className="case-label">Business / technical problem</p>
            <p className="case-large-copy">{project.problem}</p>
          </div>
          <div>
            <p className="case-label">My responsibilities</p>
            <ul>{project.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>

        <section className="case-section case-architecture" aria-labelledby={`architecture-${project.id}`}>
          <p className="case-label" id={`architecture-${project.id}`}>Architecture / workflow</p>
          <ol>
            {project.architecture.map((step, index) => (
              <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}<i aria-hidden="true" /></li>
            ))}
          </ol>
        </section>

        <section className="case-section" aria-labelledby={`technology-${project.id}`}>
          <p className="case-label" id={`technology-${project.id}`}>Technology</p>
          <div className="case-technology-list">
            {project.technologyIds.map((id) => (
              <div key={id} style={{ "--tech-color": technologyById[id].brandColor } as CSSProperties}>
                <TechIcon id={id} /><span>{technologyById[id].name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="case-gallery case-section" aria-labelledby={`gallery-${project.id}`}>
          <p className="case-label" id={`gallery-${project.id}`}>Visual gallery / product views</p>
          <div>
            {project.gallery.map((item, index) => (
              <figure key={item.label}>
                <ProjectMedia project={project} imageIndex={index} expanded={index === 0} />
                <figcaption><span>{String(index + 1).padStart(2, "0")} / {item.label}</span>{item.note}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <div className="case-two-column case-section case-last">
          <div>
            <p className="case-label">Important functionality</p>
            <ul>{project.functionality.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <p className="case-label">Key implementation decisions</p>
            <ul>{project.decisions.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>

        <button type="button" className="case-close-large" onClick={onClose}>
          Back to selected work <span aria-hidden="true">↑</span>
        </button>
      </motion.div>
    </motion.div>
  );
}

function TechnologySection() {
  const frontend = technologies.filter((technology) => technology.group === "frontend");
  const automation = technologies.filter((technology) => technology.group === "automation");

  return (
    <section className="technology-section" id="stack" aria-labelledby="technology-title">
      <div className="technology-heading" data-reveal>
        <p className="eyebrow">Technology constellation</p>
        <h2 id="technology-title">Tools are useful when they connect into a system.</h2>
        <p>Hover or focus a technology to reveal where it fits. The strongest anchors are the tools used across both product and workflow work.</p>
      </div>

      <div className="constellation-grid">
        <TechnologyConstellation title="Frontend Engineering" technologies={frontend} kind="frontend" />
        <TechnologyConstellation title="Automation, AI and Backend" technologies={automation} kind="automation" />
      </div>
    </section>
  );
}

function TechnologyConstellation({
  title,
  technologies: items,
  kind,
}: {
  title: string;
  technologies: Technology[];
  kind: "frontend" | "automation";
}) {
  const magneticMove = (event: ReactPointerEvent<HTMLButtonElement>, technology: Technology) => {
    if (!technology.prominence) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    event.currentTarget.style.setProperty("--magnetic-x", `${x}px`);
    event.currentTarget.style.setProperty("--magnetic-y", `${y}px`);
  };

  return (
    <div className={`constellation constellation-${kind}`} data-reveal>
      <header>
        <span>{kind === "frontend" ? "A" : "B"}</span>
        <h3>{title}</h3>
        <small>{items.length} technologies <i>Swipe →</i></small>
      </header>
      <div className="constellation-field">
        <div className="constellation-lines" aria-hidden="true">
          {Array.from({ length: kind === "automation" ? 9 : 6 }, (_, index) => <span className={`line-${index + 1}`} key={index} />)}
          <i />
        </div>
        {items.map((technology) => (
          <button
            type="button"
            key={technology.id}
            className={`tech-node tech-${technology.id} prominence-${technology.prominence ?? "standard"}`}
            style={{ "--tech-color": technology.brandColor } as CSSProperties}
            aria-label={`${technology.name}, ${technology.category}`}
            onPointerMove={(event) => magneticMove(event, technology)}
            onPointerLeave={(event) => {
              event.currentTarget.style.setProperty("--magnetic-x", "0px");
              event.currentTarget.style.setProperty("--magnetic-y", "0px");
            }}
          >
            <span className="tech-icon-shell"><TechIcon id={technology.id} /></span>
            <span className="tech-copy"><b>{technology.name}</b><small>{technology.category}</small></span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <section className="skills-section" aria-labelledby="skills-title">
      <div className="skills-heading" data-reveal>
        <p className="eyebrow">Experience / working range</p>
        <h2 id="skills-title">From interaction detail to operational reliability.</h2>
      </div>
      <ol className="skill-groups">
        {skillGroups.map((group) => (
          <li key={group.title} className={`skill-group accent-${group.accent}`} data-reveal>
            <span>{group.number}</span>
            <div><h3>{group.title}</h3><p>{group.description}</p></div>
            <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ContactSection() {
  const [formOpen, setFormOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const prefersReducedMotion = useReducedMotion();
  const formPanelRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const emailJsReady = Boolean(
    siteConfig.emailjs.serviceId &&
    siteConfig.emailjs.templateId &&
    siteConfig.emailjs.publicKey,
  );

  useEffect(() => {
    if (!formOpen) return;

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        formPanelRef.current?.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [formOpen, prefersReducedMotion]);

  const magneticMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;
    event.currentTarget.style.setProperty("--magnetic-x", `${x}px`);
    event.currentTarget.style.setProperty("--magnetic-y", `${y}px`);
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formStatus === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("website") ?? "").trim()) {
      setFormStatus("success");
      setStatusMessage("Thanks — your message has been received.");
      form.reset();
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const projectType = String(data.get("project_type") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!emailJsReady) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCompany: ${company || "Not provided"}\nProject type: ${projectType}\n\n${message}`,
      );
      setFormStatus("success");
      setStatusMessage("Opening your email app so the message can still be sent.");
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      return;
    }

    setFormStatus("sending");
    setStatusMessage("Sending your project brief…");

    try {
      const sentAt = new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: siteConfig.emailjs.serviceId,
          template_id: siteConfig.emailjs.templateId,
          user_id: siteConfig.emailjs.publicKey,
          template_params: {
            name,
            email,
            user_name: name,
            user_email: email,
            from_name: name,
            reply_to: email,
            company,
            project_type: projectType,
            title: projectType,
            message,
            time: sentAt,
            sent_at: sentAt,
            to_name: siteConfig.name,
          },
        }),
      });

      if (!response.ok) throw new Error(await response.text());
      form.reset();
      setFormStatus("success");
      setStatusMessage("Message sent. I’ll get back to you as soon as possible.");
    } catch {
      setFormStatus("error");
      setStatusMessage("The message could not be sent. Please use the email link below instead.");
    }
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-signal" aria-hidden="true"><span /><span /><i /></div>
      <p className="eyebrow">Have a product or process in mind?</p>
      <h2 id="contact-title">
        <span>Need a polished product</span>
        <span>or a smarter workflow?</span>
        <strong>Let’s build it.</strong>
      </h2>
      <div className="contact-actions">
        <button
          type="button"
          className="contact-primary"
          aria-expanded={formOpen}
          aria-controls="contact-form-panel"
          onClick={() => {
            if (formOpen) {
              formPanelRef.current?.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start",
              });
              return;
            }
            setFormOpen(true);
            setFormStatus("idle");
            setStatusMessage("");
          }}
          onPointerMove={magneticMove}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--magnetic-x", "0px");
            event.currentTarget.style.setProperty("--magnetic-y", "0px");
          }}
        >
          <span className="contact-primary-copy">
            <small>Project enquiry / contact form</small>
            <b>Start a conversation</b>
          </span>
          <span className="contact-primary-arrow" aria-hidden="true">{formOpen ? "↓" : "↗"}</span>
        </button>
        <div className="contact-availability">
          <span><i aria-hidden="true" /> Open to remote work</span>
          <p>Available for remote frontend, full-stack, n8n and AI automation opportunities.</p>
        </div>
        <AnimatePresence initial={false}>
          {formOpen ? (
            <motion.div
              ref={formPanelRef}
              className="contact-form-panel"
              id="contact-form-panel"
              initial={{ opacity: 0, height: 0, y: 18 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="contact-form-heading">
                <span>{emailJsReady ? "Project brief / direct to inbox" : "Project brief / email fallback"}</span>
                <h3>Tell me what you’re building.</h3>
                <p>Share the product, workflow, or operational problem you want to solve.</p>
              </div>
              <form ref={formRef} onSubmit={submitContact}>
                <div className="contact-form-grid">
                  <label>
                    <span>Name *</span>
                    <input name="name" type="text" autoComplete="name" required maxLength={80} placeholder="Your name" />
                  </label>
                  <label>
                    <span>Email *</span>
                    <input name="email" type="email" autoComplete="email" required maxLength={120} placeholder="you@company.com" />
                  </label>
                  <label>
                    <span>Company</span>
                    <input name="company" type="text" autoComplete="organization" maxLength={100} placeholder="Company or team" />
                  </label>
                  <label>
                    <span>Opportunity *</span>
                    <select name="project_type" required defaultValue="">
                      <option value="" disabled>Select an opportunity</option>
                      <option>Frontend product</option>
                      <option>Full-stack product</option>
                      <option>n8n automation</option>
                      <option>AI workflow</option>
                      <option>Remote role</option>
                      <option>Something else</option>
                    </select>
                  </label>
                  <label className="contact-message-field">
                    <span>Project brief *</span>
                    <textarea name="message" required minLength={20} maxLength={2500} placeholder="A little context, what needs to be built, and where you need help…" />
                  </label>
                  <label className="contact-honeypot" aria-hidden="true">
                    Website<input name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
                <div className="contact-form-footer">
                  <p role="status" aria-live="polite" data-status={formStatus}>
                    {statusMessage || (emailJsReady ? "Your message will be sent securely through EmailJS." : "EmailJS setup pending — email fallback is active.")}
                  </p>
                  <button type="submit" disabled={formStatus === "sending"}>
                    {formStatus === "sending" ? "Sending…" : "Send project brief"}<span aria-hidden="true">↗</span>
                  </button>
                </div>
              </form>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div className="contact-links">
        <a href={`mailto:${siteConfig.email}`}>Email <span>{siteConfig.email}</span></a>
        <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">LinkedIn <span>Connect ↗</span></a>
        <a href={siteConfig.links.github} target="_blank" rel="noreferrer">GitHub <span>View code ↗</span></a>
        <a href={siteConfig.links.resume} download>Résumé <span>Download ↓</span></a>
      </div>
      <footer>
        <span>© 2026 Raheeb ur Rehman</span>
        <span>Lahore, Pakistan / Remote worldwide</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  );
}
