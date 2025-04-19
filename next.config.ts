import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    EDEN_AI_API_KEY: process.env.EDEN_AI_API_KEY,
  },
};

export default nextConfig;
