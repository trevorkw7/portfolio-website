"use client";

import { useEffect } from "react";

const PAPER = "#fcfcfa"; // the research write-ups' background
const EXIT_MS = 260;

/**
 * Links from the home page into the research write-ups fade the page to the
 * write-up's paper colour before navigating, so the black hero never cuts
 * straight to a light page. Doing this ourselves, rather than relying on a
 * browser snapshot, keeps it smooth from the animated hero too.
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
      veil = document.createElement("div");
      veil.style.cssText =
        `position:fixed;inset:0;z-index:2147483647;pointer-events:none;` +
        `background:${PAPER};opacity:0;transition:opacity ${EXIT_MS}ms cubic-bezier(.4,0,.2,1)`;
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
