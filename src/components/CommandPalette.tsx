"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { commandPaletteItems, personal } from "@/data/portfolio";
import { useTheme } from "./ThemeProvider";
import {
  Search,
  ArrowUpRight,
  Moon,
  Sun,
  Download,
  User,
  Code2,
  BookOpen,
  Layers,
  Mail,
  Command,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./icons";

const iconMap: Record<string, React.ComponentType<{ size: number }>> = {
  projects: Code2,
  about: User,
  research: BookOpen,
  skills: Layers,
  contact: Mail,
  "github-external": GitHubIcon,
  "linkedin-external": LinkedInIcon,
  theme: Moon,
  resume: Download,
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();

  const filtered = commandPaletteItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleOpen = useCallback(() => {
    setOpen(true);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const executeAction = useCallback(
    (action: string) => {
      handleClose();

      switch (action) {
        case "projects":
          document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
          break;
        case "about":
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
          break;
        case "research":
          document.querySelector("#research")?.scrollIntoView({ behavior: "smooth" });
          break;
        case "skills":
          document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" });
          break;
        case "contact":
          document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          break;
        case "github-external":
          window.open(personal.github, "_blank");
          break;
        case "linkedin-external":
          window.open(personal.linkedin, "_blank");
          break;
        case "theme":
          toggleTheme();
          break;
        case "resume":
          window.open(personal.resume, "_blank");
          break;
      }
    },
    [handleClose, toggleTheme]
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) {
          handleClose();
        } else {
          handleOpen();
        }
      }

      if (e.key === "Escape" && open) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleOpen, handleClose]);

  // Arrow key navigation
  useEffect(() => {
    if (!open) return;

    const handleNav = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        executeAction(filtered[selectedIndex].action);
      }
    };

    window.addEventListener("keydown", handleNav);
    return () => window.removeEventListener("keydown", handleNav);
  }, [open, selectedIndex, filtered, executeAction]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <>
      {/* Keyboard shortcut hint — desktop only */}
      <button
        className="cmd-hint"
        onClick={handleOpen}
        aria-label="Open command palette (Ctrl+K)"
      >
        <Command size={12} />
        <span className="cmd-hint__key font-mono">K</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="cmd-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={handleClose}
            />

            <motion.div
              className="cmd-palette"
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              role="dialog"
              aria-label="Command palette"
            >
              <div className="cmd-palette__search">
                <Search size={16} className="cmd-palette__search-icon" />
                <input
                  ref={inputRef}
                  type="text"
                  className="cmd-palette__input"
                  placeholder="Type a command..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search commands"
                />
                <span className="cmd-palette__esc font-mono">ESC</span>
              </div>

              <div className="cmd-palette__list" role="listbox">
                {filtered.length === 0 && (
                  <div className="cmd-palette__empty body-sm">
                    No results found.
                  </div>
                )}
                {filtered.map((item, i) => {
                  const Icon = iconMap[item.action] || Code2;
                  const isExternal = item.action.includes("external");
                  return (
                    <button
                      key={item.action}
                      className={`cmd-palette__item ${i === selectedIndex ? "cmd-palette__item--selected" : ""}`}
                      onClick={() => executeAction(item.action)}
                      role="option"
                      aria-selected={i === selectedIndex}
                    >
                      <Icon size={16} />
                      <span className="cmd-palette__item-label">
                        {item.label}
                      </span>
                      {isExternal && (
                        <ArrowUpRight size={12} className="cmd-palette__external" />
                      )}
                      {item.action === "theme" && (
                        <span className="cmd-palette__theme-state font-mono">
                          {theme === "dark" ? "→ Light" : "→ Dark"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="cmd-palette__footer font-mono">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        .cmd-hint {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 90;
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 0.75rem;
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          color: var(--text-tertiary);
          cursor: pointer;
          font-size: var(--text-xs);
          transition: all var(--duration-fast) var(--ease-out);
          box-shadow: var(--shadow-sm);
        }

        .cmd-hint:hover {
          border-color: var(--text-tertiary);
          color: var(--text-secondary);
        }

        .cmd-hint__key {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.125rem 0.375rem;
          background: var(--bg-tertiary);
          border-radius: 4px;
          font-size: 0.625rem;
          letter-spacing: 0.04em;
        }

        .cmd-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
        }

        .cmd-palette {
          position: fixed;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 201;
          width: 90%;
          max-width: 520px;
          background: var(--bg-elevated);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .cmd-palette__search {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.25rem;
          border-bottom: 1px solid var(--border-primary);
        }

        .cmd-palette__search-icon {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .cmd-palette__input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-family: var(--font-sans);
          font-size: var(--text-sm);
          color: var(--text-primary);
        }

        .cmd-palette__input::placeholder {
          color: var(--text-muted);
        }

        .cmd-palette__esc {
          font-size: 0.5625rem;
          color: var(--text-muted);
          padding: 0.125rem 0.375rem;
          background: var(--bg-tertiary);
          border-radius: 3px;
          letter-spacing: 0.06em;
        }

        .cmd-palette__list {
          max-height: 320px;
          overflow-y: auto;
          padding: 0.375rem;
        }

        .cmd-palette__empty {
          padding: 1.5rem;
          text-align: center;
          color: var(--text-muted);
        }

        .cmd-palette__item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.625rem 0.875rem;
          background: none;
          border: none;
          border-radius: 8px;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: var(--text-sm);
          cursor: pointer;
          transition: all var(--duration-fast);
          text-align: left;
        }

        .cmd-palette__item:hover,
        .cmd-palette__item--selected {
          background: var(--bg-card);
          color: var(--text-primary);
        }

        .cmd-palette__item-label {
          flex: 1;
        }

        .cmd-palette__external {
          color: var(--text-muted);
        }

        .cmd-palette__theme-state {
          font-size: 0.625rem;
          color: var(--text-muted);
        }

        .cmd-palette__footer {
          display: flex;
          gap: 1rem;
          padding: 0.625rem 1.25rem;
          border-top: 1px solid var(--border-primary);
          font-size: 0.5625rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }

        @media (max-width: 768px) {
          .cmd-hint {
            display: none;
          }

          .cmd-palette {
            top: 10%;
            width: 95%;
          }
        }
      `}</style>
    </>
  );
}
