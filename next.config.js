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
	},
};

module.exports = withNextIntl(nextConfig);
