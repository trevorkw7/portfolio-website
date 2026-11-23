"use client";

import React, { useRef } from "react";

import { AnimatedBackground, MouseTrail } from "@/components/animations";
import {
  About,
  Education,
  Experience,
  Projects,
  Research,
  Skills,
} from "@/components/sections";
import { LivingFavicon, PageExit, SiteNav } from "@/components/ui";
import { useTheme } from "@/hooks/useTheme";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const aboutRef = useRef<HTMLElement>(null);

  // Colours come from CSS keyed on <html data-theme>, which is set before the
  // first paint; the hero entrance is CSS too, so nothing here waits for
  // JavaScript before it can be seen.
  const ink = "text-gray-900 dark:text-white";

  return (
    <div className={`font-sans ${ink}`}>
      <LivingFavicon />
      <PageExit />
      <SiteNav />
      <section id="top" className="relative h-screen w-full overflow-hidden">
        <AnimatedBackground />
        <MouseTrail mode={theme} />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="hero-in text-5xl md:text-6xl font-serif lowercase tracking-widest drop-shadow-lg">
            trevor kwan
          </h1>
          <p className="fade-in mt-4 text-lg drop-shadow-sm" style={{ animationDelay: "0.2s" }}>
            software engineer · robotics researcher · photographer
          </p>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="fade-in mt-2 text-sm cursor-pointer"
            style={{ animationDelay: "0.4s" }}
            aria-label="Switch between dark and light theme"
          >
            {/* Both labels are in the HTML; CSS shows the one for the active
                theme, so the label is right before React hydrates. */}
            <span className="animate-pulse inline-block">
              <span className="hidden dark:inline">[dark]</span>
              <span className="dark:hidden">[light]</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              window.clearMouseTrail?.();
              aboutRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="pop-in enter-btn mt-10 px-8 py-2 bg-transparent border rounded-full border-black dark:border-white"
            style={{ animationDelay: "0.3s" }}
          >
            enter
          </button>
          <a
            href="/research/llm-robot-interface/"
            className="fade-in mt-8 max-w-xs text-sm underline underline-offset-4 decoration-1 opacity-80 hover:opacity-100"
            style={{ animationDelay: "0.6s" }}
          >
            new: a field study on how LLMs should control a robot arm
          </a>
        </div>
      </section>
      <main ref={aboutRef}>
        <div id="about" className="scroll-mt-12">
          <About />
        </div>
        <Education />
        <div id="experience" className="scroll-mt-12">
          <Experience />
        </div>
        <Projects />
        <div id="research" className="scroll-mt-12">
          <Research />
        </div>
        <Skills />
      </main>
    </div>
  );
}
