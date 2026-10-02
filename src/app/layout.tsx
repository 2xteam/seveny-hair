import type { Metadata, Viewport } from "next";
import Preloader from "@/components/Preloader";
import ScrollEffects from "@/components/ScrollEffects";
import SiteNav from "@/components/SiteNav";
import { LINKS } from "@/content/defaults";
import { PHOTOS } from "@/content/photos";
import { KEYWORDS, ROUTES, SITE_NAME, siteUrl } from "@/content/seo";
import { getShop } from "@/lib/queries";
import "./globals.css";
import "./subpages.css";

/*
 * 원본 폰트(Adobe Fonts)의 무료 대체:
 *   futura-pt 300/400/500/600 (+300 italic) → Jost
 *   bodoni-urw 300                          → Bodoni Moda (400 이 가장 가는 굵기)
 *   Oswald 400/500                          → Oswald (동일)
 *   p22-cezanne-pro (서명)                   → Pinyon Script
 *
 * 한글은 영문 폰트 뒤에 이어 붙여 글자 단위로 대체된다 (영문은 Jost/Bodoni, 한글만 아래 폰트).
 *   본문(futura 계열) → Pretendard (CDN 동적 서브셋, 300 위주)
 *   제목(bodoni 계열) → Noto Serif KR 300
 */
/**
 * 폰트는 빌드 때 받지 않고 브라우저가 Google Fonts 에서 직접 받는다.
 * next/font/google 은 빌드 중에 폰트 파일(특히 Noto Serif KR 248개)을 내려받다가
 * 캐시 없는 빌드(Vercel)에서 간헐적으로 실패했다 (2026-10-02).
 * 변수 이름(--font-futura 등)은 globals.css 의 :root 에서 정의한다.
 */
const GOOGLE_FONTS =
  "https://fonts.googleapis.com/css2" +
  "?family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300" +
  "&family=Bodoni+Moda:wght@400" +
  "&family=Oswald:wght@400;500" +
  "&family=Pinyon+Script" +
  "&family=Noto+Serif+KR:wght@300;400" +
  "&display=swap";

export const dynamic = "force-dynamic";

/** 공통 메타데이터 — 라우트마다 lib/seo.ts 의 routeMetadata 가 덮어쓴다 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: ROUTES.home.title, template: `%s | ${SITE_NAME}` },
  description: ROUTES.home.description,
  applicationName: SITE_NAME,
  keywords: KEYWORDS,
  authors: [{ name: "Seveny" }],
  formatDetection: { telephone: true, address: true },
  openGraph: { type: "website", locale: "ko_KR", siteName: SITE_NAME },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#111111" };

/**
 * 검색엔진용 매장 정보 (schema.org HairSalon). 네이버 플레이스 기준 값.
 * 리뷰 평점은 넣지 않는다 — 자기 사이트에 올린 자체 리뷰 평점은 구글이 리치 결과에서 제외한다.
 */
function salonJsonLd() {
  const url = siteUrl();
  const day = (d: string[], opens: string, closes: string) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: d,
    opens,
    closes,
  });
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${url}/#salon`,
    name: "세브니헤어",
    alternateName: "SEVENY HAIR",
    url,
    image: [PHOTOS.interior, PHOTOS.interiorWide, PHOTOS.signWall],
    logo: `${url}/icon.svg`,
    description: ROUTES.home.description,
    telephone: "+82-507-1351-8646",
    priceRange: "₩18,000 – ₩140,000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "충렬사로 38, 1층",
      addressLocality: "동래구",
      addressRegion: "부산광역시",
      addressCountry: "KR",
    },
    geo: { "@type": "GeoCoordinates", latitude: 35.2024218, longitude: 129.0979297 },
    hasMap: LINKS.map,
    openingHoursSpecification: [
      day(["Monday", "Wednesday", "Friday", "Saturday", "Sunday"], "10:00", "20:00"),
      day(["Thursday"], "10:00", "17:00"),
    ],
    sameAs: [LINKS.instagram, LINKS.blog, LINKS.youtube, LINKS.naverPlace],
    potentialAction: { "@type": "ReserveAction", target: LINKS.booking },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const shop = await getShop();
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href={GOOGLE_FONTS} />
        {/* Pretendard — 한글 본문. next/font 에 없어 공식 CDN 의 동적 서브셋을 쓴다 */}
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(salonJsonLd()) }}
        />
        <Preloader />
        <SiteNav
          name={shop.name}
          nameSuffix={shop.nameSuffix}
          byline={shop.byline}
          nav={shop.nav}
        />
        <div className="page-wrapper">{children}</div>
        <ScrollEffects />
      </body>
    </html>
  );
}
