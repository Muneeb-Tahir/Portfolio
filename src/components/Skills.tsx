"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimations";
import { skillLevels } from "@/data/portfolio";
import { useState } from "react";

export default function Skills() {
  const { ref, isInView } = useInView();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section className="skills section" id="skills" ref={ref} aria-label="Skills">
      <div className="container">
        <motion.div
          className="skills__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="section-label font-mono">04 / SKILLS</span>
          <h2 className="headline-md">Tools & Technologies</h2>
        </motion.div>

        <div className="skills__levels">
          {skillLevels.map((level, li) => (
            <motion.div
              key={level.level}
              className="skills__level"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.1 * li,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            >
              <div className="skills__level-header">
                <h3 className="skills__level-title">{level.level}</h3>
                <span className="skills__level-desc body-sm">
                  {level.description}
                </span>
              </div>

              <div className="skills__categories">
                {level.categories.map((cat) => (
                  <div key={cat.label} className="skills__category">
                    <span className="skills__category-label font-mono">
                      {cat.label}
                    </span>
                    <div className="skills__items">
                      {cat.items.map((skill) => (
                        <div
                          key={skill.name}
                          className={`skills__chip ${hoveredSkill === skill.name ? "skills__chip--active" : ""}`}
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          <span className="skills__chip-name">{skill.name}</span>
                          {hoveredSkill === skill.name && skill.detail && (
                            <motion.div
                              className="skills__tooltip"
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              <span className="skills__tooltip-text">
                                {skill.detail}
                              </span>
                              {skill.relatedProjects &&
                                skill.relatedProjects.length > 0 && (
                                  <span className="skills__tooltip-projects font-mono">
                                    Used in: {skill.relatedProjects.join(", ")}
                                  </span>
                                )}
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .skills__header {
          margin-bottom: 3rem;
        }

        .skills__header h2 {
          margin: 0.5rem 0 0 0;
        }

        .skills__levels {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .skills__level {
          padding-bottom: 2.5rem;
          border-bottom: 1px solid var(--border-primary);
        }

        .skills__level:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .skills__level-header {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .skills__level-title {
          font-size: var(--text-lg);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .skills__level-desc {
          margin: 0;
        }

        .skills__categories {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .skills__category-label {
          font-size: 0.5625rem;
          color: var(--text-tertiary);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.5rem;
        }

        .skills__items {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skills__chip {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          cursor: default;
          transition: all var(--duration-fast) var(--ease-out);
        }

        .skills__chip:hover,
        .skills__chip--active {
          border-color: var(--border-accent);
          background: var(--accent-subtle);
        }

        .skills__chip-name {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-primary);
        }

        .skills__chip--active .skills__chip-name {
          color: var(--accent);
        }

        .skills__tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--bg-elevated);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          padding: 0.625rem 0.875rem;
          min-width: 180px;
          z-index: 10;
          box-shadow: var(--shadow-lg);
        }

        .skills__tooltip::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: var(--bg-elevated);
        }

        .skills__tooltip-text {
          display: block;
          font-size: var(--text-xs);
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .skills__tooltip-projects {
          display: block;
          font-size: 0.5625rem;
          color: var(--text-tertiary);
          margin-top: 0.375rem;
          letter-spacing: 0.02em;
        }

        @media (max-width: 768px) {
          .skills__level-header {
            flex-direction: column;
            gap: 0.25rem;
          }
        }
      `}</style>
    </section>
  );
}
