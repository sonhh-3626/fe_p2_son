import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ['picsum.photos'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
};


const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
