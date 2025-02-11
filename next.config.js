const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  env: {
    MEDIIUM_USERNAME: process.env.MEDIIUM_USERNAME,
    GITHUB_USERNAME: process.env.GITHUB_USERNAME,
    NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN:
      process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN,
    NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET:
      process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    NEXT_PUBLIC_SPOTIFY_CLIENT_ID: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  },
};

module.exports = withNextIntl(nextConfig);
