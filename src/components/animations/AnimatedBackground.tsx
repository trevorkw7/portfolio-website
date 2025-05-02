import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  mode: "dark" | "light";
}

export function AnimatedBackground({ mode }: AnimatedBackgroundProps) {
  const [circles, setCircles] = useState<
    Array<{
      id: number;
      x: string;
      y: string;
      size: number;
      opacity: number;
      speed: number;
    }>
  >([]);

  // Generate circles only on client-side to avoid hydration errors
  useEffect(() => {
    setCircles(
      Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        x: `${5 + i * 12}%`,
        y: `${15 + (i % 3) * 25}%`,
        size:
          mode === "light"
            ? 250 + Math.random() * 250
            : 200 + Math.random() * 200,
        opacity:
          mode === "light"
            ? 0.25 + Math.random() * 0.25
            : 0.1 + Math.random() * 0.2,
        speed: 15 + Math.random() * 10,
      }))
    );
  }, [mode]);

  // Define colors for bokeh circles based on mode
  const darkBokehColor = "rgb(147, 197, 253)"; // bg-blue-300 equivalent
  const lightBokehColor = "rgb(74, 222, 128)"; // bg-green-400 equivalent - more vibrant green

  // Define consistent transition for all mode changes
  const modeTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1], // Custom bezier curve for Apple-like smoothness
  };

  // Define background colors consistent with the main content
  const bgColor = mode === "dark" ? "#000000" : "#ffffff";

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={false}
        animate={{ backgroundColor: bgColor }}
        transition={modeTransition}
      />
      {circles.map((c) => (
        <motion.div
          key={c.id}
          className="absolute rounded-full"
          style={{
            width: c.size,
            height: c.size,
            left: c.x,
            top: c.y,
            marginLeft: -c.size / 2,
            marginTop: -c.size / 2,
            filter: mode === "light" ? "blur(100px)" : "blur(80px)",
            backgroundColor: mode === "dark" ? darkBokehColor : lightBokehColor,
            transition: `background-color ${modeTransition.duration}s ${modeTransition.ease.join(", ")}`,
          }}
          animate={{
            opacity: [c.opacity, c.opacity * 1.5, c.opacity],
          }}
          transition={{
            duration: c.speed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />  
      ))}
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] bg-repeat opacity-10 pointer-events-none" />
    </div>
  );
}
