// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 이미지 호스트를 허용하는 설정을 추가합니다.
  images: {
    domains: ['utfs.io'], // 사용할 이미지 호스트를 추가합니다.
  },
  
  webpack: (config) => {
    // node_modules에서 .mjs 파일을 JavaScript 모듈로 처리하도록 설정합니다.
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
};

module.exports = nextConfig;
