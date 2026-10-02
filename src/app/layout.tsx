import type { Metadata } from "next";
import { Bodoni_Moda, Jost, Noto_Serif_KR, Oswald, Pinyon_Script } from "next/font/google";
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
const futura = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-futura",
  display: "swap",
});
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bodoni",
  display: "swap",
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-oswald",
  display: "swap",
});

const script = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const serifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-serif-kr",
  display: "swap",
  preload: false, // 한글 서브셋이 커서 미리 받지 않는다
});

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
    <html
      lang="ko"
      className={`${futura.variable} ${bodoni.variable} ${oswald.variable} ${script.variable} ${serifKr.variable}`}
    >
      <head>
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
