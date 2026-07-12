import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@voryent/ui", "@voryent/config", "@voryent/utils", "@voryent/types"],
  experimental: {
    optimizePackageImports: ["@voryent/ui", "lucide-react", "recharts", "date-fns"],
  },
};

export default nextConfig;
