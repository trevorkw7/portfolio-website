import type { Metadata, Viewport } from "next";

import { Gallery } from "@/components/photography/Gallery";
import { SiteNav } from "@/components/ui";
import { series } from "@/data/photos";

import "./photography.css";

const frames = series.reduce((n, s) => n + 1 + s.rows.flat().length, 0);

export const metadata: Metadata = {
  title: "Photographs | Trevor Kwan",
  description: `${frames} photographs by Trevor Kwan in ${series.length} series.`,
};

export const viewport: Viewport = { themeColor: "#000000" };

export default function Photography() {
  // data-theme="dark" keeps everything inside on the dark palette, including
  // the shared nav, even when the visitor has the rest of the site on light.
  return (
    <div data-theme="dark" className="pg-root font-sans">
      <SiteNav pinned wide home="/" current="photographs" />
      <Gallery section="series" items={series} />
    </div>
  );
}
