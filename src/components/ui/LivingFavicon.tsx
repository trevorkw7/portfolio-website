"use client";

import { useEffect } from "react";

// Same skeleton as the static icon (src/app/icon.svg): stem, foot curl, crossbar.
const SKELETON: [number, number][] = [
  [30, 9], [30, 46], [33, 52], [42, 50], [30, 46],
  [30, 22], [16, 22], [46, 22], [30, 22],
];

const PASSES = 3;
const STROKE_MS = 600; // same cadence as the hero's auto-drawn trail
const HOLD_STROKES = 5; // pause on the finished t before redrawing
const SIZE = 64;

/** One scribbled t: the skeleton traced PASSES times, each pass jittered anew. */
function scribble(): { x: number; y: number; pass: number }[] {
  const pts: { x: number; y: number; pass: number }[] = [];
  for (let pass = 0; pass < PASSES; pass++) {
    // Later passes stray well off the bold first stroke so the scribble shows.
    const jitter = pass === 0 ? 3 : 14;
    for (const [x, y] of SKELETON) {
      pts.push({
        x: x + (Math.random() - 0.5) * jitter,
        y: y + (Math.random() - 0.5) * jitter,
        pass,
      });
    }
  }
  return pts;
}

/**
 * Redraws the tab icon as a scribbled t, one straight stroke at a time, then
 * starts a fresh scribble. Home page only. Browsers that ignore runtime
 * favicon changes (Safari) keep the static icon, and so does anyone who
 * prefers reduced motion.
 */
export function LivingFavicon() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Next can re-insert its metadata icon links after hydration, so claim
    // every icon link on each stroke and remember how to put each one back.
    const original = new Map<HTMLLinkElement, { href: string; type: string | null }>();
    const iconLinks = () => [...document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]')];

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let pts = scribble();
    let step = 1;

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.roundRect(0, 0, SIZE, SIZE, 14);
      ctx.fill();

      ctx.strokeStyle = "#fff";
      ctx.lineJoin = "miter";
      ctx.miterLimit = 3;
      const shown = Math.min(step, pts.length - 1);
      for (let i = 1; i <= shown; i++) {
        // First pass is bold so the t still reads at 16 px; later passes are
        // the fine scribble on top, like the hero's hairline trail.
        ctx.lineWidth = pts[i].pass === 0 ? 4.6 : 2.4;
        ctx.beginPath();
        ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
        ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
      }

      const url = canvas.toDataURL("image/png");
      for (const l of iconLinks()) {
        if (!original.has(l)) original.set(l, { href: l.href, type: l.getAttribute("type") });
        l.removeAttribute("type");
        l.href = url;
      }

      step++;
      if (step > pts.length - 1 + HOLD_STROKES) {
        pts = scribble();
        step = 1;
      }
    };

    draw();
    const timer = window.setInterval(draw, STROKE_MS);

    return () => {
      window.clearInterval(timer);
      original.forEach((o, l) => {
        l.href = o.href;
        if (o.type) l.setAttribute("type", o.type);
      });
    };
  }, []);

  return null;
}
