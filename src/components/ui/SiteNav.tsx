"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const sections = ["about", "experience", "research"];

type Props = {
  /** Always shown, instead of sliding in after the hero. */
  pinned?: boolean;
  /** Where the home page is from here: "" on the home page itself, "/" elsewhere. */
  home?: string;
  /** The page this nav is on, if it is one of the links. */
  current?: "photographs";
  /** Line the bar up with a wide page instead of the reading column. */
  wide?: boolean;
};

/**
 * Slim top bar. On the home page it stays out of the hero and slides in once
 * the visitor has scrolled past it; on other pages it is pinned. The wordmark
 * matches the hero's lowercase serif and is repeated in the research
 * write-ups' masthead, so the differently styled surfaces share one identity.
 */
export function SiteNav({ pinned = false, home = "", current, wide = false }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const visible = pinned || scrolled;

  useEffect(() => {
    if (pinned) return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned]);

  const surface =
    'bg-white/85 border-gray-200 text-gray-600 dark:bg-black/80 dark:border-gray-800 dark:text-gray-300';
  const wordmark = 'text-gray-900 dark:text-white';
  const hover = 'hover:text-gray-900 dark:hover:text-white';
  const column = wide
    ? "max-w-[1200px] px-[clamp(20px,5vw,48px)]"
    : "max-w-[95%] sm:max-w-2xl md:max-w-3xl px-3 sm:px-6 md:px-8";
  const tab = visible ? 0 : -1;

  return (
    <nav
      aria-label="Site"
      aria-hidden={!visible}
      className={`fixed top-0 inset-x-0 z-40 border-b backdrop-blur-md transition-all duration-300 ${surface} ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className={`${column} mx-auto h-12 flex items-center justify-between gap-3 sm:gap-4`}>
        {home ? (
          <Link
            href={home}
            tabIndex={tab}
            className={`font-serif lowercase tracking-widest text-lg leading-none whitespace-nowrap ${wordmark}`}
          >
            trevor kwan
          </Link>
        ) : (
          <a
            href="#top"
            tabIndex={tab}
            className={`font-serif lowercase tracking-widest text-lg leading-none whitespace-nowrap ${wordmark}`}
          >
            trevor kwan
          </a>
        )}
        <div className="flex items-center gap-3 sm:gap-6 text-[13px] sm:text-sm whitespace-nowrap">
          {sections.map((id) => (
            <a
              key={id}
              href={`${home}#${id}`}
              tabIndex={tab}
              className={`transition-colors ${hover}`}
            >
              {id}
            </a>
          ))}
          <Link
            href="/photography/"
            tabIndex={tab}
            aria-current={current === "photographs" ? "page" : undefined}
            className={`transition-colors ${hover} ${
              current === "photographs"
                ? `${wordmark} underline underline-offset-[6px] decoration-1 decoration-[#e5533a]`
                : ""
            }`}
          >
            {/* The full word does not fit beside the wordmark on a phone. */}
            <span className="sm:hidden">photos</span>
            <span className="hidden sm:inline">photographs</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
