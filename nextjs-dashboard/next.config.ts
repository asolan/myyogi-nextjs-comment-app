import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'picsum.photos',
      port: '',
      pathname: '/**'
    }]
  },
  // experimental: {
  //   ppr: 'incremental'
  // }
};

export default nextConfig;
