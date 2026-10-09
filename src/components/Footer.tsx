"use client";

import { personal } from "@/data/portfolio";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__name">{personal.name}</span>
            <span className="footer__role body-sm">{personal.role}</span>
            <span className="footer__tagline body-sm">
              Building intelligent systems.
            </span>
          </div>

          <div className="footer__links">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="GitHub"
            >
              <GitHubIcon size={16} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={16} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="footer__social"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <span className="footer__copy font-mono">
            © 2026 {personal.name}
          </span>
          <span className="footer__credit font-mono">
            Built with curiosity + code.
          </span>
        </div>
      </div>

      <style jsx>{`
        .footer {
          padding: 3rem 0 2rem;
          border-top: 1px solid var(--border-primary);
        }

        .footer__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .footer__brand {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .footer__name {
          font-weight: 600;
          font-size: var(--text-base);
          color: var(--text-primary);
        }

        .footer__role {
          color: var(--text-secondary);
          margin: 0;
        }

        .footer__tagline {
          color: var(--text-muted);
          margin: 0;
        }

        .footer__links {
          display: flex;
          gap: 0.75rem;
        }

        .footer__social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid var(--border-primary);
          color: var(--text-tertiary);
          transition: all var(--duration-fast) var(--ease-out);
          text-decoration: none;
        }

        .footer__social:hover {
          color: var(--accent);
          border-color: var(--border-accent);
        }

        .footer__divider {
          height: 1px;
          background: var(--border-primary);
          margin-bottom: 1.5rem;
        }

        .footer__bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer__copy {
          font-size: 0.6875rem;
          color: var(--text-muted);
          letter-spacing: 0.02em;
        }

        .footer__credit {
          font-size: 0.6875rem;
          color: var(--text-muted);
          letter-spacing: 0.02em;
        }

        @media (max-width: 768px) {
          .footer__top {
            flex-direction: column;
            gap: 1.5rem;
          }

          .footer__bottom {
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
