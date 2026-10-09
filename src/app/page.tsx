"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import FeaturedCaseStudy from "@/components/FeaturedCaseStudy";
import TechnicalFocus from "@/components/TechnicalFocus";
import Skills from "@/components/Skills";
import Pipeline from "@/components/Pipeline";
// import Research from "@/components/Research";
// import ModelComparison from "@/components/ModelComparison";
import GitHubActivity from "@/components/GitHubActivity";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Command palette loads lazily — not critical path
const CommandPalette = dynamic(() => import("@/components/CommandPalette"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main" role="main">
        <Hero />

        <div className="divider-wrapper">
          <hr className="divider container" />
        </div>

        <About />
        <Projects />
        <FeaturedCaseStudy />
        {/* <ModelComparison /> */}
        <TechnicalFocus />
        <Skills />
        <Pipeline />
        {/* <Research /> */}
        <GitHubActivity />
        <Experience />
        <Contact />
      </main>

      <Footer />
      <CommandPalette />

      <style jsx>{`
        .divider-wrapper {
          padding: 0 clamp(1.25rem, 4vw, 3rem);
        }

        .divider-wrapper .divider {
          max-width: 1200px;
        }
      `}</style>
    </>
  );
}
