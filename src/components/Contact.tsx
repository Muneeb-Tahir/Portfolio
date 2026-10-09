"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useAnimations";
import { personal } from "@/data/portfolio";
import {
  ArrowUpRight,
  Mail,
  Download,
  Send,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { useState, type FormEvent } from "react";

export default function Contact() {
  const { ref, isInView } = useInView();
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormState("sending");
    // Simulate send — replace with actual backend
    setTimeout(() => {
      setFormState("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormState("idle"), 4000);
    }, 1200);
  };

  return (
    <section className="contact section" id="contact" ref={ref} aria-label="Contact">
      <div className="container">
        <div className="contact__layout">
          {/* Left — CTA */}
          <motion.div
            className="contact__left"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="section-label font-mono">09 / CONTACT</span>
            <h2 className="headline-lg contact__headline">
              Have a problem
              <br />
              worth solving?
            </h2>
            <p className="body-lg contact__desc">
              I&apos;m interested in machine learning projects, research
              collaborations, internships, and opportunities where intelligent
              systems can create measurable value.
            </p>

            <div className="contact__links">
              <a
                href={`mailto:${personal.email}`}
                className="contact__link"
                aria-label="Email me"
              >
                <Mail size={18} />
                <div className="contact__link-info">
                  <span className="contact__link-label">Email</span>
                  <span className="contact__link-value font-mono">
                    {personal.email}
                  </span>
                </div>
                <ArrowUpRight size={14} className="contact__link-arrow" />
              </a>

              <a
                href={personal.github}
                className="contact__link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <GitHubIcon size={18} />
                <div className="contact__link-info">
                  <span className="contact__link-label">GitHub</span>
                  <span className="contact__link-value font-mono">
                    @{personal.github.split("/").pop()}
                  </span>
                </div>
                <ArrowUpRight size={14} className="contact__link-arrow" />
              </a>

              <a
                href={personal.linkedin}
                className="contact__link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon size={18} />
                <div className="contact__link-info">
                  <span className="contact__link-label">LinkedIn</span>
                  <span className="contact__link-value font-mono">Profile</span>
                </div>
                <ArrowUpRight size={14} className="contact__link-arrow" />
              </a>
            </div>

            <a href={personal.resume} className="btn btn--secondary contact__resume">
              <Download size={14} />
              Download Resume
            </a>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className="contact__right"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form__field">
                <label htmlFor="name" className="contact-form__label font-mono">
                  NAME
                </label>
                <input
                  id="name"
                  type="text"
                  className="contact-form__input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  autoComplete="name"
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="email" className="contact-form__label font-mono">
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  className="contact-form__input"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                  autoComplete="email"
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="message" className="contact-form__label font-mono">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  className="contact-form__input contact-form__textarea"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  rows={5}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn--primary contact-form__submit"
                disabled={formState === "sending"}
              >
                {formState === "sending" ? (
                  "Sending..."
                ) : formState === "sent" ? (
                  "Message Sent ✓"
                ) : (
                  <>
                    Send Message
                    <Send size={14} />
                  </>
                )}
              </button>

              {formState === "sent" && (
                <p className="contact-form__success body-sm font-mono">
                  Thank you! I&apos;ll get back to you soon.
                </p>
              )}

              <p className="contact-form__note body-sm">
                Note: Contact form UI only — backend not configured. Use email
                for direct contact.
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .contact__layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .contact__headline {
          margin: 0.5rem 0 1.5rem 0;
        }

        .contact__desc {
          margin: 0 0 2rem 0;
          max-width: 480px;
        }

        .contact__links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .contact__link {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0.875rem 1rem;
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: 10px;
          text-decoration: none;
          transition: all var(--duration-fast) var(--ease-out);
        }

        .contact__link:hover {
          border-color: var(--border-accent);
          background: var(--bg-card-hover);
        }

        .contact__link > :first-child {
          color: var(--text-tertiary);
          flex-shrink: 0;
        }

        .contact__link:hover > :first-child {
          color: var(--accent);
        }

        .contact__link-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .contact__link-label {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-primary);
        }

        .contact__link-value {
          font-size: 0.6875rem;
          color: var(--text-tertiary);
        }

        .contact__link-arrow {
          color: var(--text-muted);
          flex-shrink: 0;
          transition: color var(--duration-fast);
        }

        .contact__link:hover .contact__link-arrow {
          color: var(--accent);
        }

        /* Form */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding: 2rem;
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
        }

        .contact-form__field {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .contact-form__label {
          font-size: 0.5625rem;
          color: var(--text-tertiary);
          letter-spacing: 0.08em;
        }

        .contact-form__input {
          font-family: var(--font-sans);
          font-size: var(--text-sm);
          color: var(--text-primary);
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          outline: none;
          transition: border-color var(--duration-fast);
          resize: vertical;
        }

        .contact-form__input:focus {
          border-color: var(--accent);
        }

        .contact-form__input::placeholder {
          color: var(--text-muted);
        }

        .contact-form__textarea {
          min-height: 120px;
        }

        .contact-form__submit {
          width: fit-content;
        }

        .contact-form__submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .contact-form__success {
          margin: 0;
          color: var(--accent);
        }

        .contact-form__note {
          margin: 0;
          color: var(--text-muted);
          font-style: italic;
        }

        @media (max-width: 768px) {
          .contact__layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .contact-form {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
