import type { Metadata } from "next";
import Preloader from "@/components/Preloader";
import ScrollEffects from "@/components/ScrollEffects";
import SiteNav from "@/components/SiteNav";
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

export async function generateMetadata(): Promise<Metadata> {
  const shop = await getShop();
  return {
    title: "SEVENY HAIR 세브니헤어 — 동래 1인 헤어살롱",
    description: `부산 동래 충렬사로의 1인 헤어살롱. 상담부터 커트·펌·컬러까지 ${shop.owner}가 직접 시술합니다. 우선 예약제.`,
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
