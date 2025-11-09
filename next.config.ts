// Lokasi: next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // GANTI INI DENGAN HOSTNAME SUPABASE ANDA
        // (contoh: xyzabc.supabase.co)
        hostname: "sagcxdgswhgkmbjzjbfp.supabase.co", 
      },
      {
        // Tambahkan ini juga karena Anda menggunakannya sebagai fallback
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;


