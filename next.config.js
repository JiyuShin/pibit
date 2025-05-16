/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
      },
    });
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    return config;
  },
  transpilePackages: ['three'],
};

module.exports = nextConfig; 