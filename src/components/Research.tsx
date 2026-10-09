// "use client";

// import { motion } from "framer-motion";
// import { useInView } from "@/hooks/useAnimations";
// import { research, type ResearchItem } from "@/data/portfolio";
// import { ArrowUpRight } from "lucide-react";

// function ResearchCard({ item, index }: { item: ResearchItem; index: number }) {
//   const { ref, isInView } = useInView();

//   const typeColors: Record<string, string> = {
//     Research: "#3b82f6",
//     Experiment: "#f59e0b",
//     Prototype: "#8b5cf6",
//     Production: "#22c55e",
//   };

//   return (
//     <motion.div
//       ref={ref}
//       className="research-card"
//       initial={{ opacity: 0, y: 20 }}
//       animate={isInView ? { opacity: 1, y: 0 } : {}}
//       transition={{
//         delay: index * 0.08,
//         duration: 0.6,
//         ease: [0.16, 1, 0.3, 1] as const,
//       }}
//     >
//       <div className="research-card__timeline">
//         <span className="research-card__year font-mono">{item.year}</span>
//         <div className="research-card__dot" style={{ borderColor: typeColors[item.type] }} />
//         <div className="research-card__track" />
//       </div>

//       <div className="research-card__content">
//         <div className="research-card__meta">
//           <span
//             className="research-card__type font-mono"
//             style={{ color: typeColors[item.type] }}
//           >
//             {item.type}
//           </span>
//         </div>

//         <h3 className="research-card__title">{item.title}</h3>
//         <p className="research-card__desc body-sm">{item.description}</p>

//         <div className="research-card__tags">
//           {item.tags.map((tag) => (
//             <span key={tag} className="chip">{tag}</span>
//           ))}
//         </div>

//         {item.paper && (
//           <div className="research-card__paper">
//             <span className="research-card__paper-label font-mono">
//               Inspired by
//             </span>
//             <div className="research-card__paper-info">
//               <span className="research-card__paper-title">
//                 {item.paper.title}
//               </span>
//               <span className="research-card__paper-year font-mono">
//                 {item.paper.year}
//               </span>
//             </div>
//             {item.extension && (
//               <div className="research-card__extension">
//                 <span className="research-card__extension-label font-mono">
//                   My extension:
//                 </span>
//                 <span className="research-card__extension-text body-sm">
//                   {item.extension}
//                 </span>
//               </div>
//             )}
//             {item.paper.url !== "#" && (
//               <a
//                 href={item.paper.url}
//                 className="research-card__paper-link"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Read Paper <ArrowUpRight size={12} />
//               </a>
//             )}
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         .research-card {
//           display: flex;
//           gap: 1.5rem;
//           position: relative;
//         }

//         .research-card__timeline {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           flex-shrink: 0;
//           width: 48px;
//         }

//         .research-card__year {
//           font-size: 0.625rem;
//           color: var(--text-tertiary);
//           letter-spacing: 0.04em;
//           margin-bottom: 0.5rem;
//         }

//         .research-card__dot {
//           width: 10px;
//           height: 10px;
//           border-radius: 50%;
//           border: 2px solid var(--text-tertiary);
//           background: var(--bg-primary);
//           flex-shrink: 0;
//         }

//         .research-card__track {
//           width: 1px;
//           flex: 1;
//           background: var(--border-primary);
//           margin-top: 0.5rem;
//         }

//         .research-card__content {
//           flex: 1;
//           padding-bottom: 2.5rem;
//         }

//         .research-card__meta {
//           margin-bottom: 0.5rem;
//         }

//         .research-card__type {
//           font-size: 0.625rem;
//           letter-spacing: 0.08em;
//           text-transform: uppercase;
//         }

//         .research-card__title {
//           font-size: var(--text-lg);
//           font-weight: 600;
//           color: var(--text-primary);
//           margin: 0 0 0.5rem 0;
//         }

//         .research-card__desc {
//           margin: 0 0 1rem 0;
//           max-width: 500px;
//         }

//         .research-card__tags {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 0.375rem;
//           margin-bottom: 1rem;
//         }

//         .research-card__paper {
//           background: var(--bg-card);
//           border: 1px solid var(--border-primary);
//           border-radius: 8px;
//           padding: 1rem;
//           margin-top: 0.5rem;
//         }

//         .research-card__paper-label {
//           font-size: 0.5625rem;
//           color: var(--text-tertiary);
//           letter-spacing: 0.08em;
//           text-transform: uppercase;
//           display: block;
//           margin-bottom: 0.375rem;
//         }

//         .research-card__paper-info {
//           display: flex;
//           align-items: baseline;
//           gap: 0.5rem;
//           margin-bottom: 0.5rem;
//         }

//         .research-card__paper-title {
//           font-size: var(--text-sm);
//           color: var(--text-primary);
//           font-weight: 500;
//         }

//         .research-card__paper-year {
//           font-size: 0.625rem;
//           color: var(--text-muted);
//         }

//         .research-card__extension {
//           margin-bottom: 0.5rem;
//         }

//         .research-card__extension-label {
//           font-size: 0.5625rem;
//           color: var(--accent);
//           letter-spacing: 0.06em;
//           text-transform: uppercase;
//         }

//         .research-card__extension-text {
//           display: block;
//           margin: 0;
//         }

//         .research-card__paper-link {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.25rem;
//           font-size: var(--text-xs);
//           color: var(--text-secondary);
//           text-decoration: none;
//           transition: color var(--duration-fast);
//         }

//         .research-card__paper-link:hover {
//           color: var(--accent);
//         }

//         @media (max-width: 768px) {
//           .research-card {
//             gap: 1rem;
//           }

//           .research-card__timeline {
//             width: 36px;
//           }
//         }
//       `}</style>
//     </motion.div>
//   );
// }

// export default function Research() {
//   const { ref, isInView } = useInView();

//   return (
//     <section className="research section" id="research" ref={ref} aria-label="Research">
//       <div className="container container--narrow">
//         <motion.div
//           className="research__header"
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
//         >
//           <span className="section-label font-mono">06 / RESEARCH</span>
//           <h2 className="headline-md">Research & Experiments</h2>
//         </motion.div>

//         <div className="research__list">
//           {research.map((item, i) => (
//             <ResearchCard key={item.title} item={item} index={i} />
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         .research__header {
//           margin-bottom: 3rem;
//         }

//         .research__header h2 {
//           margin: 0.5rem 0 0 0;
//         }

//         .research__list {
//           display: flex;
//           flex-direction: column;
//         }
//       `}</style>
//     </section>
//   );
// }
