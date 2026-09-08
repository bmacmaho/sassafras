/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/current-issue",
        destination: "/latest-issue",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
