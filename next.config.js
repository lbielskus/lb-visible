// next.config.js
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io', // ✅ your new host
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // 👈 temp fallback to avoid crash
      },
    ],
  },
};

module.exports = nextConfig;
