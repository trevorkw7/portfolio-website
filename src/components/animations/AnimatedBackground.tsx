import React, { useState, useEffect, useMemo, memo } from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  mode: "dark" | "light";
}

// Optimize circle generation to be more deterministic and less random
const generateCircles = () => {
  return Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    x: `${5 + i * 12}%`,
    y: `${15 + (i % 3) * 25}%`,
    size: 225 + (i * 25) % 200, // More deterministic size based on index
    opacity: 0.15 + (i * 0.03) % 0.2, // More deterministic opacity
    speed: 15 + (i * 1.5) % 10, // More deterministic speed
  }));
};

// Define proper types for the Circle component props
interface CircleProps {
  circle: {
    id: number;
    x: string;
    y: string;
    size: number;
    opacity: number;
    speed: number;
  };
  mode: "dark" | "light";
  darkColor: string;
  lightColor: string;
  transitionDuration: number;
  transitionEase: number[];
}

// Memoized circle component to prevent re-renders
const Circle = memo(({ circle, mode, darkColor, lightColor, transitionDuration, transitionEase }: CircleProps) => {
  const c = circle;
  const bgColor = mode === "dark" ? darkColor : lightColor;
  const blurAmount = mode === "light" ? "80px" : "60px"; // Reduced blur for better performance
  const opacity = mode === "light" ? c.opacity * 1.3 : c.opacity; // Slightly reduced multiplier
  
  return (
    <motion.div
      key={c.id}
      className="absolute rounded-full will-change-transform"
      style={{
        width: c.size,
        height: c.size,
        left: c.x,
        top: c.y,
        marginLeft: -c.size / 2,
        marginTop: -c.size / 2,
        filter: `blur(${blurAmount})`,
        backgroundColor: bgColor,
        opacity: opacity,
        transition: `background-color ${transitionDuration}s ${transitionEase.join(", ")}, filter ${transitionDuration}s ${transitionEase.join(", ")}`,
      }}
      animate={{
        scale: [1, 1.03, 1], // Reduced scale animation range
      }}
      transition={{
        duration: c.speed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
});

// Add display name to the component
Circle.displayName = 'Circle';

// Main component with performance optimizations
export function AnimatedBackground({ mode }: AnimatedBackgroundProps) {
  // Define proper type for circles
  type CircleType = {
    id: number;
    x: string;
    y: string;
    size: number;
    opacity: number;
    speed: number;
  };
  
  // Use lazy initialization for circles state
  const [circles, setCircles] = useState<CircleType[]>([]);

  // Generate circles only once on client-side
  useEffect(() => {
    if (circles.length === 0 && typeof window !== 'undefined') {
      // Use requestIdleCallback or setTimeout to defer non-critical work
      const timer = setTimeout(() => {
        setCircles(generateCircles());
      }, 100); // Small delay to prioritize initial render
      
      return () => clearTimeout(timer);
    }
  }, [circles.length]);

  // Memoize colors and transitions to prevent recalculations
  const colors = useMemo(() => ({
    darkBokeh: "rgb(147, 197, 253)", // bg-blue-300 equivalent
    lightBokeh: "rgb(74, 222, 128)", // bg-green-400 equivalent
    bgDark: "#000000",
    bgLight: "#ffffff"
  }), []);

  // Use faster transitions on mobile
  const modeTransition = useMemo(() => {
    // Check if we're on mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    return {
      duration: isMobile ? 0.4 : 0.8, // Faster transition on mobile
      ease: [0.16, 1, 0.3, 1], // Custom bezier curve
    };
  }, []);

  // Current background color based on mode
  const bgColor = mode === "dark" ? colors.bgDark : colors.bgLight;

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <motion.div
        className="absolute inset-0 w-full h-full will-change-background"
        initial={false}
        animate={{ backgroundColor: bgColor }}
        transition={modeTransition}
      />
      {circles.map((c) => (
        <Circle 
          key={c.id}
          circle={c}
          mode={mode}
          darkColor={colors.darkBokeh}
          lightColor={colors.lightBokeh}
          transitionDuration={modeTransition.duration}
          transitionEase={modeTransition.ease}
        />
      ))}
      {/* Conditionally render texture only when not on mobile for better performance */}
      {typeof window !== 'undefined' && window.innerWidth >= 768 && (
        <div className="absolute inset-0 bg-[url('/paper-texture.png')] bg-repeat opacity-10 pointer-events-none" />
      )}
    </div>
  );
}
