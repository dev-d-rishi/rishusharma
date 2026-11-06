import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: let phones/tablets on the local network load the dev server's
  // scripts (Next blocks non-localhost origins by default, which leaves the
  // page un-hydrated — e.g. the mobile menu button does nothing).
  // Update this if your machine's LAN IP changes. No effect on production.
  allowedDevOrigins: ["192.168.1.2"],
};

export default nextConfig;
