/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["upload.wikimedia.org", "flagcdn.com", "restcountries.com"],
    // alternativt remotePatterns kan användas för mer flexibilitet
  },
};

module.exports = nextConfig;