"use client";

import React, { useEffect, useRef } from "react";

/*
 * The hero's soft background light.
 *
 * History, because both obvious approaches are traps:
 * - Eight DOM circles with a 60-80px CSS blur, scaled by JavaScript every
 *   frame, made phones fall behind on painting while scrolling.
 * - CSS radial gradients look identical without a blur, but Chrome repaints
 *   large gradient layers continuously when a canvas (the scribble trail)
 *   sits above them: 4 fps on an M3 Pro.
 *
 * So the light is drawn once into small bitmaps: each circle is a radial
 * gradient whose falloff is the exact profile of a disc blurred by a Gaussian
 * of the original blur radius, painted at a quarter of the hero's size (it is
 * so soft that upscaling is invisible). The GPU then only moves finished
 * textures: two layers per theme breathe with a compositor-only CSS
 * transform, pause off screen, and cross-fade by opacity on theme change.
 */

type Circle = { x: number; y: number; size: number; opacity: number };
type Look = { rgb: string; blur: number; gain: number };

const CIRCLES: Circle[] = Array.from({ length: 8 }, (_, i) => ({
  x: 5 + i * 12,
  y: 15 + (i % 3) * 25,
  size: 225 + ((i * 25) % 200),
  opacity: 0.15 + ((i * 0.03) % 0.2),
}));
const DARK: Look = { rgb: "147,197,253", blur: 60, gain: 1 };
const LIGHT: Look = { rgb: "74,222,128", blur: 80, gain: 1.3 };
const SCALE = 0.25; // bitmap resolution relative to CSS pixels
const BLEED = 0.1; // layers extend 10% past the hero so breathing never shows an edge

/** Intensity at distance d from the centre of a disc of radius r blurred by a Gaussian of s.d. sigma. */
function blurredDisc(d: number, r: number, sigma: number): number {
  const N = 28;
  let sum = 0;
  for (let i = 0; i < N; i++) {
    const rr = ((i + 0.5) / N) * r;
    for (let j = 0; j < N; j++) {
      const th = ((j + 0.5) / N) * 2 * Math.PI;
      const dx = rr * Math.cos(th) - d;
      const dy = rr * Math.sin(th);
      sum += Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma)) * rr;
    }
  }
  return (sum * (r / N) * ((2 * Math.PI) / N)) / (2 * Math.PI * sigma * sigma);
}

// Falloff profiles depend only on circle and look, so compute them once.
const profiles = new Map<string, { extent: number; stops: [number, number][] }>();
function profile(c: Circle, look: Look) {
  const key = `${c.size}|${c.opacity}|${look.blur}|${look.gain}`;
  let p = profiles.get(key);
  if (!p) {
    const r = c.size / 2;
    const extent = r + 3 * look.blur;
    const stops: [number, number][] = [];
    for (let k = 0; k <= 12; k++) {
      const d = (extent * k) / 12;
      stops.push([k / 12, Math.min(1, c.opacity * look.gain) * blurredDisc(d, r, look.blur)]);
    }
    p = { extent, stops };
    profiles.set(key, p);
  }
  return p;
}

function paint(canvas: HTMLCanvasElement, circles: Circle[], look: Look, w: number, h: number) {
  const bw = w * (1 + 2 * BLEED);
  const bh = h * (1 + 2 * BLEED);
  canvas.width = Math.max(1, Math.round(bw * SCALE));
  canvas.height = Math.max(1, Math.round(bh * SCALE));
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
  ctx.clearRect(0, 0, bw, bh);
  for (const c of circles) {
    const { extent, stops } = profile(c, look);
    const cx = w * BLEED + (c.x / 100) * w;
    const cy = h * BLEED + (c.y / 100) * h;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, extent);
    for (const [at, a] of stops) g.addColorStop(at, `rgba(${look.rgb},${a.toFixed(4)})`);
    ctx.fillStyle = g;
    ctx.fillRect(cx - extent, cy - extent, extent * 2, extent * 2);
  }
}

const EVEN = CIRCLES.filter((_, i) => i % 2 === 0);
const ODD = CIRCLES.filter((_, i) => i % 2 === 1);

export function AnimatedBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const canvases = [...el.querySelectorAll<HTMLCanvasElement>("canvas")];
    const looks = [DARK, DARK, LIGHT, LIGHT];
    const groups = [EVEN, ODD, EVEN, ODD];

    let lastW = 0;
    let lastH = 0;
    const draw = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      // Ignore tiny changes (a phone's toolbar) since the light is this soft.
      if (lastW && Math.abs(w - lastW) < 2 && Math.abs(h - lastH) / lastH < 0.15) return;
      lastW = w;
      lastH = h;
      canvases.forEach((cv, i) => paint(cv, groups[i], looks[i], w, h));
      el.classList.add("bokeh-ready");
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);

    // Nothing should animate where nobody can see it.
    const io = new IntersectionObserver(([entry]) => {
      el.classList.toggle("bokeh-paused", !entry.isIntersecting);
    });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const layer = (breathe: string, origin: string, delay = "0s") => (
    <canvas
      className="bokeh-layer"
      style={{ ["--breathe" as string]: breathe, transformOrigin: origin, animationDelay: delay }}
    />
  );

  return (
    <div ref={ref} className="bokeh absolute inset-0 overflow-hidden z-0 pointer-events-none" aria-hidden="true">
      <div className="bokeh-set is-dark absolute inset-0">
        {layer("17s", "40% 45%")}
        {layer("23s", "60% 55%", "-7s")}
      </div>
      <div className="bokeh-set is-light absolute inset-0">
        {layer("17s", "40% 45%")}
        {layer("23s", "60% 55%", "-7s")}
      </div>
    </div>
  );
}
