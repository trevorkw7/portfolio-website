import type { NextConfig } from "next";

const WRITEUP = "/research/llm-robot-interface";

const nextConfig: NextConfig = {
  // The research write-ups are static HTML in public/ and use relative links,
  // so their directory URLs must keep a trailing slash.
  trailingSlash: true,
  async redirects() {
    return [
      // Until there is a second write-up, /research/ goes straight to the first.
      { source: "/research", destination: `${WRITEUP}/`, permanent: false },
    ];
  },
  async rewrites() {
    return [
      { source: `${WRITEUP}`, destination: `${WRITEUP}/index.html` },
    ];
  },
};

export default nextConfig;
