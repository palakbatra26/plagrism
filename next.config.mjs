/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable ESLint during production builds
  eslint: {
    // Only run ESLint on these dirs during production builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig; 