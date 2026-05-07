import type { NextConfig } from "next";

const directusRemotePattern = getDirectusRemotePattern();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), accelerometer=(), gyroscope=(), magnetometer=()",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
  images: directusRemotePattern
    ? {
        remotePatterns: [directusRemotePattern],
      }
    : undefined,
};

export default nextConfig;

function getDirectusRemotePattern() {
  const directusUrl = process.env.DIRECTUS_URL;
  if (!directusUrl) return null;

  try {
    const url = new URL(directusUrl);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;

    return {
      protocol: url.protocol.replace(":", "") as "http" | "https",
      hostname: url.hostname,
      port: url.port,
      pathname: "/assets/**",
    };
  } catch {
    return null;
  }
}
