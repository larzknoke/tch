/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    swcPlugins: [["superjson-next", { router: "PAGE" }]],
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
