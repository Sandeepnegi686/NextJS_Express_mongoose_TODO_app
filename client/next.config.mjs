/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // enables static export
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
