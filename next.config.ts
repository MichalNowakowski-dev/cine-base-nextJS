import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  optimizeFonts: false,
  // ✅ Wyłącz lint i typecheck podczas buildu - przyspieszy znacznie
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    reactCompiler: true,
  },
  images: {
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
