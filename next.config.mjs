/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "s3.us-west-2.amazonaws.com",
      "www.google.com",
      "images-ctf.baslerweb.com",
      "graduate.northeastern.edu",
      "img.freepik.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
};

export default nextConfig;
