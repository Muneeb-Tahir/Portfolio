"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimations";
import { projects, type Project } from "@/data/portfolio";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "./icons";
import { useState, useCallback } from "react";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, isInView } = useInView();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      ref={ref}
      className={`project ${project.featured ? "project--featured" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      aria-label={`Project: ${project.title}`}
    >
      <div className="project__top">
        <div className="project__meta">
          <span className="project__number font-mono">{project.number}</span>
          <span
            className={`status status--${project.status.toLowerCase()}`}
          >
            {project.status}
          </span>
        </div>

        <div className="project__header">
          <h3 className="project__title">{project.title}</h3>
          <p className="project__subtitle">{project.subtitle}</p>
        </div>

        {/* Category label */}
        <span className="project__category font-mono">{project.category}</span>
      </div>

      <div className="project__body">
        <p className="project__description body-md">{project.description}</p>

        {/* Architecture Diagram for featured */}
        {project.featured && project.architecture && (
          <div className="project__architecture">
            <div className="architecture__header font-mono">ARCHITECTURE</div>
            <div className="architecture__flow">
              {project.architecture.map((step, i) => (
                <div key={step} className="architecture__step">
                  <div className="architecture__node">
                    <span className="architecture__step-number font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="architecture__step-label">{step}</span>
                  </div>
                  {i < project.architecture!.length - 1 && (
                    <div className="architecture__arrow">↓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Problem / Approach toggle */}
        <div className="project__details">
          <button
            className="project__toggle font-mono"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            {expanded ? "− Less detail" : "+ More detail"}
          </button>

          {expanded && (
            <motion.div
              className="project__expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <div className="project__detail-block">
                <span className="project__detail-label font-mono">PROBLEM</span>
                <p className="body-sm">{project.problem}</p>
              </div>
              <div className="project__detail-block">
                <span className="project__detail-label font-mono">APPROACH</span>
                <p className="body-sm">{project.approach}</p>
              </div>
              {project.learnings && project.learnings.length > 0 && (
                <div className="project__detail-block">
                  <span className="project__detail-label font-mono">LEARNINGS</span>
                  <ul className="project__learnings">
                    {project.learnings.map((l) => (
                      <li key={l} className="body-sm">{l}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="project__metrics">
            {project.metrics.map((m) => (
              <div key={m.label} className="metric">
                <span className="metric__value">{m.value}</span>
                <span className="metric__label font-mono">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Technologies */}
        <div className="project__tech">
          {project.technologies.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>

        {/* Links */}
        <div className="project__links">
          {project.github && (
            <a
              href={project.github}
              className="btn btn--ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon size={14} />
              Source Code
            </a>
          )}
          <button
            className="project__case-link"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Close" : "View Case Study"}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .project {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          overflow: hidden;
          transition: all var(--duration-normal) var(--ease-out);
        }

        .project:hover {
          border-color: var(--border-accent);
          box-shadow: var(--shadow-md);
        }

        .project--featured {
          grid-column: 1 / -1;
          border-color: var(--border-accent);
        }

        .project__top {
          padding: 1.5rem 1.5rem 0;
        }

        .project__meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .project__number {
          font-size: 0.6875rem;
          color: var(--text-muted);
        }

        .project__header {
          margin-bottom: 0.5rem;
        }

        .project__title {
          font-size: var(--text-2xl);
          font-weight: 700;
          margin: 0 0 0.375rem 0;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .project--featured .project__title {
          font-size: var(--text-3xl);
        }

        .project__subtitle {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.5;
        }

        .project__category {
          font-size: 0.625rem;
          color: var(--text-tertiary);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .project__body {
          padding: 1rem 1.5rem 1.5rem;
        }

        .project__description {
          margin: 0 0 1.25rem 0;
        }

        /* Architecture */
        .project__architecture {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          padding: 1rem 1.25rem;
          margin-bottom: 1.25rem;
        }

        .architecture__header {
          font-size: 0.5625rem;
          color: var(--text-tertiary);
          letter-spacing: 0.08em;
          margin-bottom: 0.875rem;
        }

        .architecture__flow {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .architecture__step {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .architecture__node {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.375rem 0.75rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-primary);
          border-radius: 6px;
          transition: border-color var(--duration-fast);
        }

        .architecture__node:hover {
          border-color: var(--accent);
        }

        .architecture__step-number {
          font-size: 0.5625rem;
          color: var(--accent);
        }

        .architecture__step-label {
          font-size: var(--text-xs);
          font-weight: 500;
          color: var(--text-primary);
        }

        .architecture__arrow {
          padding: 0.125rem 0 0.125rem 1rem;
          color: var(--text-muted);
          font-size: 0.75rem;
        }

        /* Details */
        .project__details {
          margin-bottom: 1.25rem;
        }

        .project__toggle {
          background: none;
          border: none;
          color: var(--text-tertiary);
          font-size: 0.6875rem;
          cursor: pointer;
          padding: 0.375rem 0;
          letter-spacing: 0.04em;
          transition: color var(--duration-fast);
        }

        .project__toggle:hover {
          color: var(--accent);
        }

        .project__expanded {
          padding-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .project__detail-block {
          padding-left: 0.875rem;
          border-left: 2px solid var(--border-primary);
        }

        .project__detail-label {
          font-size: 0.5625rem;
          color: var(--accent);
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 0.25rem;
        }

        .project__detail-block p {
          margin: 0;
        }

        .project__learnings {
          margin: 0;
          padding-left: 1rem;
          list-style: none;
        }

        .project__learnings li {
          position: relative;
          padding-left: 0.75rem;
          margin-bottom: 0.375rem;
        }

        .project__learnings li::before {
          content: "→";
          position: absolute;
          left: 0;
          color: var(--text-muted);
          font-size: 0.75rem;
        }

        /* Metrics */
        .project__metrics {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.25rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 1px solid var(--border-primary);
        }

        .metric {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .metric__value {
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text-primary);
          font-variant-numeric: tabular-nums;
        }

        .metric__label {
          font-size: 0.5625rem;
          color: var(--text-tertiary);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Tech chips */
        .project__tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
          margin-bottom: 1.25rem;
        }

        /* Links */
        .project__links {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-primary);
        }

        .project__case-link {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: var(--text-sm);
          font-weight: 500;
          cursor: pointer;
          transition: color var(--duration-fast);
          padding: 0;
        }

        .project__case-link:hover {
          color: var(--accent);
        }

        @media (max-width: 768px) {
          .project--featured .project__title {
            font-size: var(--text-2xl);
          }

          .project__metrics {
            flex-wrap: wrap;
          }

          .project__architecture {
            overflow-x: auto;
          }
        }
      `}</style>
    </motion.article>
  );
}

export default function Projects() {
  const { ref, isInView } = useInView();

  return (
    <section className="projects section" id="work" ref={ref} aria-label="Selected work">
      <div className="container">
        <motion.div
          className="projects__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="section-label font-mono">02 / SELECTED WORK</span>
          <h2 className="headline-md">Selected Work</h2>
          <p className="body-lg projects__subtitle">
            Systems I&apos;ve designed, trained, experimented with, and built.
          </p>
        </motion.div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .projects__header {
          margin-bottom: 3rem;
        }

        .projects__header h2 {
          margin: 0.5rem 0 0.5rem 0;
        }

        .projects__subtitle {
          margin: 0;
          max-width: 500px;
        }

        .projects__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .projects__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
