import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.codepen.io",
      },
       {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
       {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
       {
        protocol: "https",
        hostname: "example.com",
      },
       {
        protocol: "https",
        hostname: "media-cdn.tripadvisor.com",
      },
       {
        protocol: "https",
        hostname: "*.bing.com",
      },
       {
        protocol: "https",
        hostname: "www.wyndhamhotels.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "places.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
