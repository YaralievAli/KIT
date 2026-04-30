import type { NextConfig } from "next";

const directusRemotePattern = getDirectusRemotePattern();

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
