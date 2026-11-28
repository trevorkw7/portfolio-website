import type { Metadata, Viewport } from "next";

import { Gallery } from "@/components/photography/Gallery";
import { SiteNav } from "@/components/ui";
import { days } from "@/data/days";

import "../photography.css";

const frames = days.reduce((n, s) => n + 1 + s.rows.flat().length, 0);

export const metadata: Metadata = {
  title: "Days · Photographs | Trevor Kwan",
  description: `${frames} photographs by Trevor Kwan from ordinary days in ${days.length} places, kept in the order they happened.`,
};

export const viewport: Viewport = { themeColor: "#000000" };

export default function Days() {
  // The diary: the same page as the series, with places and dates for chapters.
  return (
    <div data-theme="dark" className="pg-root font-sans">
      <SiteNav pinned wide home="/" current="photographs" />
      <Gallery section="days" items={days} />
    </div>
  );
}
