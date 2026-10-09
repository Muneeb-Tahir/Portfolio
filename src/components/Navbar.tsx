"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { personal } from "@/data/portfolio";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (href: string) => {
      setMobileOpen(false);
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        className="navbar"
        data-scrolled={scrolled}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar__inner container--wide">
          <a
            href="#"
            className="navbar__brand"
            aria-label={`${personal.name} — Home`}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="navbar__monogram">{personal.initials}</span>
            <span className="navbar__name">{personal.name}</span>
          </a>

          <div className="navbar__links" role="menubar">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar__link"
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="navbar__actions">
            <button
              className="navbar__theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </motion.div>
              </AnimatePresence>
            </button>

            <a
              href="#contact"
              className="navbar__cta"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
            >
              Let&apos;s Talk
              <ArrowUpRight size={14} />
            </a>

            <button
              className="navbar__hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="mobile-menu__content"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="mobile-menu__link"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  <span className="mobile-menu__number font-mono">
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                className="mobile-menu__footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <a
                  href="#contact"
                  className="btn btn--primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#contact");
                  }}
                >
                  Let&apos;s Talk
                  <ArrowUpRight size={14} />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1rem 0;
          transition: all var(--duration-normal) var(--ease-out);
        }

        .navbar[data-scrolled="true"] {
          padding: 0.625rem 0;
          background: color-mix(in srgb, var(--bg-primary) 80%, transparent);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border-bottom: 1px solid var(--border-primary);
        }

        .navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 4vw, 3rem);
        }

        .navbar__brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .navbar__monogram {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--accent);
          letter-spacing: 0.02em;
        }

        .navbar__name {
          font-weight: 600;
          font-size: var(--text-sm);
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .navbar__links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .navbar__link {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          transition: color var(--duration-fast) var(--ease-out);
          text-decoration: none;
        }

        .navbar__link:hover {
          color: var(--text-primary);
        }

        .navbar__actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .navbar__theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid var(--border-primary);
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-out);
        }

        .navbar__theme-toggle:hover {
          color: var(--text-primary);
          border-color: var(--text-tertiary);
          background: var(--bg-card);
        }

        .navbar__cta {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 1rem;
          font-size: var(--text-xs);
          font-weight: 500;
          color: #0a0a0b;
          background: var(--accent);
          border-radius: 6px;
          text-decoration: none;
          transition: all var(--duration-fast) var(--ease-out);
        }

        .navbar__cta:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }

        .navbar__hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: none;
          background: transparent;
          color: var(--text-primary);
          cursor: pointer;
        }

        /* Mobile menu */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 99;
          background: color-mix(in srgb, var(--bg-primary) 95%, transparent);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          padding-top: 5rem;
        }

        .mobile-menu__content {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 2rem clamp(1.25rem, 4vw, 3rem);
        }

        .mobile-menu__link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 0;
          font-size: var(--text-2xl);
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
          border-bottom: 1px solid var(--border-primary);
          transition: color var(--duration-fast);
        }

        .mobile-menu__link:hover {
          color: var(--accent);
        }

        .mobile-menu__number {
          font-size: var(--text-xs);
          color: var(--text-tertiary);
        }

        .mobile-menu__footer {
          padding-top: 2rem;
        }

        @media (max-width: 768px) {
          .navbar__links {
            display: none;
          }

          .navbar__cta {
            display: none;
          }

          .navbar__hamburger {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
