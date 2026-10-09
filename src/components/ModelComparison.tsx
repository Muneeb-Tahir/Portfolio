// "use client";

// import { motion } from "framer-motion";
// import { useInView } from "@/hooks/useAnimations";
// import { modelComparison } from "@/data/portfolio";
// import { useState } from "react";

// export default function ModelComparison() {
//   const { ref, isInView } = useInView();
//   const [activeModel, setActiveModel] = useState<string | null>(null);
//   const activeData = modelComparison.find((m) => m.model === activeModel);

//   return (
//     <section className="comparison section" ref={ref} aria-label="Model comparison">
//       <div className="container container--narrow">
//         <motion.div
//           className="comparison__header"
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
//         >
//           <span className="section-label font-mono">VECTOGUARD-PK / EVALUATION</span>
//           <h2 className="headline-sm">Model Comparison</h2>
//           <p className="body-sm comparison__note">
//             Evaluated on anomaly detection benchmark. Hover for details.
//           </p>
//         </motion.div>

//         <motion.div
//           className="comparison__table"
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
//         >
//           <div className="comparison__row comparison__row--header">
//             <span className="comparison__cell comparison__cell--model font-mono">MODEL</span>
//             <span className="comparison__cell font-mono">F1</span>
//             <span className="comparison__cell font-mono">LATENCY</span>
//           </div>

//           {modelComparison.map((model) => (
//             <div
//               key={model.model}
//               className={`comparison__row ${activeModel === model.model ? "comparison__row--active" : ""}`}
//               onMouseEnter={() => setActiveModel(model.model)}
//               onMouseLeave={() => setActiveModel(null)}
//             >
//               <span className="comparison__cell comparison__cell--model">
//                 {model.model}
//               </span>
//               <span className="comparison__cell comparison__cell--value">
//                 {model.f1.toFixed(2)}
//                 <span
//                   className="comparison__bar"
//                   style={{ width: `${model.f1 * 100}%` }}
//                 />
//               </span>
//               <span className="comparison__cell comparison__cell--latency font-mono">
//                 {model.latency}
//               </span>
//             </div>
//           ))}
//         </motion.div>

//         {/* Tooltip */}
//         {activeData && (
//           <motion.div
//             className="comparison__tooltip"
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.15 }}
//           >
//             <p className="comparison__tooltip-desc body-sm">{activeData.description}</p>
//             <div className="comparison__tooltip-grid">
//               <div>
//                 <span className="comparison__tooltip-label font-mono">STRENGTHS</span>
//                 <span className="comparison__tooltip-value body-sm">{activeData.strengths}</span>
//               </div>
//               <div>
//                 <span className="comparison__tooltip-label font-mono">WEAKNESSES</span>
//                 <span className="comparison__tooltip-value body-sm">{activeData.weaknesses}</span>
//               </div>
//               <div>
//                 <span className="comparison__tooltip-label font-mono">BEST FOR</span>
//                 <span className="comparison__tooltip-value body-sm">{activeData.useCase}</span>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </div>

//       <style jsx>{`
//         .comparison__header {
//           margin-bottom: 2rem;
//         }

//         .comparison__header h2 {
//           margin: 0.5rem 0 0.375rem 0;
//         }

//         .comparison__note {
//           margin: 0;
//           color: var(--text-tertiary);
//         }

//         .comparison__table {
//           background: var(--bg-card);
//           border: 1px solid var(--border-primary);
//           border-radius: 10px;
//           overflow: hidden;
//         }

//         .comparison__row {
//           display: grid;
//           grid-template-columns: 1fr 1fr 100px;
//           gap: 1rem;
//           padding: 0.875rem 1.25rem;
//           border-bottom: 1px solid var(--border-secondary);
//           transition: background var(--duration-fast);
//           cursor: default;
//         }

//         .comparison__row:last-child {
//           border-bottom: none;
//         }

//         .comparison__row--header {
//           padding: 0.625rem 1.25rem;
//           background: var(--bg-secondary);
//         }

//         .comparison__row--header .comparison__cell {
//           font-size: 0.5625rem;
//           color: var(--text-tertiary);
//           letter-spacing: 0.08em;
//         }

//         .comparison__row:not(.comparison__row--header):hover,
//         .comparison__row--active {
//           background: var(--accent-subtle);
//         }

//         .comparison__cell {
//           display: flex;
//           align-items: center;
//           font-size: var(--text-sm);
//           color: var(--text-secondary);
//         }

//         .comparison__cell--model {
//           font-weight: 600;
//           color: var(--text-primary);
//         }

//         .comparison__cell--value {
//           position: relative;
//           font-weight: 600;
//           color: var(--text-primary);
//           font-variant-numeric: tabular-nums;
//         }

//         .comparison__bar {
//           position: absolute;
//           bottom: -2px;
//           left: 0;
//           height: 2px;
//           background: var(--accent);
//           border-radius: 1px;
//           opacity: 0.4;
//           transition: width 0.5s var(--ease-out);
//         }

//         .comparison__cell--latency {
//           font-size: var(--text-xs);
//           color: var(--text-tertiary);
//         }

//         .comparison__tooltip {
//           margin-top: 1rem;
//           padding: 1.25rem;
//           background: var(--bg-card);
//           border: 1px solid var(--border-accent);
//           border-radius: 10px;
//         }

//         .comparison__tooltip-desc {
//           margin: 0 0 1rem 0;
//         }

//         .comparison__tooltip-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 1rem;
//         }

//         .comparison__tooltip-label {
//           display: block;
//           font-size: 0.5625rem;
//           color: var(--accent);
//           letter-spacing: 0.08em;
//           margin-bottom: 0.25rem;
//         }

//         .comparison__tooltip-value {
//           display: block;
//           margin: 0;
//           color: var(--text-secondary);
//           line-height: 1.5;
//         }

//         @media (max-width: 768px) {
//           .comparison__tooltip-grid {
//             grid-template-columns: 1fr;
//             gap: 0.75rem;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }
