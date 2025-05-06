"use client";

import React, { useRef, useMemo } from "react";
import { motion } from "framer-motion";

// Define the window interface extension for the clearMouseTrail method
declare global {
  interface Window {
    clearMouseTrail?: () => void;
  }
}

// Import components
import { AnimatedBackground, MouseTrail } from "@/components/animations";
import {
  About,
  Education,
  Experience,
  Projects,
  Publications,
  Skills,
} from "@/components/sections";
import { useTheme } from "@/hooks/useTheme";

export default function Home() {
  const { theme: mode, setTheme: setMode } = useTheme();
  const aboutRef = useRef<HTMLDivElement>(null);
  const isClient = typeof window !== "undefined";
  const heroHeight = isClient ? window.innerHeight : 0;

  const textClass = mode === "dark" ? "text-white" : "text-gray-900";
  const bgColor = mode === "dark" ? "#000000" : "#ffffff";

  // Define a responsive transition for mode changes - faster on mobile
  const modeTransition = useMemo(() => {
    // Check if we're on mobile
    const isMobile = isClient && window.innerWidth < 768;
    
    return {
      duration: isMobile ? 0.4 : 0.8, // Faster transition on mobile
      ease: [0.16, 1, 0.3, 1], // Custom bezier curve for Apple-like smoothness
    };
  }, [isClient]);

  return (
    <motion.div
      initial={false}
      animate={{ backgroundColor: bgColor }}
      transition={modeTransition}
      className={`font-sans ${textClass}`}
    >
      <section className="relative h-screen w-full overflow-hidden">
        <AnimatedBackground mode={mode} />
        {isClient && (
          <MouseTrail activeArea={heroHeight} mode={mode} trailDuration={500} />
        )}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-5xl md:text-6xl font-serif lowercase tracking-widest drop-shadow-lg ${textClass}`}
          >
            trevor kwan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`mt-4 text-lg drop-shadow-sm ${textClass}`}
          >
            software engineer · robotics researcher · photographer
          </motion.p>
          <motion.div
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-2 text-sm cursor-pointer animate-pulse"
          >
            [{mode}]
          </motion.div>
          <motion.button
            onClick={() => {
              // Clear the mouse trails when entering the main content
              if (typeof window !== "undefined" && window.clearMouseTrail) {
                window.clearMouseTrail();
              }
              // Scroll to the about section
              aboutRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{
              scale: 0.95,
              boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
              mass: 1,
            }}
            className={`mt-10 px-8 py-2 bg-transparent border ${
              mode === "dark"
                ? "border-white text-white"
                : "border-black text-black"
            } rounded-full`}
          >
            enter
          </motion.button>
        </div>
      </section>
      <motion.main
        ref={aboutRef}
        initial={false}
        animate={{ backgroundColor: bgColor }}
        transition={modeTransition}
      >
        <About mode={mode} />
        <Education mode={mode} />
        <Experience mode={mode} />
        <Projects mode={mode} />
        <Publications mode={mode} />
        <Skills mode={mode} />
      </motion.main>
    </motion.div>
  );
}
