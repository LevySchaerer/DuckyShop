/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // ENTFERNT: output: 'export' - da Sie Server Functions brauchen
  // ENTFERNT: images.unoptimized - da Server-Side
  
  // Für Azure App Service optimiert
  experimental: {
    outputFileTracingRoot: undefined, // Für bessere Deployment-Kompatibilität
  }
};

export default nextConfig;