"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import {
  automationStages,
  capabilities,
  type AutomationStage,
  type Capability,
} from "@/data/capabilities";
import { TechIcon } from "./TechIcon";

const connectorPaths = [
  "M 250 205 C 330 205, 345 305, 420 305",
  "M 550 305 C 630 305, 650 175, 730 175",
  "M 860 175 C 945 175, 955 315, 1030 315",
] as const;

const revealEase = [0.22, 1, 0.36, 1] as const;

type StageState = "idle" | "active" | "complete";

function getStageState(
  stageIndex: number,
  activeStage: number,
  finalRunning: boolean,
): StageState {
  if (finalRunning || stageIndex < activeStage) return "complete";
  if (stageIndex === activeStage) return "active";
  return "idle";
}

function AutomationNode({
  capability,
  state,
  expanded,
  onToggle,
}: {
  capability: Capability;
  state: StageState;
  expanded: boolean;
  onToggle: () => void;
}) {
  const descriptionId = `automation-node-${capability.id}`;

  return (
    <li className={`automation-node is-${state} ${expanded ? "is-expanded" : ""}`}>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={descriptionId}
        onClick={onToggle}
      >
        <span className="automation-node-icon" aria-hidden="true">{capability.icon}</span>
        <span className="automation-node-copy">
          <small>{capability.number}</small>
          <b>{capability.label}</b>
        </span>
        <span className="automation-node-port" aria-hidden="true" />
      </button>
      <p id={descriptionId}>{capability.description}</p>
    </li>
  );
}

function AutomationStageGroup({
  stage,
  stageIndex,
  activeStage,
  finalRunning,
  expandedNode,
  onToggleNode,
}: {
  stage: AutomationStage;
  stageIndex: number;
  activeStage: number;
  finalRunning: boolean;
  expandedNode: string | null;
  onToggleNode: (id: string) => void;
}) {
  const state = getStageState(stageIndex, activeStage, finalRunning);
  const stageCapabilities = capabilities.filter(
    (capability) => capability.lane === stage.lane,
  );

  return (
    <li
      className={`automation-stage-group is-${state}`}
      aria-current={state === "active" ? "step" : undefined}
    >
      <header>
        <span>{stage.number}</span>
        <div>
          <small>{state}</small>
          <h3>{stage.lane}</h3>
        </div>
      </header>
      <p className="automation-stage-mobile-copy">{stage.description}</p>
      <ol>
        {stageCapabilities.map((capability) => (
          <AutomationNode
            key={capability.id}
            capability={capability}
            state={state}
            expanded={expandedNode === capability.id}
            onToggle={() => onToggleNode(capability.id)}
          />
        ))}
      </ol>
    </li>
  );
}

export function AutomationEngine() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const connectorRefs = useRef<Array<SVGPathElement | null>>([]);
  const activeStageRef = useRef(0);
  const finalRunningRef = useRef(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [finalRunning, setFinalRunning] = useState(false);
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  const currentStage = automationStages[activeStage];

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1181px) and (min-height: 720px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion || !isDesktop) {
      activeStageRef.current = automationStages.length - 1;
      setActiveStage(automationStages.length - 1);
      finalRunningRef.current = Boolean(reduceMotion);
      setFinalRunning(Boolean(reduceMotion));
      return;
    }

    let disposed = false;
    let destroy: () => void = () => undefined;

    const setup = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed || !sectionRef.current || !scrollRef.current || !workspaceRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      activeStageRef.current = 0;
      finalRunningRef.current = false;
      setActiveStage(0);
      setFinalRunning(false);

      const updateProgressState = (progress: number) => {
        const nextStage = Math.min(
          automationStages.length - 1,
          Math.floor(Math.min(progress, 0.999) * automationStages.length),
        );
        const nextFinal = progress >= 0.9;

        if (nextStage !== activeStageRef.current) {
          activeStageRef.current = nextStage;
          setActiveStage(nextStage);
        }
        if (nextFinal !== finalRunningRef.current) {
          finalRunningRef.current = nextFinal;
          setFinalRunning(nextFinal);
        }
      };

      const context = gsap.context(() => {
        const paths = connectorRefs.current.filter(
          (path): path is SVGPathElement => Boolean(path),
        );
        gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: scrollRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate: (self) => updateProgressState(self.progress),
          },
        });

        paths.forEach((path, index) => {
          timeline.to(
            path,
            { strokeDashoffset: 0, duration: 0.16 },
            0.16 + index * 0.23,
          );
        });

        timeline
          .to(workspaceRef.current, { xPercent: -1.1, yPercent: -0.7, scale: 1.006, duration: 0.18 }, 0.18)
          .to(workspaceRef.current, { xPercent: 0.9, yPercent: 0.5, scale: 1.01, duration: 0.2 }, 0.41)
          .to(workspaceRef.current, { xPercent: -0.5, yPercent: -0.4, scale: 1.004, duration: 0.2 }, 0.65)
          .to(workspaceRef.current, { xPercent: 0, yPercent: 0, scale: 1, duration: 0.16 }, 0.86);
      }, sectionRef);

      ScrollTrigger.refresh();
      destroy = () => context.revert();
    };

    void setup();
    return () => {
      disposed = true;
      destroy();
    };
  }, [isDesktop, reduceMotion]);

  const toggleNode = (id: string) => {
    setExpandedNode((current) => current === id ? null : id);
  };

  const magneticMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
    event.currentTarget.style.setProperty("--automation-cta-x", `${x}px`);
    event.currentTarget.style.setProperty("--automation-cta-y", `${y}px`);
  };

  const resetMagnetic = (event: { currentTarget: HTMLAnchorElement }) => {
    event.currentTarget.style.setProperty("--automation-cta-x", "0px");
    event.currentTarget.style.setProperty("--automation-cta-y", "0px");
  };

  return (
    <section
      ref={sectionRef}
      className={`automation-engine ${finalRunning ? "is-final-running" : ""}`}
      id="automation"
      aria-labelledby="automation-title"
    >
      <div className="automation-engine-intro">
        <p className="eyebrow">02 / Automation systems</p>
        <h2 id="automation-title">
          <span className="automation-mask-line">
            <motion.span
              initial={reduceMotion ? false : { y: "110%", x: "-2%" }}
              whileInView={{ y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.85, ease: revealEase }}
            >
              The interface is only the beginning.
            </motion.span>
          </span>
          <span className="automation-mask-line automation-secondary-line">
            <motion.span
              initial={reduceMotion ? false : { y: "110%", x: "2%" }}
              whileInView={{ y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.85, delay: 0.1, ease: revealEase }}
            >
              I build what happens next.
            </motion.span>
          </span>
        </h2>
        <p className="automation-engine-intro-copy">I design production-ready n8n and AI workflows that connect APIs, validate data, make decisions, recover from failures and route edge cases to humans.</p>
      </div>

      <div ref={scrollRef} className="automation-engine-scroll">
        <div className="automation-engine-sticky">
          <div className="automation-engine-shell">
            <header className="automation-engine-toolbar">
              <span><TechIcon id="n8n" /> Live automation engine</span>
              <span className="system-live"><i /> System live</span>
            </header>

            <div className="automation-engine-readout">
              <div className="automation-stage-readout" key={currentStage.id}>
                <span>{currentStage.number} / 04 · {currentStage.lane}</span>
                <h3>{currentStage.title}</h3>
                <p>{currentStage.description}</p>
              </div>
              <ol className="automation-progress" aria-label="Automation pipeline progress">
                {automationStages.map((stage, index) => {
                  const state = getStageState(index, activeStage, finalRunning);
                  return (
                    <li key={stage.id} className={`is-${state}`} aria-current={state === "active" ? "step" : undefined}>
                      <span>{stage.number}</span><i aria-hidden="true" />
                    </li>
                  );
                })}
              </ol>
            </div>

            <div ref={workspaceRef} className="automation-engine-workspace">
              <svg className="automation-engine-connectors" viewBox="0 0 1200 520" preserveAspectRatio="none" aria-hidden="true">
                {connectorPaths.map((path, index) => {
                  const connectorState = finalRunning
                    ? "running"
                    : index < activeStage
                      ? "complete"
                      : index === activeStage
                        ? "active"
                        : "idle";
                  return (
                    <g key={path} className={`automation-connector is-${connectorState}`}>
                      <path className="automation-connector-base" d={path} vectorEffect="non-scaling-stroke" />
                      <path
                        ref={(element) => { connectorRefs.current[index] = element; }}
                        className="automation-connector-draw"
                        d={path}
                        pathLength="1"
                        vectorEffect="non-scaling-stroke"
                      />
                      <path className="automation-connector-signal" d={path} pathLength="1" vectorEffect="non-scaling-stroke" />
                    </g>
                  );
                })}
              </svg>

              <ol className="automation-stage-grid">
                {automationStages.map((stage, index) => (
                  <AutomationStageGroup
                    key={stage.id}
                    stage={stage}
                    stageIndex={index}
                    activeStage={activeStage}
                    finalRunning={finalRunning}
                    expandedNode={expandedNode}
                    onToggleNode={toggleNode}
                  />
                ))}
              </ol>
            </div>

            <div className="automation-engine-closing" aria-hidden={!finalRunning}>
              <p>Automation that doesn’t just run—it recovers, adapts and escalates.</p>
              <a
                href="#work"
                onPointerMove={magneticMove}
                onPointerLeave={resetMagnetic}
                onBlur={resetMagnetic}
              >
                Explore automation projects <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="trademark-note">Independent n8n specialist. n8n is a trademark of its owner; no employment, partnership, or endorsement is implied.</p>
    </section>
  );
}
