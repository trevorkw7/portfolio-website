"use client";

/* eslint-disable @next/next/no-img-element --
   The photographs are pre-sized WebP files in public/photos with their own
   srcset, so they do not go through the image optimiser. */

import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Photo, Series } from "@/data/photos";

const INDEX = -1; // the contact sheet
const INSTAGRAM = "https://www.instagram.com/tk7.photo/";

/** The page has two sections: the themed series, and a diary by place and date. */
export type Section = "series" | "days";
const SECTIONS: { id: Section; href: string }[] = [
  { id: "series", href: "/photography/" },
  { id: "days", href: "/photography/days/" },
];

type Size = 160 | 800 | 1800;
/** What the parts below need to know about the section they are showing. */
type Shelf = {
  items: Series[];
  days: boolean;
  file: (p: Photo, size: Size) => string;
  /** What stands in front of a title: its number, or in the diary its month. */
  mark: (i: number) => string;
  label: (i: number) => string;
};

const pad = (n: number) => String(n).padStart(2, "0");
const framesOf = (s: Series) => [s.hero, ...s.rows.flat()];

const fromHash = (items: Series[]) => {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (hash === "index") return INDEX;
  const i = items.findIndex((s) => s.slug === hash);
  return i < 0 ? 0 : i;
};

type Viewing = { photos: Photo[]; at: number; label: string };

export function Gallery({ section, items }: { section: Section; items: Series[] }) {
  const shelf = useMemo<Shelf>(() => {
    const days = section === "days";
    const dir = days ? "/photos/days" : "/photos";
    const mark = (i: number) => items[i].when ?? pad(i + 1);
    return {
      items,
      days,
      file: (p, size) => `${dir}/p${p.id}-${size}.webp`,
      mark,
      label: (i) => `${mark(i)} ${items[i].title}`,
    };
  }, [section, items]);
  const { label, mark } = shelf;
  const [sel, setSel] = useState(0);
  const [viewing, setViewing] = useState<Viewing | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // The series in view is kept in the URL hash, so a series can be linked to
  // and the Back button steps through the ones visited.
  useEffect(() => {
    const sync = () => setSel(fromHash(items));
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, [items]);

  const go = useCallback((next: number) => {
    const n = items.length;
    const to = next === INDEX ? INDEX : ((next % n) + n) % n;
    setSel(to);
    window.history.pushState(null, "", to === INDEX ? "#index" : `#${items[to].slug}`);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() =>
      galleryRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }),
    );
  }, [items]);

  // On a phone the chapter list is one line that scrolls sideways; keep the
  // current chapter in the middle of it.
  useEffect(() => {
    const strip = chaptersRef.current;
    const on = strip?.querySelector<HTMLElement>('[data-on="true"]');
    if (!strip || !on || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: on.offsetLeft - (strip.clientWidth - on.offsetWidth) / 2, behavior: "smooth" });
  }, [sel]);

  const open = useCallback((photos: Photo[], at: number, name: string, opener: HTMLElement) => {
    openerRef.current = opener;
    setViewing({ photos, at, label: name });
  }, []);

  const close = useCallback(() => {
    setViewing(null);
    const opener = openerRef.current;
    openerRef.current = null;
    // Put focus back on the frame that was opened, without moving the page.
    window.setTimeout(() => opener?.focus({ preventScroll: true }), 30);
  }, []);

  const step = useCallback((by: number) => {
    setViewing((v) => (v ? { ...v, at: (v.at + by + v.photos.length) % v.photos.length } : v));
  }, []);

  const current = sel === INDEX ? null : items[sel];
  const n = items.length;

  return (
    <main className="pg">
      <h1 className="sr-only">{shelf.days ? "Photographs: days" : "Photographs"}</h1>

      <nav className="pg-wrap pg-sections" aria-label="Sections">
        {SECTIONS.map((sec) => (
          <Link
            key={sec.id}
            href={sec.href}
            className="pg-t pg-label pg-section"
            data-on={sec.id === section}
            aria-current={sec.id === section ? "page" : undefined}
          >
            {sec.id}
          </Link>
        ))}
      </nav>

      <div className="pg-wrap pg-idx">
        <div className="pg-chapters" ref={chaptersRef}>
          {items.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              className="pg-t pg-chapter"
              data-on={sel === i}
              aria-current={sel === i ? "true" : undefined}
              onClick={() => go(i)}
            >
              <span className="pg-num">{mark(i)}</span>
              <span className="pg-chapter-title">{s.title}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="pg-t pg-label pg-sheetlink"
          data-on={sel === INDEX}
          aria-current={sel === INDEX ? "true" : undefined}
          onClick={() => go(INDEX)}
        >
          contact sheet
        </button>
      </div>

      <div ref={galleryRef} className="pg-gallery">
        {current ? (
          <Reel key={current.slug} shelf={shelf} s={current} index={sel} open={open} />
        ) : (
          <Sheet shelf={shelf} go={go} open={open} />
        )}
      </div>

      <div className="pg-wrap">
        {current && (
          <div className="pg-pager">
            <button type="button" className="pg-t pg-label" onClick={() => go(sel - 1)}>
              <span className="pg-arr pg-arr-l">←</span> {label((sel - 1 + n) % n)}
            </button>
            <button type="button" className="pg-t pg-label pg-next" onClick={() => go(sel + 1)}>
              {label((sel + 1) % n)} <span className="pg-arr pg-arr-r">→</span>
            </button>
          </div>
        )}
        <footer className="pg-footer">
          <a href={INSTAGRAM}>more on instagram · @tk7.photo</a>
          <Link href="/">← software engineer · robotics researcher</Link>
        </footer>
      </div>

      {viewing && <Viewer shelf={shelf} v={viewing} step={step} close={close} />}
    </main>
  );
}

type Open = (photos: Photo[], at: number, name: string, opener: HTMLElement) => void;

/** One series: the title card, its name, then the rows of frames. */
function Reel({ shelf, s, index, open }: { shelf: Shelf; s: Series; index: number; open: Open }) {
  const { file } = shelf;
  const photos = framesOf(s);
  // In the diary the viewer shows each frame's own date, so the place is enough.
  const name = shelf.days ? s.title : shelf.label(index);
  // Where each row starts within the series; the title card is frame 0.
  const starts = s.rows.map((_, r) => 1 + s.rows.slice(0, r).reduce((t, row) => t + row.length, 0));

  return (
    <section className="pg-reel" aria-label={s.title}>
      <button
        type="button"
        className="pg-hero"
        onClick={(e) => open(photos, 0, name, e.currentTarget)}
      >
        <span className="pg-hero-in">
          <img
            src={file(s.hero, 1800)}
            srcSet={`${file(s.hero, 800)} 800w, ${file(s.hero, 1800)} 1800w`}
            sizes="100vw"
            width={s.hero.w}
            height={s.hero.h}
            alt={s.hero.alt}
            fetchPriority="high"
            style={s.heroY == null ? undefined : { objectPosition: `50% ${s.heroY}%` }}
          />
        </span>
      </button>

      <div className="pg-wrap">
        <div className="pg-titlecard">
          <div className="pg-titlecard-name">
            <span className="pg-num pg-tc-a">
              {s.span ?? `${pad(index + 1)} / ${pad(shelf.items.length)}`}
            </span>
            <h2 className="pg-tc-b">{s.title}</h2>
          </div>
          <span className="pg-label pg-tc-c">
            {photos.length} frames
            {s.camera ? ` · ${s.camera}` : ""}
          </span>
        </div>
        <div className="pg-rule" />

        <div className="pg-rows">
          {s.rows.map((row, r) => {
            const sum = row.reduce((t, p) => t + p.w / p.h, 0);
            return (
              <div className="pg-row" key={r}>
                {row.map((p, c) => {
                  const here = starts[r] + c;
                  const ar = p.w / p.h;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      className="pg-frame"
                      style={{ "--ar": ar.toFixed(4) } as React.CSSProperties}
                      onClick={(e) => open(photos, here, name, e.currentTarget)}
                    >
                      <img
                        src={file(p, 800)}
                        srcSet={`${file(p, 800)} 800w, ${file(p, 1800)} 1800w`}
                        sizes={`(max-width: 720px) 100vw, ${Math.round((ar / sum) * 1200)}px`}
                        width={p.w}
                        height={p.h}
                        alt={p.alt}
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Every series as a strip of small frames. */
function Sheet({ shelf, go, open }: { shelf: Shelf; go: (i: number) => void; open: Open }) {
  const { file, mark } = shelf;
  return (
    <section className="pg-reel pg-wrap" aria-label="Contact sheet">
      <div className="pg-sheet">
        {shelf.items.map((s, i) => {
          const photos = framesOf(s);
          return (
            <div className="pg-sheetrow" key={s.slug} style={{ "--i": i + 1 } as React.CSSProperties}>
              <button type="button" className="pg-t pg-dim pg-sheet-title" onClick={() => go(i)}>
                <span className="pg-num">
                  {mark(i)} · {photos.length}
                </span>
                <span>{s.title}</span>
              </button>
              <div className="pg-strip pg-dim">
                {photos.map((p, at) => (
                  <button
                    key={p.id}
                    type="button"
                    className="pg-thumb"
                    onClick={(e) => open(photos, at, shelf.days ? s.title : shelf.label(i), e.currentTarget)}
                  >
                    <img
                      src={file(p, 160)}
                      width={Math.round((72 * p.w) / p.h)}
                      height={72}
                      alt={p.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** One frame on black, with the rest of its series a step away. */
function Viewer({
  shelf,
  v,
  step,
  close,
}: {
  shelf: Shelf;
  v: Viewing;
  step: (by: number) => void;
  close: () => void;
}) {
  const { file } = shelf;
  const ref = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const photo = v.photos[v.at];

  // The page behind stays put while a frame is open.
  useEffect(() => {
    const root = document.documentElement;
    const before = root.style.overflow;
    root.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      root.style.overflow = before;
    };
  }, []);

  // Fetch the frames either side, so stepping does not wait on the network.
  useEffect(() => {
    const m = v.photos.length;
    [1, -1].forEach((d) => {
      const img = new Image();
      img.src = file(v.photos[(v.at + d + m) % m], 1800);
    });
  }, [v.at, v.photos, file]);

  return (
    <div
      ref={ref}
      className="pg-viewer"
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.alt} (${v.at + 1} of ${v.photos.length})`}
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        else if (e.key === "ArrowLeft") step(-1);
        else if (e.key === "Escape") close();
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const end = e.changedTouches[0]?.clientX;
        if (touchX.current == null || end == null) return;
        const dx = end - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 48) {
          e.preventDefault();
          step(dx < 0 ? 1 : -1);
        }
      }}
    >
      <div className="pg-stage">
        <img
          key={photo.id}
          className="pg-viewer-img"
          src={file(photo, 1800)}
          width={photo.w}
          height={photo.h}
          alt={photo.alt}
        />
        <button type="button" className="pg-zone pg-zone-l" aria-label="Previous frame" onClick={() => step(-1)} />
        <button type="button" className="pg-zone pg-zone-r" aria-label="Next frame" onClick={() => step(1)} />
      </div>
      <div className="pg-viewer-bar pg-label">
        <span className="pg-viewer-name">
          {v.label}
          {photo.t && <span className="pg-when">{photo.t}</span>}
        </span>
        <span className="pg-count">
          {pad(v.at + 1)} / {pad(v.photos.length)}
        </span>
        <span className="pg-viewer-ctl">
          <button type="button" className="pg-t pg-label" onClick={() => step(-1)}>
            prev
          </button>
          <button type="button" className="pg-t pg-label" onClick={() => step(1)}>
            next
          </button>
          <button type="button" className="pg-t pg-label pg-close" onClick={close}>
            close
          </button>
        </span>
      </div>
    </div>
  );
}
