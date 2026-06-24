/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    swcPlugins: [["superjson-next", { router: "PAGE" }]],
    optimizePackageImports: ["@chakra-ui/react"],
  },
  async redirects() {
    return [
      {
        source: "/shop",
        destination: "/vereinsausstattung",
        permanent: true,
      },
      {
        source: "/shop/checkout",
        destination: "/vereinsausstattung/checkout",
        permanent: true,
      },
      {
        source: "/shop/success",
        destination: "/vereinsausstattung/success",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
