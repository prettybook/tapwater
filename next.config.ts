import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure consistent URL handling - no trailing slashes
  trailingSlash: false,

  // Enable strict mode for better error catching
  reactStrictMode: true,
};

export default nextConfig;
