"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { personal, heroRotatingPhrases } from "@/data/portfolio";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/useAnimations";

// ─── ML Pipeline Visualization ───────────────────────────
function PipelineVisualization() {
  const [activeNode, setActiveNode] = useState(0);
  const [values, setValues] = useState({
    samples: 24812,
    dimensions: 128,
    probability: 0.94,
  });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const nodeInterval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 6);
    }, 2200);

    const valueInterval = setInterval(() => {
      setValues({
        samples: 24000 + Math.floor(Math.random() * 1500),
        dimensions: 128,
        probability: +(0.88 + Math.random() * 0.1).toFixed(2),
      });
    }, 3000);

    return () => {
      clearInterval(nodeInterval);
      clearInterval(valueInterval);
    };
  }, [reducedMotion]);

  const nodes = [
    { label: "INPUT", meta: `${values.samples.toLocaleString()} samples` },
    { label: "FEATURES", meta: `${values.dimensions} dimensions` },
    { label: "MODEL", meta: "GRU / Transformer" },
    { label: "INFERENCE", meta: "sequence analysis" },
    { label: "SCORE", meta: `confidence ${values.probability}` },
    { label: "DECISION", meta: values.probability > 0.9 ? "⚠ anomaly" : "✓ normal" },
  ];

  return (
    <div className="pipeline" aria-hidden="true">
      <div className="pipeline__header font-mono">
        <span className="pipeline__status-dot" />
        SYSTEM — ACTIVE
      </div>
      <div className="pipeline__nodes">
        {nodes.map((node, i) => (
          <div key={node.label}>
            <motion.div
              className={`pipeline__node ${i === activeNode ? "pipeline__node--active" : ""}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <span className="pipeline__node-label">{node.label}</span>
              <span className="pipeline__node-meta">{node.meta}</span>
              <div
                className="pipeline__node-bar"
                style={{
                  width: i === activeNode ? "100%" : "0%",
                  transition: "width 2s linear",
                }}
              />
            </motion.div>
            {i < nodes.length - 1 && (
              <div className={`pipeline__connector ${i < activeNode ? "pipeline__connector--active" : ""}`}>
                <svg width="12" height="16" viewBox="0 0 12 16">
                  <path
                    d="M6 0 L6 12 M2 8 L6 12 L10 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .pipeline {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 1.25rem;
          max-width: 280px;
          width: 100%;
        }

        .pipeline__header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.625rem;
          color: var(--text-tertiary);
          letter-spacing: 0.08em;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-primary);
        }

        .pipeline__status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          animation: pulse-dot 2s ease infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .pipeline__nodes {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .pipeline__node {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          padding: 0.5rem 0.625rem;
          border-radius: 6px;
          overflow: hidden;
          transition: background var(--duration-normal) var(--ease-out);
        }

        .pipeline__node--active {
          background: var(--accent-subtle);
        }

        .pipeline__node-label {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.06em;
        }

        .pipeline__node--active .pipeline__node-label {
          color: var(--accent);
        }

        .pipeline__node-meta {
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          color: var(--text-tertiary);
        }

        .pipeline__node-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1px;
          background: var(--accent);
          opacity: 0.5;
        }

        .pipeline__connector {
          display: flex;
          justify-content: center;
          padding: 0.125rem 0;
          color: var(--text-muted);
          transition: color var(--duration-normal);
        }

        .pipeline__connector--active {
          color: var(--accent);
        }
      `}</style>
    </div>
  );
}

// ─── Main Hero ───────────────────────────────────────────
export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % heroRotatingPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const scrollToWork = useCallback(() => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToContact = useCallback(() => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="hero" id="hero" aria-label="Introduction">
      <div className="hero__inner container">
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero__label section-label--accent font-mono" variants={itemVariants}>
            AI / MACHINE LEARNING / SOFTWARE
          </motion.div>

          <motion.h1 className="hero__headline headline-lg" variants={itemVariants}>
            I design, train, and ship{" "}
            <span className="hero__rotating-wrapper">
              <span className="hero__rotating-text" key={phraseIndex}>
                {heroRotatingPhrases[phraseIndex]}
              </span>
            </span>{" "}
            systems.
          </motion.h1>

          <motion.p className="hero__description body-lg" variants={itemVariants}>
            {personal.shortBio}
          </motion.p>

          <motion.div className="hero__actions" variants={itemVariants}>
            <button className="btn btn--primary" onClick={scrollToWork}>
              View My Work
              <ArrowRight size={16} />
            </button>
            <button className="btn btn--secondary" onClick={scrollToContact}>
              Let&apos;s Connect
              <ArrowUpRight size={16} />
            </button>
          </motion.div>

          <motion.button
            className="hero__scroll-hint font-mono"
            variants={itemVariants}
            onClick={scrollToWork}
            aria-label="Scroll to projects"
          >
            <ChevronDown size={14} />
            Explore projects
          </motion.button>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <PipelineVisualization />
        </motion.div>
      </div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 6rem;
          padding-bottom: 4rem;
        }

        .hero__inner {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 4rem;
          align-items: center;
        }

        .hero__label {
          font-size: 0.6875rem;
          letter-spacing: 0.1em;
          color: var(--accent);
          margin-bottom: 1.25rem;
        }

        .hero__headline {
          margin: 0 0 1.5rem 0;
          max-width: 680px;
        }

        .hero__rotating-wrapper {
          display: inline-block;
          position: relative;
          color: var(--accent);
        }

        .hero__rotating-text {
          display: inline-block;
          animation: fadeRotate 0.4s ease;
        }

        @keyframes fadeRotate {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero__description {
          max-width: 540px;
          margin: 0 0 2rem 0;
        }

        .hero__actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .hero__scroll-hint {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: var(--text-tertiary);
          font-size: 0.6875rem;
          font-family: var(--font-mono);
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: color var(--duration-fast);
          padding: 0;
        }

        .hero__scroll-hint:hover {
          color: var(--text-secondary);
        }

        .hero__visual {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        @media (max-width: 1024px) {
          .hero__inner {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .hero__visual {
            justify-content: flex-start;
          }
        }

        @media (max-width: 768px) {
          .hero {
            min-height: auto;
            padding-top: 7rem;
            padding-bottom: 3rem;
          }

          .hero__actions {
            flex-direction: column;
            width: fit-content;
          }
        }
      `}</style>
    </section>
  );
}
