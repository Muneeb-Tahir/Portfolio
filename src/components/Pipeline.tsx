"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimations";
import { pipelineSteps } from "@/data/portfolio";
import { useState } from "react";

export default function Pipeline() {
  const { ref, isInView } = useInView();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="pipeline-section section" ref={ref} aria-label="ML Pipeline">
      <div className="container">
        <motion.div
          className="pipeline-section__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="section-label font-mono">05 / WORKFLOW</span>
          <h2 className="headline-md">From data to intelligence.</h2>
          <p className="body-lg pipeline-section__subtitle">
            The complete lifecycle of a machine learning project.
          </p>
        </motion.div>

        <div className="pipeline-steps">
          {pipelineSteps.map((step, i) => (
            <motion.div
              key={step.number}
              className={`pipeline-step ${activeStep === i ? "pipeline-step--active" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.05 * i,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="pipeline-step__main">
                <span className="pipeline-step__number font-mono">
                  {step.number}
                </span>
                <div className="pipeline-step__content">
                  <h3 className="pipeline-step__title">{step.title}</h3>
                  <p className="pipeline-step__desc body-sm">{step.description}</p>
                </div>
                <div className="pipeline-step__indicator">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {activeStep === i && (
                <motion.div
                  className="pipeline-step__details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="pipeline-step__tags">
                    {step.details.map((d) => (
                      <span key={d} className="pipeline-step__tag font-mono">
                        {d}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {i < pipelineSteps.length - 1 && (
                <div className="pipeline-step__connector">
                  <div className={`pipeline-step__line ${activeStep !== null && i < activeStep ? "pipeline-step__line--active" : ""}`} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .pipeline-section__header {
          margin-bottom: 3rem;
        }

        .pipeline-section__header h2 {
          margin: 0.5rem 0 0.5rem 0;
        }

        .pipeline-section__subtitle {
          margin: 0;
        }

        .pipeline-steps {
          max-width: 700px;
        }

        .pipeline-step {
          position: relative;
        }

        .pipeline-step__main {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding: 1rem 1.25rem;
          border-radius: 8px;
          cursor: default;
          transition: background var(--duration-fast);
        }

        .pipeline-step--active .pipeline-step__main {
          background: var(--bg-card);
        }

        .pipeline-step__number {
          font-size: 0.6875rem;
          color: var(--accent);
          flex-shrink: 0;
          padding-top: 0.125rem;
        }

        .pipeline-step__content {
          flex: 1;
        }

        .pipeline-step__title {
          font-size: var(--text-lg);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 0.25rem 0;
        }

        .pipeline-step__desc {
          margin: 0;
        }

        .pipeline-step__indicator {
          color: var(--text-muted);
          transition: all var(--duration-fast);
          flex-shrink: 0;
          padding-top: 0.25rem;
        }

        .pipeline-step--active .pipeline-step__indicator {
          color: var(--accent);
          transform: rotate(180deg);
        }

        .pipeline-step__details {
          padding: 0 1.25rem 0.75rem 3.5rem;
        }

        .pipeline-step__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }

        .pipeline-step__tag {
          display: inline-flex;
          padding: 0.25rem 0.625rem;
          font-size: 0.625rem;
          color: var(--text-secondary);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-primary);
          border-radius: 4px;
          letter-spacing: 0.02em;
        }

        .pipeline-step__connector {
          display: flex;
          justify-content: flex-start;
          padding-left: 2.325rem;
          height: 1rem;
        }

        .pipeline-step__line {
          width: 1px;
          height: 100%;
          background: var(--border-primary);
          transition: background var(--duration-normal);
        }

        .pipeline-step__line--active {
          background: var(--accent);
        }

        @media (max-width: 768px) {
          .pipeline-step__main {
            gap: 0.875rem;
            padding: 0.75rem;
          }

          .pipeline-step__details {
            padding-left: 2.75rem;
          }

          .pipeline-step__connector {
            padding-left: 1.7rem;
          }
        }
      `}</style>
    </section>
  );
}
