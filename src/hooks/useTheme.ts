import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const read = (): Theme =>
  typeof document !== "undefined" && document.documentElement.dataset.theme === "light"
    ? "light"
    : "dark";

/**
 * The theme lives on <html data-theme>, set before first paint by the script
 * in layout.tsx, and all colours are CSS keyed on it. This hook only mirrors
 * it into React for the few things that need it in JavaScript (the trail
 * canvas colour, the toggle) and changes it.
 */
export function useTheme() {
  // Server and first client render agree on "dark"; the effect then syncs to
  // the real value. Nothing visible depends on this state, so no flash.
  const [theme, setState] = useState<Theme>("dark");

  useEffect(() => {
    setState(read());

    // Follow the system setting only while the visitor hasn't chosen one.
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {}
    if (stored) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      const t: Theme = e.matches ? "dark" : "light";
      document.documentElement.dataset.theme = t;
      setState(t);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    const apply = () => {
      document.documentElement.dataset.theme = t;
      setState(t);
    };
    try {
      localStorage.setItem("theme", t);
    } catch {}
    // Cross-fade a snapshot of the old theme into the new one. The browser
    // does this on the GPU without restyling anything mid-animation, unlike
    // transitioning the colours of every element on the page.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !reduced) doc.startViewTransition(apply);
    else apply();
  }, []);

  return { theme, setTheme };
}
