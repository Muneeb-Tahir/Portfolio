"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimations";
import { technicalFocus } from "@/data/portfolio";
import { useState } from "react";

export default function TechnicalFocus() {
  const { ref, isInView } = useInView();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section className="tech section" id="technical" ref={ref} aria-label="Technical focus">
      <div className="container">
        <motion.div
          className="tech__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="section-label font-mono">03 / FOCUS</span>
          <h2 className="headline-md">What I work with</h2>
        </motion.div>

        <div className="tech__grid">
          {technicalFocus.map((group, i) => (
            <motion.div
              key={group.category}
              className={`tech__group ${activeCategory === group.category ? "tech__group--active" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.05 * i,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              onMouseEnter={() => setActiveCategory(group.category)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <h3 className="tech__group-title">{group.category}</h3>
              <div className="tech__items">
                {group.items.map((item) => (
                  <span key={item} className="tech__item">
                    {item}
                  </span>
                ))}
              </div>
              <span className="tech__count font-mono">
                {group.items.length} {group.items.length === 1 ? "area" : "areas"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .tech__header {
          margin-bottom: 3rem;
        }

        .tech__header h2 {
          margin: 0.5rem 0 0 0;
        }

        .tech__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1px;
          background: var(--border-primary);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          overflow: hidden;
        }

        .tech__group {
          background: var(--bg-card);
          padding: 1.5rem;
          transition: all var(--duration-normal) var(--ease-out);
          cursor: default;
        }

        .tech__group--active {
          background: var(--bg-card-hover);
        }

        .tech__group-title {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 1rem 0;
          letter-spacing: -0.01em;
        }

        .tech__group--active .tech__group-title {
          color: var(--accent);
        }

        .tech__items {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          margin-bottom: 1rem;
        }

        .tech__item {
          font-size: var(--text-xs);
          color: var(--text-secondary);
          line-height: 1.5;
          padding-left: 0.75rem;
          position: relative;
        }

        .tech__item::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--text-muted);
          transform: translateY(-50%);
        }

        .tech__group--active .tech__item::before {
          background: var(--accent);
        }

        .tech__count {
          font-size: 0.5625rem;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }

        @media (max-width: 768px) {
          .tech__grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 480px) {
          .tech__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
