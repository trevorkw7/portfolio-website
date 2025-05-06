import React, { useRef, useEffect, useState } from "react";

interface MouseTrailProps {
  activeArea?: number;
  mode: "dark" | "light";
  trailDuration?: number; // Duration in milliseconds before trail fades out
}

export function MouseTrail({ activeArea, mode }: MouseTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Ref to store the clear canvas function so it can be called from outside
  const clearCanvasRef = useRef<() => void>(() => {});

  // Keep track of whether the canvas is currently being cleared
  const isClearing = useRef<boolean>(false);

  // Track when the last mouse movement happened
  const lastMouseActivity = useRef<number>(Date.now());

  // Track if we're in auto or mouse mode
  const isMouseActive = useRef<boolean>(false);

  // Track when mouse mode started
  const mouseActiveSince = useRef<number>(0);

  // Track the current scroll position
  const currentScrollY = useRef<number>(0);

  // Track the current mode to detect changes
  const prevModeRef = useRef<"dark" | "light">(mode);

  // Track all active timers for proper cleanup
  const activeTimers = useRef<number[]>([]);

  // Store all line segments for smooth fading
  const lineSegments = useRef<
    { x1: number; y1: number; x2: number; y2: number; opacity: number }[]
  >([]);

  // Use direct refs for current and previous positions
  const prevPos = useRef<{ x?: number; y?: number }>({
    x: undefined,
    y: undefined,
  });
  const curPos = useRef<{ x?: number; y?: number }>({
    x: undefined,
    y: undefined,
  });

  // Expose clearCanvas method to parent components
  useEffect(() => {
    // Define the window interface extension
    interface WindowWithClearMouseTrail extends Window {
      clearMouseTrail?: () => void;
    }

    // Add the clear method to the window object so it can be called from outside
    const windowWithTrail = window as WindowWithClearMouseTrail;
    windowWithTrail.clearMouseTrail = () => {
      if (clearCanvasRef.current) {
        clearCanvasRef.current();
      }
    };

    return () => {
      // Clean up the global reference
      delete (window as WindowWithClearMouseTrail).clearMouseTrail;
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
    return () => {}; 
  }, []);

  // Main effect for trail rendering - only runs when component is mounted
  useEffect(() => {
    // Don't run until component is mounted on client
    if (!isMounted) return;

    // Check if mode has changed
    const modeChanged = prevModeRef.current !== mode;
    prevModeRef.current = mode;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Trail rendering constants
    const LINE_COLOR =
      mode === "dark" ? "rgba(238, 238, 238, 1)" : "rgba(51, 51, 51, 1)";
    const LINE_WIDTH = 0.8;
    const MIN_LENGTH = 45; // Minimum distance to draw a line
    const AUTO_CLEAR_TIMEOUT = 10000; // Auto-clear trails after 10 seconds

    // Fixed constants for auto mode
    const AUTO_LINE_INTERVAL = 600; // Consistent time between auto line draws
    const AUTO_LINE_OPACITY = 1.0; // Consistent opacity for auto lines

    let w = window.innerWidth,
      h = window.innerHeight;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;

      // Clear canvas on resize
      ctx.clearRect(0, 0, w, h);

      // Reset positions on resize
      prevPos.current = { x: undefined, y: undefined };
      curPos.current = { x: undefined, y: undefined };
    };

    // Initial resize
    resize();
    window.addEventListener("resize", resize);

    // Calculate distance between two points
    const calcDist = (
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): number => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    };

    // Render function that draws all stored line segments with their current opacity
    const renderLines = () => {
      // Clear canvas first
      ctx.clearRect(0, 0, w, h);

      // Draw all line segments with their current opacity
      lineSegments.current.forEach((segment) => {
        // Use consistent color values with segment opacity
        const color =
          mode === "dark"
            ? `rgba(238, 238, 238, ${segment.opacity})`
            : `rgba(51, 51, 51, ${segment.opacity})`;
        ctx.strokeStyle = color;
        ctx.lineWidth = LINE_WIDTH;
        ctx.lineCap = "butt";

        ctx.beginPath();
        ctx.moveTo(segment.x1, segment.y1);
        ctx.lineTo(segment.x2, segment.y2);
        ctx.stroke();
      });
    };

    // Clear trails with a smooth fade animation
    const clearCanvas = (fastFade = false) => {
      if (lineSegments.current.length === 0) return;

      // Start the fade animation
      let fadeStep = 0;
      // Use fewer steps and faster interval for scroll-triggered fades
      const FADE_STEPS = fastFade ? 5 : 15;
      const FADE_INTERVAL = fastFade ? 15 : 30;
      
      const fadeInterval = setInterval(() => {
        fadeStep++;

        // Reduce opacity of all line segments (faster reduction for scroll-triggered fades)
        lineSegments.current.forEach((segment) => {
          segment.opacity = Math.max(0, segment.opacity - (fastFade ? 3 : 1) / FADE_STEPS);
        });

        // Redraw all lines with updated opacity
        renderLines();

        // Remove fully transparent lines
        lineSegments.current = lineSegments.current.filter(
          (segment) => segment.opacity > 0
        );

        // End the animation when complete
        if (fadeStep >= FADE_STEPS || lineSegments.current.length === 0) {
          clearInterval(fadeInterval);
          ctx.clearRect(0, 0, w, h);
          lineSegments.current = [];

          // Reset positions
          prevPos.current = { x: undefined, y: undefined };
          curPos.current = { x: undefined, y: undefined };
        }
      }, FADE_INTERVAL);
    };

    // Store the clear function in the ref so it can be called from outside
    clearCanvasRef.current = clearCanvas;

    // Fixed interval clearing function that runs every 10 seconds
    const startPeriodicClear = () => {
      // Create an interval that clears the canvas every 10 seconds
      const periodicClearInterval = setInterval(() => {
        // Skip clearing if in mouse mode
        if (isMouseActive.current) {
          return;
        }

        // Only clear if not already in the process of clearing
        if (!isClearing.current) {
          isClearing.current = true;
          clearCanvas();

          // Reset the clearing flag after a short delay
          setTimeout(() => {
            isClearing.current = false;
          }, 100);
        }
      }, AUTO_CLEAR_TIMEOUT);

      return periodicClearInterval;
    };

    // Function to check if we're in the hero section
    const isInHeroSection = () => {
      // If activeArea is not defined, allow trails everywhere
      if (activeArea === undefined) return true;
      // Only create random trails when we're in the hero section
      return currentScrollY.current <= activeArea;
    };

    // Start the periodic clearing
    const periodicClearInterval = startPeriodicClear();

    // Draw function for creating trail segments
    const draw = () => {
      if (curPos.current.x !== undefined && curPos.current.y !== undefined) {
        if (prevPos.current.x === undefined) {
          prevPos.current = { ...curPos.current };
          return false;
        }

        const dist = calcDist(
          prevPos.current.x!,
          prevPos.current.y!,
          curPos.current.x,
          curPos.current.y
        );

        if (dist > MIN_LENGTH) {
          // Set line style
          ctx.strokeStyle = LINE_COLOR;
          ctx.lineWidth = LINE_WIDTH;
          ctx.lineCap = "butt";

          // Draw the line
          ctx.beginPath();
          ctx.moveTo(prevPos.current.x!, prevPos.current.y!);
          ctx.lineTo(curPos.current.x, curPos.current.y);
          ctx.stroke();

          // Store the line segment for fading
          // Use the consistent opacity for auto mode
          const lineOpacity = !isMouseActive.current ? AUTO_LINE_OPACITY : 1.0;

          lineSegments.current.push({
            x1: prevPos.current.x!,
            y1: prevPos.current.y!,
            x2: curPos.current.x,
            y2: curPos.current.y,
            opacity: lineOpacity,
          });

          // Update previous position
          prevPos.current = { ...curPos.current };
          return true;
        } else {
          return false;
        }
      }
      return false;
    };

    // Random line drawing function
    let randTimer: number | null = null;

    // Enhanced timer management system
    const registerTimer = (timerId: number) => {
      activeTimers.current.push(timerId);
      return timerId;
    };

    const clearTimer = (timerId: number) => {
      window.clearTimeout(timerId);
      activeTimers.current = activeTimers.current.filter(
        (id) => id !== timerId
      );
    };

    // Clear any existing timer before setting up a new one
    const clearExistingTimer = () => {
      if (randTimer) {
        clearTimer(randTimer);
        randTimer = null;
      }
    };

    // Clear all active timers
    const clearAllTimers = () => {
      activeTimers.current.forEach((id) => window.clearTimeout(id));
      activeTimers.current = [];
      randTimer = null;
    };

    // Make sure to clear any existing timers when component mounts
    clearAllTimers();

    const drawRand = () => {
      // Skip random drawing if we're currently in a clearing animation
      if (isClearing.current) {
        clearExistingTimer();
        randTimer = registerTimer(window.setTimeout(drawRand, 1000));
        return;
      }

      // Skip random drawing if mouse has been active recently (within 2 seconds)
      const now = Date.now();
      const timeSinceLastMouseMove = now - lastMouseActivity.current;

      // Skip if we're not in the hero section
      if (!isInHeroSection()) {
        clearExistingTimer();
        randTimer = registerTimer(window.setTimeout(drawRand, 1000));
        return;
      }

      if (isMouseActive.current || timeSinceLastMouseMove < 2000) {
        // Check again after a short delay
        clearExistingTimer();
        randTimer = registerTimer(window.setTimeout(drawRand, 1000));
        return;
      }

      // Center of the canvas
      const center = {
        x: Math.floor(w / 2),
        y: Math.floor(h / 2),
      };

      // Box constraints for random points
      const offset = {
        x: (w * 0.5) / 2,
        y: (h * 0.5) / 2,
      };

      // Generate random point within constraints
      const getRandomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min) + min);
      };

      const checkBounds = (value: number, max: number) => {
        if (value > max) return max;
        if (value < 0) return 0;
        return value;
      };

      // Generate random position
      let randX = getRandomInt(center.x - offset.x, center.x + offset.x);
      let randY = getRandomInt(center.y - offset.y, center.y + offset.y);

      // Ensure within bounds
      randX = checkBounds(randX, w);
      randY = checkBounds(randY, h);

      // Update current position
      curPos.current = { x: randX, y: randY };

      // Draw and schedule next with consistent timing
      if (draw()) {
        // Use fixed interval for consistent timing in auto mode
        clearExistingTimer();
        randTimer = registerTimer(
          window.setTimeout(drawRand, AUTO_LINE_INTERVAL)
        );
      } else {
        // If not drawn, try again after a short delay
        clearExistingTimer();
        randTimer = registerTimer(window.setTimeout(drawRand, 100));
      }
    };

    // If mode changed, perform a complete reset
    if (modeChanged) {
      // Clear all timers
      clearAllTimers();

      // Reset all state
      lineSegments.current = [];
      prevPos.current = { x: undefined, y: undefined };
      curPos.current = { x: undefined, y: undefined };
      isMouseActive.current = false;

      // Clear the canvas immediately
      ctx.clearRect(0, 0, w, h);
      isClearing.current = true;

      // Wait for a moment before starting again
      const resetTimer = window.setTimeout(() => {
        isClearing.current = false;

        // Only start drawing again if we're in the hero section
        if (isInHeroSection()) {
          randTimer = registerTimer(window.setTimeout(drawRand, 1000));
        }
      }, 800); // Longer delay to ensure complete reset

      activeTimers.current.push(resetTimer);
    } else if (isInHeroSection() && !randTimer) {
      // Start random drawing after a delay, but only if we're in the hero section
      // and we don't already have a timer running
      randTimer = registerTimer(window.setTimeout(drawRand, 3000));
    }

    // Handle scroll events to clear trails when scrolling
    const handleScroll = () => {
      // Update current scroll position
      currentScrollY.current = window.scrollY;

      // Clear trails when scrolling with fast fade
      if (!isClearing.current) {
        isClearing.current = true;
        clearCanvas(true); // Use fast fade for scroll-triggered clearing

        registerTimer(
          window.setTimeout(() => {
            isClearing.current = false;
          }, 50) // Shorter reset time for scroll clearing
        );
      }

      // Restart random drawing only if we're in the hero section
      if (isInHeroSection() && !isClearing.current) {
        clearExistingTimer();
        randTimer = registerTimer(window.setTimeout(drawRand, 1000));
      }
    };

    // Initialize scroll position
    currentScrollY.current = window.scrollY;

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Mouse move event for direct tracking
    const move = (e: MouseEvent) => {
      // Only track movement inside the designated area
      if (activeArea !== undefined && e.clientY > activeArea) return;

      // Update last mouse activity time and set active flag
      const now = Date.now();
      lastMouseActivity.current = now;

      // If this is the first mouse movement after auto mode, record the time
      if (!isMouseActive.current) {
        mouseActiveSince.current = now;
      }

      isMouseActive.current = true;

      // If we have a random timer, clear it
      clearExistingTimer();

      // Get mouse position relative to canvas
      const rect = canvas.getBoundingClientRect();
      curPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // Draw immediately
      draw();

      // Set a timer to reset mouse active flag after 2 seconds of inactivity
      setTimeout(() => {
        const now = Date.now();
        const timeSinceLastMove = now - lastMouseActivity.current;

        if (timeSinceLastMove >= 2000) {
          // Calculate how long we've been in mouse mode
          const timeInMouseMode = now - mouseActiveSince.current;
          const wasLongMouseSession = timeInMouseMode >= AUTO_CLEAR_TIMEOUT;

          // Switch back to auto mode
          isMouseActive.current = false;

          // If we were in mouse mode for more than 10 seconds, clear the trails
          if (wasLongMouseSession && !isClearing.current) {
            isClearing.current = true;
            clearCanvas();

            const clearingTimer = window.setTimeout(() => {
              isClearing.current = false;
            }, 100);
            activeTimers.current.push(clearingTimer);
          }

          // Restart random drawing only if we're in the hero section
          if (isInHeroSection()) {
            clearExistingTimer();
            randTimer = registerTimer(window.setTimeout(drawRand, 1000));
          }
        }
      }, 2000);
    };

    window.addEventListener("mousemove", move);

    // Return cleanup function
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", handleScroll);

      // Clear any pending timers
      if (randTimer) {
        window.clearTimeout(randTimer);
        randTimer = null;
      }

      // Clear the periodic interval
      clearInterval(periodicClearInterval);

      // Reset all state
      lineSegments.current = [];
      prevPos.current = { x: undefined, y: undefined };
      curPos.current = { x: undefined, y: undefined };
      isMouseActive.current = false;
    };
  }, [activeArea, mode, isMounted]);

  // Only render the canvas on the client side to avoid hydration errors
  if (!isMounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
    />
  );
}
