import type { Metadata } from "next";
import { KEYWORDS, ROUTES, SITE_NAME } from "@/content/seo";

/**
 * 라우트 메타데이터. 공유 이미지는 같은 폴더의 opengraph-image.tsx 가 자동으로 붙인다.
 * (metadataBase · 기본 og/twitter 값은 app/layout.tsx)
 */
export function routeMetadata(key: keyof typeof ROUTES): Metadata {
  const r = ROUTES[key];
  const isHome = r.path === "/";
  return {
    title: isHome ? { absolute: r.title } : r.title,
    description: r.description,
    keywords: KEYWORDS,
    alternates: { canonical: r.path },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: SITE_NAME,
      url: r.path,
      title: isHome ? r.title : `${r.title} | ${SITE_NAME}`,
      description: r.description,
    },
    twitter: {
      card: "summary_large_image",
      title: isHome ? r.title : `${r.title} | ${SITE_NAME}`,
      description: r.description,
    },
  };
}
