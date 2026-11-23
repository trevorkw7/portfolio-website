"use client";

import { useEffect } from "react";

const EXIT_MS = 260;

/**
 * Links from the home page into the research write-ups fade the page to its
 * own background before navigating, then the write-up brings its paper up
 * from that colour (see research/.../arrive.js). Leaving a dark page by
 * going dark, and letting the light page ease in, avoids a white flash.
 */
export function PageExit() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let veil: HTMLDivElement | null = null;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target === "_blank") return;
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("/research/") || reduced) return;

      e.preventDefault();
      const color = document.documentElement.style.background || "#000000";
      try {
        sessionStorage.setItem("arrive-from", color);
      } catch {}
      veil = document.createElement("div");
      veil.style.cssText =
        `position:fixed;inset:0;z-index:2147483647;pointer-events:none;` +
        `background:${color};opacity:0;transition:opacity ${EXIT_MS}ms cubic-bezier(.4,0,.2,1)`;
      document.body.appendChild(veil);
      // Commit the transparent starting state first, or the fade is skipped.
      void veil.offsetWidth;
      veil.style.opacity = "1";
      window.setTimeout(() => window.location.assign(href), EXIT_MS);
    };

    // Coming back with the Back button can restore this page from the
    // back-forward cache with the veil still up; take it down.
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted && veil) {
        veil.remove();
        veil = null;
      }
    };

    document.addEventListener("click", onClick);
    window.addEventListener("pageshow", onShow);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("pageshow", onShow);
      veil?.remove();
    };
  }, []);

  return null;
}
