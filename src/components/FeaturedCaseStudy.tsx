"use client";

import { motion } from "framer-motion";
import { useInView, useReducedMotion } from "@/hooks/useAnimations";
import { useState, useEffect } from "react";

// ─── Anomaly Timeline Chart ─────────────────────────────
function AnomalyTimeline() {
  const [data, setData] = useState<number[]>([]);
  const [anomalyIndex, setAnomalyIndex] = useState(-1);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Generate base signal
    const base = Array.from({ length: 40 }, (_, i) => {
      return 0.3 + 0.15 * Math.sin(i * 0.3) + Math.random() * 0.08;
    });
    // Inject anomaly
    const aIdx = 28 + Math.floor(Math.random() * 5);
    base[aIdx] = 0.82 + Math.random() * 0.12;
    base[aIdx + 1] = 0.7 + Math.random() * 0.1;
    setData(base);
    setAnomalyIndex(aIdx);

    if (reducedMotion) return;

    // Slowly update some values
    const interval = setInterval(() => {
      setData((prev) => {
        const next = [...prev];
        for (let i = 0; i < 3; i++) {
          const idx = Math.floor(Math.random() * 25);
          next[idx] = 0.3 + 0.15 * Math.sin(idx * 0.3) + Math.random() * 0.08;
        }
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  if (data.length === 0) return null;

  const width = 400;
  const height = 120;
  const padding = 8;
  const stepX = (width - padding * 2) / (data.length - 1);

  const points = data.map((v, i) => ({
    x: padding + i * stepX,
    y: padding + (1 - v) * (height - padding * 2),
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  // Threshold line
  const thresholdY = padding + (1 - 0.7) * (height - padding * 2);

  return (
    <div className="anomaly-chart" aria-hidden="true">
      <div className="anomaly-chart__header font-mono">
        <span className="anomaly-chart__status-dot" />
        ANOMALY TIMELINE — SIMULATED
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="anomaly-chart__svg"
        preserveAspectRatio="none"
      >
        {/* Threshold line */}
        <line
          x1={padding}
          y1={thresholdY}
          x2={width - padding}
          y2={thresholdY}
          stroke="var(--text-muted)"
          strokeWidth="0.5"
          strokeDasharray="4 3"
        />
        <text
          x={width - padding}
          y={thresholdY - 4}
          fill="var(--text-muted)"
          fontSize="6"
          textAnchor="end"
          fontFamily="var(--font-mono)"
        >
          THRESHOLD
        </text>

        {/* Signal line */}
        <path
          d={pathD}
          fill="none"
          stroke="var(--text-tertiary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Anomaly points */}
        {data.map((v, i) =>
          v > 0.7 ? (
            <g key={i}>
              <circle
                cx={points[i].x}
                cy={points[i].y}
                r="3.5"
                fill="var(--accent)"
                opacity="0.3"
              >
                <animate
                  attributeName="r"
                  values="3.5;6;3.5"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx={points[i].x}
                cy={points[i].y}
                r="2"
                fill="var(--accent)"
              />
            </g>
          ) : null
        )}
      </svg>

      <div className="anomaly-chart__legend">
        <span className="anomaly-chart__legend-item">
          <span className="anomaly-chart__legend-dot anomaly-chart__legend-dot--normal" />
          Normal
        </span>
        <span className="anomaly-chart__legend-item">
          <span className="anomaly-chart__legend-dot anomaly-chart__legend-dot--anomaly" />
          Anomaly detected
        </span>
      </div>

      <style jsx>{`
        .anomaly-chart {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 10px;
          padding: 1rem;
          overflow: hidden;
        }

        .anomaly-chart__header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.5625rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          margin-bottom: 0.75rem;
        }

        .anomaly-chart__status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent);
        }

        .anomaly-chart__svg {
          width: 100%;
          height: 120px;
        }

        .anomaly-chart__legend {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
          font-size: 0.625rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .anomaly-chart__legend-item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .anomaly-chart__legend-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .anomaly-chart__legend-dot--normal {
          background: var(--text-tertiary);
        }

        .anomaly-chart__legend-dot--anomaly {
          background: var(--accent);
        }
      `}</style>
    </div>
  );
}

// ─── System Status Monitor ──────────────────────────────
function SystemStatus() {
  const [metrics, setMetrics] = useState({
    cpu: 43,
    memory: 68,
    latency: 124,
    score: 0.82,
  });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setMetrics({
        cpu: 35 + Math.floor(Math.random() * 25),
        memory: 60 + Math.floor(Math.random() * 15),
        latency: 100 + Math.floor(Math.random() * 60),
        score: +(0.7 + Math.random() * 0.25).toFixed(2),
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const statusLevel =
    metrics.score > 0.85
      ? { label: "INVESTIGATE", color: "#f59e0b" }
      : metrics.score > 0.7
        ? { label: "MONITOR", color: "#3b82f6" }
        : { label: "NORMAL", color: "#22c55e" };

  return (
    <div className="sys-status" aria-hidden="true">
      <div className="sys-status__header font-mono">SYSTEM STATUS — DEMO</div>

      <div className="sys-status__metrics">
        <div className="sys-status__metric">
          <span className="sys-status__metric-label font-mono">CPU</span>
          <div className="sys-status__bar">
            <div
              className="sys-status__bar-fill"
              style={{ width: `${metrics.cpu}%` }}
            />
          </div>
          <span className="sys-status__metric-value font-mono">{metrics.cpu}%</span>
        </div>
        <div className="sys-status__metric">
          <span className="sys-status__metric-label font-mono">MEMORY</span>
          <div className="sys-status__bar">
            <div
              className="sys-status__bar-fill"
              style={{ width: `${metrics.memory}%` }}
            />
          </div>
          <span className="sys-status__metric-value font-mono">{metrics.memory}%</span>
        </div>
        <div className="sys-status__metric">
          <span className="sys-status__metric-label font-mono">LATENCY</span>
          <div className="sys-status__bar">
            <div
              className="sys-status__bar-fill"
              style={{ width: `${Math.min(metrics.latency / 2, 100)}%` }}
            />
          </div>
          <span className="sys-status__metric-value font-mono">{metrics.latency}ms</span>
        </div>
      </div>

      <div className="sys-status__score">
        <span className="sys-status__score-label font-mono">ANOMALY SCORE</span>
        <div className="sys-status__score-bar">
          <div
            className="sys-status__score-fill"
            style={{
              width: `${metrics.score * 100}%`,
              background:
                metrics.score > 0.85
                  ? "#f59e0b"
                  : metrics.score > 0.7
                    ? "#3b82f6"
                    : "var(--accent)",
            }}
          />
        </div>
        <span className="sys-status__score-value font-mono">{metrics.score}</span>
      </div>

      <div className="sys-status__alert font-mono" style={{ color: statusLevel.color }}>
        ● {statusLevel.label}
      </div>

      <style jsx>{`
        .sys-status {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 10px;
          padding: 1rem;
        }

        .sys-status__header {
          font-size: 0.5625rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-secondary);
        }

        .sys-status__metrics {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .sys-status__metric {
          display: grid;
          grid-template-columns: 60px 1fr 40px;
          align-items: center;
          gap: 0.5rem;
        }

        .sys-status__metric-label {
          font-size: 0.5625rem;
          color: var(--text-tertiary);
          letter-spacing: 0.06em;
        }

        .sys-status__bar {
          height: 4px;
          background: var(--bg-tertiary);
          border-radius: 2px;
          overflow: hidden;
        }

        .sys-status__bar-fill {
          height: 100%;
          background: var(--text-tertiary);
          border-radius: 2px;
          transition: width 1s var(--ease-out);
        }

        .sys-status__metric-value {
          font-size: 0.625rem;
          color: var(--text-secondary);
          text-align: right;
        }

        .sys-status__score {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .sys-status__score-label {
          font-size: 0.5625rem;
          color: var(--text-tertiary);
          letter-spacing: 0.06em;
        }

        .sys-status__score-bar {
          height: 6px;
          background: var(--bg-tertiary);
          border-radius: 3px;
          overflow: hidden;
        }

        .sys-status__score-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 1s var(--ease-out), background 1s var(--ease-out);
        }

        .sys-status__score-value {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .sys-status__alert {
          font-size: 0.625rem;
          letter-spacing: 0.06em;
          text-align: center;
          padding-top: 0.5rem;
          border-top: 1px solid var(--border-secondary);
        }
      `}</style>
    </div>
  );
}

// ─── VectoGuard Case Study Section ──────────────────────
export default function FeaturedCaseStudy() {
  const { ref, isInView } = useInView();

  const contextFlow = [
    { label: "Power event detected", accent: false },
    { label: "Context analyzed", accent: false },
    { label: "Signal transformed", accent: false },
    { label: "Model evaluates behavior", accent: true },
    { label: "Anomaly confidence scored", accent: true },
    { label: "Alert only when appropriate", accent: true },
  ];

  const domains = [
    {
      title: "SERVER",
      items: ["Memory leak", "API latency", "CPU spike"],
    },
    {
      title: "MACHINE",
      items: ["Bearing vibration", "Motor instability", "Temperature changes"],
    },
    {
      title: "POWER",
      items: ["Voltage drop", "Load shedding", "Generator transition"],
    },
  ];

  return (
    <section className="case-study section" ref={ref} aria-label="VectoGuard-PK case study">
      <div className="container">
        <motion.div
          className="case-study__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="section-label--accent font-mono">
            FEATURED / CASE STUDY
          </span>
          <h2 className="headline-md">VectoGuard-PK</h2>
          <p className="body-lg">
            Real-Time Anomaly Detection for Digital and Physical Systems
          </p>
        </motion.div>

        {/* Problem Statement */}
        <motion.div
          className="case-study__problem"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="case-study__problem-text">
            <h3 className="headline-sm">The Problem</h3>
            <p className="body-md">
              False positives are expensive. A power fluctuation shouldn&apos;t
              automatically be interpreted as machine failure.
            </p>
            <p className="body-sm" style={{ color: "var(--text-tertiary)" }}>
              Traditional anomaly detection systems may interpret sudden
              environmental changes as system failures — generating expensive
              false alarms.
            </p>
          </div>

          {/* Domains grid */}
          <div className="case-study__domains">
            {domains.map((domain) => (
              <div key={domain.title} className="domain-card">
                <span className="domain-card__title font-mono">
                  {domain.title}
                </span>
                <ul className="domain-card__list">
                  {domain.items.map((item) => (
                    <li key={item} className="domain-card__item body-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Solution Flow */}
        <motion.div
          className="case-study__solution"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <h3 className="headline-sm">The Solution</h3>
          <p className="body-md">
            Context-aware detection that distinguishes environmental changes
            from real system failures.
          </p>

          <div className="context-flow">
            {contextFlow.map((step, i) => (
              <div key={step.label} className="context-flow__step">
                <div
                  className={`context-flow__node ${step.accent ? "context-flow__node--accent" : ""}`}
                >
                  <span className="context-flow__number font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="context-flow__label">{step.label}</span>
                </div>
                {i < contextFlow.length - 1 && (
                  <div className="context-flow__connector">↓</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Visualizations */}
        {/* <motion.div
          className="case-study__visuals"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="case-study__visuals-grid">
            <AnomalyTimeline />
            <SystemStatus />
          </div>
        </motion.div> */}

        {/* Code snippet */}
        {/* <motion.div
          className="case-study__code"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="code-block">
            <div className="code-block__header font-mono">
              model architecture
            </div>
            <pre>
              <code>
                <span className="keyword">model</span> = <span className="keyword">GRU</span>({"\n"}
                {"    "}<span className="comment"># Input features from wavelet transform</span>{"\n"}
                {"    "}input_size=<span className="number">features</span>,{"\n"}
                {"    "}hidden_size=<span className="number">128</span>,{"\n"}
                {"    "}num_layers=<span className="number">2</span>,{"\n"}
                {"    "}dropout=<span className="number">0.1</span>{"\n"}
                )
              </code>
            </pre>
          </div>
        </motion.div> */}
      </div>

      <style jsx>{`
        .case-study__header {
          margin-bottom: 3rem;
        }

        .case-study__header h2 {
          margin: 0.5rem 0 0.375rem 0;
        }

        .case-study__header p {
          margin: 0;
          max-width: 500px;
        }

        .case-study__problem {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          margin-bottom: 3rem;
          padding: 2rem 0;
          border-top: 1px solid var(--border-primary);
          border-bottom: 1px solid var(--border-primary);
        }

        .case-study__problem-text h3 {
          margin: 0 0 1rem 0;
        }

        .case-study__problem-text p {
          margin: 0 0 0.75rem 0;
          max-width: 450px;
        }

        .case-study__domains {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .domain-card {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          padding: 0.875rem;
        }

        .domain-card__title {
          font-size: 0.5625rem;
          color: var(--accent);
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 0.5rem;
        }

        .domain-card__list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .domain-card__item {
          padding: 0.125rem 0;
          color: var(--text-secondary);
          font-size: var(--text-xs);
        }

        .case-study__solution {
          margin-bottom: 3rem;
        }

        .case-study__solution h3 {
          margin: 0 0 0.5rem 0;
        }

        .case-study__solution > p {
          margin: 0 0 1.5rem 0;
          max-width: 500px;
        }

        .context-flow {
          display: flex;
          flex-direction: column;
          max-width: 320px;
        }

        .context-flow__step {
          display: flex;
          flex-direction: column;
        }

        .context-flow__node {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0.875rem;
          border-radius: 6px;
          border: 1px solid var(--border-primary);
          background: var(--bg-card);
          transition: all var(--duration-fast);
        }

        .context-flow__node:hover {
          border-color: var(--border-accent);
        }

        .context-flow__node--accent {
          border-color: var(--border-accent);
          background: var(--accent-subtle);
        }

        .context-flow__number {
          font-size: 0.5625rem;
          color: var(--text-muted);
        }

        .context-flow__node--accent .context-flow__number {
          color: var(--accent);
        }

        .context-flow__label {
          font-size: var(--text-xs);
          color: var(--text-secondary);
        }

        .context-flow__node--accent .context-flow__label {
          color: var(--text-primary);
        }

        .context-flow__connector {
          padding: 0.125rem 0 0.125rem 1.25rem;
          color: var(--text-muted);
          font-size: 0.75rem;
        }

        .case-study__visuals {
          margin-bottom: 2rem;
        }

        .case-study__visuals-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 1rem;
        }

        .case-study__code {
          max-width: 400px;
        }

        .code-block__header {
          font-size: 0.5625rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
        }

        .code-block pre {
          margin: 0;
          white-space: pre;
        }

        @media (max-width: 1024px) {
          .case-study__problem {
            grid-template-columns: 1fr;
          }

          .case-study__visuals-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .case-study__domains {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
