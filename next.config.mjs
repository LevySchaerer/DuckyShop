/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	// Wichtig: Azure kann mit 'standalone'-Output umgehen
	output: 'standalone',
};

export default nextConfig;
