"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimations";
import { personal, principles } from "@/data/portfolio";

export default function About() {
  const { ref, isInView } = useInView();

  const journey = [
    { label: "Learning", year: "foundations" },
    { label: "Experimenting", year: "exploration" },
    { label: "Research", year: "depth" },
    { label: "Building", year: "application" },
    { label: "Deploying", year: "impact" },
  ];

  return (
    <section className="about section" id="about" ref={ref} aria-label="About me">
      <div className="container">
        {/* Section header */}
        <motion.div
          className="about__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="section-label font-mono">01 / ABOUT</span>
          <h2 className="headline-md">More than models.</h2>
        </motion.div>

        {/* Two column layout */}
        <div className="about__grid">
          <motion.div
            className="about__text"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            {personal.longBio.map((paragraph, i) => (
              <p key={i} className="body-lg">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Journey visualization */}
          <motion.div
            className="about__journey"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="journey">
              <div className="journey__header font-mono">TRAJECTORY</div>
              {journey.map((step, i) => (
                <div key={step.label} className="journey__step">
                  <div className="journey__line">
                    <div
                      className={`journey__dot ${i === journey.length - 1 ? "journey__dot--active" : ""}`}
                    />
                    {i < journey.length - 1 && <div className="journey__track" />}
                  </div>
                  <div className="journey__content">
                    <span className="journey__label">{step.label}</span>
                    <span className="journey__meta font-mono">{step.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Engineering Philosophy */}
        <motion.div
          className="philosophy"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <h3 className="headline-sm philosophy__title">How I think about ML</h3>
          <div className="philosophy__grid">
            {principles.map((p) => (
              <div key={p.number} className="philosophy__item">
                <span className="philosophy__number font-mono">{p.number}</span>
                <h4 className="philosophy__heading">{p.title}</h4>
                <p className="philosophy__desc body-sm">{p.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .about__header {
          margin-bottom: 3rem;
        }

        .about__header h2 {
          margin: 0.5rem 0 0 0;
        }

        .about__grid {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 4rem;
          margin-bottom: 5rem;
        }

        .about__text {
          max-width: 600px;
        }

        .about__text p {
          margin: 0 0 1.25rem 0;
        }

        .about__text p:last-child {
          margin-bottom: 0;
        }

        /* Journey */
        .journey {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          padding: 1.25rem;
          height: fit-content;
        }

        .journey__header {
          font-size: 0.625rem;
          color: var(--text-tertiary);
          letter-spacing: 0.08em;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-primary);
        }

        .journey__step {
          display: flex;
          gap: 0.875rem;
          min-height: 3rem;
        }

        .journey__line {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 12px;
          flex-shrink: 0;
        }

        .journey__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1.5px solid var(--text-muted);
          background: var(--bg-primary);
          flex-shrink: 0;
          margin-top: 0.375rem;
        }

        .journey__dot--active {
          border-color: var(--accent);
          background: var(--accent);
        }

        .journey__track {
          width: 1px;
          flex: 1;
          background: var(--border-primary);
          margin: 0.25rem 0;
        }

        .journey__content {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          padding-bottom: 0.75rem;
        }

        .journey__label {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-primary);
        }

        .journey__meta {
          font-size: 0.625rem;
          color: var(--text-tertiary);
        }

        /* Philosophy */
        .philosophy {
          padding-top: 3rem;
          border-top: 1px solid var(--border-primary);
        }

        .philosophy__title {
          margin: 0 0 2rem 0;
        }

        .philosophy__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .philosophy__item {
          padding: 1.25rem;
          border-left: 2px solid var(--border-primary);
          transition: border-color var(--duration-normal);
        }

        .philosophy__item:hover {
          border-left-color: var(--accent);
        }

        .philosophy__number {
          font-size: 0.6875rem;
          color: var(--accent);
          display: block;
          margin-bottom: 0.5rem;
        }

        .philosophy__heading {
          font-size: var(--text-base);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 0.375rem 0;
          line-height: 1.3;
        }

        .philosophy__desc {
          margin: 0;
        }

        @media (max-width: 1024px) {
          .philosophy__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .about__grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .philosophy__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
