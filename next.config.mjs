/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  // The old "AI Creative" service is now "Creative Studio"
  async redirects() {
    return [{ source: "/services/ai", destination: "/services/creative-studio", permanent: true }];
  },
};

export default nextConfig;
