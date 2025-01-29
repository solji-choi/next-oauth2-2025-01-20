import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true, // svg 이미지도 허용하도록 설정
    domains: ["k.kakaocdn.net", "img1.kakaocdn.net", "placehold.co"],
    contentSecurityPolicy: "default-src 'self'; img-src 'self' data: https:;", // 보안설정
  },
};

export default nextConfig;
