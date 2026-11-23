"use client";

import React, { useEffect, useState } from "react";

const links = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "research", href: "#research" },
];

/**
 * Slim top bar that stays out of the hero and slides in once the visitor
 * has scrolled past it. The wordmark matches the hero's lowercase serif and
 * is repeated in the research write-ups' masthead, so the two differently
 * styled surfaces share one identity.
 */
export function SiteNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const surface =
    'bg-white/85 border-gray-200 text-gray-600 dark:bg-black/80 dark:border-gray-800 dark:text-gray-300';
  const wordmark = 'text-gray-900 dark:text-white';
  const hover = 'hover:text-gray-900 dark:hover:text-white';

  return (
    <nav
      aria-label="Site"
      aria-hidden={!visible}
      className={`fixed top-0 inset-x-0 z-40 border-b backdrop-blur-md transition-all duration-300 ${surface} ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-[95%] sm:max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-6 md:px-8 h-12 flex items-center justify-between gap-4">
        <a
          href="#top"
          tabIndex={visible ? 0 : -1}
          className={`font-serif lowercase tracking-widest text-lg leading-none whitespace-nowrap ${wordmark}`}
        >
          trevor kwan
        </a>
        <div className="flex items-center gap-4 sm:gap-6 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              tabIndex={visible ? 0 : -1}
              className={`transition-colors ${hover}`}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
