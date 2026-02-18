import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "macevalackiklubcrvenazvezda.com",
      },
      {
        hostname: "dev.macevalackiklubcrvenazvezda.com",
      },
      {
        hostname: "localhost",
      },
    ],
  },
  transpilePackages: ["three"],
};

export default withNextIntl(nextConfig);
