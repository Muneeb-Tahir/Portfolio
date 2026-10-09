"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimations";
import { timeline, certifications } from "@/data/portfolio";
import { ArrowUpRight, GraduationCap, Briefcase, Award } from "lucide-react";

export default function Experience() {
  const { ref, isInView } = useInView();

  const typeIcons = {
    education: GraduationCap,
    experience: Briefcase,
    training: Award,
  };

  const showCertifications =
    certifications.length > 0 && certifications[0].name !== "[ADD CERTIFICATION]";

  return (
    <section className="experience section" id="experience" ref={ref} aria-label="Experience">
      <div className="container">
        <div className="experience__layout">
          {/* Timeline */}
          <div className="experience__timeline-col">
            <motion.div
              className="experience__header"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <span className="section-label font-mono">08 / EXPERIENCE</span>
              <h2 className="headline-md">Experience & Education</h2>
            </motion.div>

            <div className="timeline">
              {timeline.map((item, i) => {
                const Icon = typeIcons[item.type];
                return (
                  <motion.div
                    key={`${item.title}-${item.year}`}
                    className="timeline__item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      delay: 0.08 * i,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                  >
                    <div className="timeline__marker">
                      <div className="timeline__icon-wrapper">
                        <Icon size={14} />
                      </div>
                      {i < timeline.length - 1 && (
                        <div className="timeline__track" />
                      )}
                    </div>

                    <div className="timeline__content">
                      <span className="timeline__year font-mono">{item.year}</span>
                      <h3 className="timeline__title">{item.title}</h3>
                      <span className="timeline__org body-sm">
                        {item.organization}
                      </span>
                      <p className="timeline__desc body-sm">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Certifications */}
          {showCertifications && (
            <motion.div
              className="certs"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <span className="section-label font-mono">CERTIFICATIONS</span>
              <div className="certs__list">
                {certifications.map((cert) => (
                  <div key={cert.name} className="cert">
                    <div className="cert__info">
                      <h4 className="cert__name">{cert.name}</h4>
                      <span className="cert__issuer body-sm">{cert.issuer}</span>
                      <span className="cert__year font-mono">{cert.year}</span>
                    </div>
                    {cert.url && cert.url !== "#" && (
                      <a
                        href={cert.url}
                        className="cert__link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${cert.name} credential`}
                      >
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <style jsx>{`
        .experience__layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 4rem;
        }

        .experience__header {
          margin-bottom: 2.5rem;
        }

        .experience__header h2 {
          margin: 0.5rem 0 0 0;
        }

        .timeline {
          display: flex;
          flex-direction: column;
        }

        .timeline__item {
          display: flex;
          gap: 1.25rem;
        }

        .timeline__marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }

        .timeline__icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          color: var(--text-tertiary);
          flex-shrink: 0;
        }

        .timeline__item:hover .timeline__icon-wrapper {
          border-color: var(--accent);
          color: var(--accent);
        }

        .timeline__track {
          width: 1px;
          flex: 1;
          background: var(--border-primary);
          min-height: 2rem;
        }

        .timeline__content {
          padding-bottom: 2rem;
        }

        .timeline__year {
          font-size: 0.625rem;
          color: var(--accent);
          letter-spacing: 0.06em;
        }

        .timeline__title {
          font-size: var(--text-lg);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0.25rem 0 0.25rem 0;
        }

        .timeline__org {
          display: block;
          color: var(--text-tertiary);
          margin-bottom: 0.25rem;
        }

        .timeline__desc {
          margin: 0;
          max-width: 450px;
        }

        /* Certifications */
        .certs {
          padding-top: 3.5rem;
        }

        .certs__list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .cert {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 1rem;
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          transition: border-color var(--duration-fast);
        }

        .cert:hover {
          border-color: var(--border-accent);
        }

        .cert__info {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .cert__name {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .cert__issuer {
          color: var(--text-tertiary);
          margin: 0;
        }

        .cert__year {
          font-size: 0.625rem;
          color: var(--text-muted);
        }

        .cert__link {
          color: var(--text-muted);
          transition: color var(--duration-fast);
        }

        .cert__link:hover {
          color: var(--accent);
        }

        @media (max-width: 1024px) {
          .experience__layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .certs {
            padding-top: 0;
          }
        }
      `}</style>
    </section>
  );
}
