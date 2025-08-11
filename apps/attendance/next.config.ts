const withPWA = require("next-pwa")({
  dest: "public",
});

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const DB_URL = process.env.DATABASE_URL;
const ENABLE_REACT_COMPILER = process.env.ENABLE_REACT_COMPILER === "true";

const INTERNAL_PACKAGES = [
  "@spike/api",
  "@spike/auth",
  "@spike/client",
  "@spike/db",
  "@spike/env",
  "@spike/next",
  "@spike/ui",
  "@spike/stripe",
];

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: INTERNAL_PACKAGES,
  images: {
    remotePatterns: getRemotePatterns(),
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  serverExternalPackages: [],
  redirects: getRedirects,
  experimental: {
    mdxRs: true,
    reactCompiler: ENABLE_REACT_COMPILER,
    turbo: {
      resolveExtensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    optimizePackageImports: [
      "recharts",
      "lucide-react",
      "@radix-ui/react-icons",
      "@radix-ui/react-avatar",
      "@radix-ui/react-select",
      "date-fns",
      ...INTERNAL_PACKAGES,
    ],
  },
  modularizeImports: {
    lodash: {
      transform: "lodash/{{member}}",
    },
  },
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default withPWA(config);

function getRemotePatterns() {
  /** @type {import('next').NextConfig['remotePatterns']} */
  const remotePatterns = [];

  if (DB_URL) {
    const hostname = new URL(DB_URL).hostname;

    remotePatterns.push({
      protocol: "https",
      hostname,
    });
  }

  return IS_PRODUCTION
    ? remotePatterns
    : [
        {
          protocol: "http",
          hostname: "127.0.0.1",
        },
        {
          protocol: "http",
          hostname: "localhost",
        },
      ];
}

async function getRedirects() {
  return [
    {
      source: "/server-sitemap.xml",
      destination: "/sitemap.xml",
      permanent: true,
    },
  ];
}
