/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Für statischen Export zu Azure App Service
  output: 'export',
  
  // Trailing Slash für bessere Kompatibilität mit Azure
  trailingSlash: true,
  
  // Bilder für statischen Export deaktivieren
  images: {
    unoptimized: true
  }
};

export default nextConfig;