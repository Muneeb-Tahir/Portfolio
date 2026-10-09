"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimations";
import { githubInfo, personal } from "@/data/portfolio";
import { ArrowUpRight, GitBranch, Star, Code2 } from "lucide-react";

export default function GitHubActivity() {
  const { ref, isInView } = useInView();

  return (
    <section className="github section" id="github" ref={ref} aria-label="Engineering activity">
      <div className="container">
        <motion.div
          className="github__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="section-label font-mono">07 / ENGINEERING</span>
          <h2 className="headline-md">Built in Public</h2>
        </motion.div>

        <div className="github__grid">
          {/* Stats */}
          <motion.div
            className="github__stats"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="github__stat">
              <GitBranch size={16} className="github__stat-icon" />
              <div className="github__stat-content">
                <span className="github__stat-value">{githubInfo.repositories}</span>
                <span className="github__stat-label body-sm">Repositories</span>
              </div>
            </div>
            <div className="github__stat">
              <Code2 size={16} className="github__stat-icon" />
              <div className="github__stat-content">
                <span className="github__stat-value">{githubInfo.projects}</span>
                <span className="github__stat-label body-sm">Projects</span>
              </div>
            </div>
            <div className="github__stat">
              <Star size={16} className="github__stat-icon" />
              <div className="github__stat-content">
                <span className="github__stat-value">{githubInfo.experiments}</span>
                <span className="github__stat-label body-sm">Experiments</span>
              </div>
            </div>
          </motion.div>

          {/* Recent repos */}
          <motion.div
            className="github__repos"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="github__repos-label font-mono">RECENT</span>
            <div className="github__repo-list">
              {githubInfo.recentRepos.map((repo) => (
                <div key={repo} className="github__repo">
                  <span className="github__repo-name">{repo}</span>
                  <ArrowUpRight size={14} className="github__repo-arrow" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            className="github__languages"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="github__repos-label font-mono">LANGUAGES</span>
            <div className="github__lang-list">
              {githubInfo.languages.map((lang) => (
                <span key={lang} className="chip">{lang}</span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="github__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <a
            href={personal.github}
            className="btn btn--secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        .github__header {
          margin-bottom: 3rem;
        }

        .github__header h2 {
          margin: 0.5rem 0 0 0;
        }

        .github__grid {
          display: grid;
          grid-template-columns: auto 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .github__stats {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
        }

        .github__stat {
          display: flex;
          align-items: center;
          gap: 0.875rem;
        }

        .github__stat-icon {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .github__stat-content {
          display: flex;
          flex-direction: column;
        }

        .github__stat-value {
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text-primary);
          font-variant-numeric: tabular-nums;
          line-height: 1.2;
        }

        .github__stat-label {
          margin: 0;
          color: var(--text-tertiary);
        }

        .github__repos {
          padding: 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
        }

        .github__repos-label {
          font-size: 0.5625rem;
          color: var(--text-tertiary);
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 1rem;
        }

        .github__repo-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .github__repo {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.75rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-secondary);
          border-radius: 6px;
          transition: all var(--duration-fast);
          cursor: default;
        }

        .github__repo:hover {
          border-color: var(--border-accent);
        }

        .github__repo-name {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-primary);
        }

        .github__repo-arrow {
          color: var(--text-muted);
        }

        .github__repo:hover .github__repo-arrow {
          color: var(--accent);
        }

        .github__languages {
          padding: 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
        }

        .github__lang-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }

        .github__cta {
          padding-top: 0.5rem;
        }

        @media (max-width: 1024px) {
          .github__grid {
            grid-template-columns: 1fr 1fr;
          }

          .github__stats {
            grid-column: 1 / -1;
            flex-direction: row;
            justify-content: space-around;
          }
        }

        @media (max-width: 768px) {
          .github__grid {
            grid-template-columns: 1fr;
          }

          .github__stats {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
