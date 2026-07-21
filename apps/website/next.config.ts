/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@voryent/ui", "@voryent/config", "@voryent/types", "@voryent/utils"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["@voryent/ui", "lucide-react", "framer-motion", "date-fns"],
  },
};

export default nextConfig;
