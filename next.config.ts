/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
      }, {
        protocol: "https",
        hostname: "covers.openlibrary.org",
      },
    ],

    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;