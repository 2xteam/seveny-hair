import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 좌측 하단 개발 표시기가 메뉴 버튼을 가린다
  devIndicators: false,
  images: {
    // 클론 단계에서만 쓰는 타겟 사이트 CDN. seveny hair 이미지(R2)로 바꾸면 지운다.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.prod.website-files.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
