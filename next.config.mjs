/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,

    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },

 
};

export default nextConfig;
