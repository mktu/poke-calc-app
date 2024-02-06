/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'zukan.pokemon.co.jp',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
