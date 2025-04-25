/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    swcPlugins: [["superjson-next", { router: "PAGE" }]],
  },
};

export default nextConfig;
