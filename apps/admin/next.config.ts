import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@voryent/ui", "@voryent/config", "@voryent/utils", "@voryent/types"],
};

export default nextConfig;
