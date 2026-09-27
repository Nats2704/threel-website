import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  poweredByHeader: false,
  // Situs statis tidak punya server pengoptimal gambar (/_next/image), jadi gambar harus disajikan apa adanya.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;