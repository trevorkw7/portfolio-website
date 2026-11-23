"use client";

import { useEffect, useRef } from "react";

/*
 * The hero's scribble trail. Same behaviour as before: idle, it draws a new
 * straight stroke to a random point near the centre every 600ms; with a
 * mouse, it follows the cursor in strokes of at least 45px; it fades away
 * every 10s, after a long mouse session, on theme change and when "enter" is
 * pressed.
 *
 * What changed is how it does it:
 * - The canvas lives inside the hero and scrolls with it, instead of a
 *   fixed, full-viewport layer over the whole page.
 * - It is sized to the hero with a ResizeObserver and scaled for the screen's
 *   pixel density, so lines are crisp on retina, and it is not wiped and
 *   reallocated when a phone's address bar shows or hides.
 * - One timer drives it, instead of a new two-second timer per mouse event.
 * - Fades run on animation frames, not interval timers.
 * - It stops completely while the hero is off screen or the tab is hidden.
 */

type Seg = { x1: number; y1: number; x2: number; y2: number };

const LINE_WIDTH = 0.8;
const MIN_LENGTH = 45;
const AUTO_MS = 600;
const RETRY_MS = 100;
const START_DELAY_MS = 3000;
const IDLE_AFTER_MOUSE_MS = 2000;
const AUTO_CLEAR_MS = 10000;
const FADE_MS = 450;
const FAST_FADE_MS = 160;

interface MouseTrailProps {
  mode: "dark" | "light";
}

declare global {
  interface Window {
    clearMouseTrail?: () => void;
  }
}

export function MouseTrail({ mode }: MouseTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef(mode);
  const restartRef = useRef<(delay: number) => void>(() => {});
  const fadeRef = useRef<(ms: number, after?: () => void) => void>(() => {});

  // Theme change: fade the current strokes, then start again in the new colour.
  useEffect(() => {
    if (modeRef.current === mode) return;
    modeRef.current = mode;
    fadeRef.current(FAST_FADE_MS, () => restartRef.current(800));
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let segs: Seg[] = [];
    let alpha = 1;
    let prev: { x: number; y: number } | null = null;
    let timer = 0;
    let fadeFrame = 0;
    let visible = true;
    let mouseActive = false;
    let lastMouse = 0;
    let mouseSince = 0;
    let lastClear = performance.now();

    const color = () => (modeRef.current === "dark" ? "238,238,238" : "51,51,51");

    const redraw = () => {
      ctx.clearRect(0, 0, w, h);
      if (!segs.length || alpha <= 0) return;
      ctx.strokeStyle = `rgba(${color()},${alpha})`;
      ctx.lineWidth = LINE_WIDTH;
      ctx.lineCap = "butt";
      ctx.beginPath();
      for (const s of segs) {
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
      }
      ctx.stroke();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nw = Math.round(rect.width);
      const nh = Math.round(rect.height);
      if (nw === w && nh === h && canvas.width === Math.round(nw * dpr)) return;
      w = nw;
      h = nh;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      redraw();
    };

    // Try to add a stroke from the previous point to (x, y).
    const stroke = (x: number, y: number): boolean => {
      if (!prev) {
        prev = { x, y };
        return false;
      }
      if (Math.hypot(x - prev.x, y - prev.y) <= MIN_LENGTH) return false;
      segs.push({ x1: prev.x, y1: prev.y, x2: x, y2: y });
      prev = { x, y };
      if (alpha < 1) alpha = 1;
      redraw();
      return true;
    };

    const clearNow = () => {
      cancelAnimationFrame(fadeFrame);
      fadeFrame = 0;
      segs = [];
      prev = null;
      alpha = 1;
      ctx.clearRect(0, 0, w, h);
    };

    const fade = (ms: number, after?: () => void) => {
      if (!segs.length) {
        clearNow();
        after?.();
        return;
      }
      cancelAnimationFrame(fadeFrame);
      const start = performance.now();
      const from = alpha;
      const step = (t: number) => {
        alpha = Math.max(0, from * (1 - (t - start) / ms));
        redraw();
        if (alpha > 0) {
          fadeFrame = requestAnimationFrame(step);
        } else {
          clearNow();
          after?.();
        }
      };
      fadeFrame = requestAnimationFrame(step);
    };
    fadeRef.current = fade;

    const schedule = (delay: number) => {
      window.clearTimeout(timer);
      if (!visible || reduced) return;
      timer = window.setTimeout(tick, delay);
    };
    restartRef.current = schedule;

    // The single timer: auto-draws when idle, notices when the mouse stops.
    const tick = () => {
      timer = 0;
      const now = performance.now();
      if (fadeFrame) return schedule(RETRY_MS * 5);

      if (mouseActive) {
        if (now - lastMouse < IDLE_AFTER_MOUSE_MS) return schedule(IDLE_AFTER_MOUSE_MS - (now - lastMouse));
        mouseActive = false;
        if (now - mouseSince >= AUTO_CLEAR_MS) {
          lastClear = now;
          return fade(FADE_MS, () => schedule(1000));
        }
        return schedule(1000);
      }

      if (now - lastClear >= AUTO_CLEAR_MS && segs.length) {
        lastClear = now;
        return fade(FADE_MS, () => schedule(1000));
      }

      const x = w / 2 + (Math.random() - 0.5) * (w / 2);
      const y = h / 2 + (Math.random() - 0.5) * (h / 2);
      schedule(stroke(x, y) ? AUTO_MS : RETRY_MS);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !visible) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (y < 0 || y > h) return;
      const now = performance.now();
      if (!mouseActive) {
        mouseActive = true;
        mouseSince = now;
      }
      lastMouse = now;
      stroke(x, y);
      // One pending check for "mouse has stopped", not one timer per event.
      if (!timer) schedule(IDLE_AFTER_MOUSE_MS);
    };

    const setVisible = (v: boolean) => {
      if (v === visible) return;
      visible = v;
      if (!v) {
        window.clearTimeout(timer);
        timer = 0;
        clearNow();
      } else {
        lastClear = performance.now();
        schedule(1000);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(canvas);
    const onVis = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.clearMouseTrail = () => fade(FADE_MS);

    resize();
    schedule(START_DELAY_MS);

    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      window.clearTimeout(timer);
      cancelAnimationFrame(fadeFrame);
      delete window.clearMouseTrail;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
}
