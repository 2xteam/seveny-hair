"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Logo from "./Logo";

const EASE = "cubic-bezier(0.25, 0.1, 0.25, 1)";
/** 이미지가 늦게 와도 덮개가 이 시간 이상 머무르지 않게 한다 */
const MAX_WAIT_MS = 2500;

/**
 * 원본 IX2 a-2 / a-3 재현 — 흰 종이가 왼쪽에서 오른쪽으로 넘어가며 페이지를 드러낸다.
 *  1) 페이지 로드 완료 → 로딩 아이콘 opacity 1→0 (600ms, ease)
 *  2) 이어서 덮개 translateX 0 → 125% (2400ms, ease)
 * 라우트가 바뀌면 덮개를 즉시 다시 씌우고 같은 순서로 걷어낸다 (원본은 매번 전체 새로고침).
 */
export default function Preloader() {
  const coverRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    const cover = coverRef.current;
    const img = iconRef.current;
    if (!cover || !img) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cover.style.transform = "translateX(125%)";
      return;
    }

    let cancelled = false;
    const anims: Animation[] = [];
    cover.getAnimations().forEach((a) => a.cancel());
    img.getAnimations().forEach((a) => a.cancel());
    cover.style.transform = "translateX(0)";
    img.style.opacity = "1";

    const run = () => {
      if (cancelled) return;
      const fade = img.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 600,
        easing: EASE,
        fill: "forwards",
      });
      anims.push(fade);
      fade.finished
        .then(() => {
          if (cancelled) return;
          const slide = cover.animate(
            [{ transform: "translateX(0)" }, { transform: "translateX(125%)" }],
            { duration: 2400, easing: EASE, fill: "forwards" },
          );
          anims.push(slide);
        })
        .catch(() => {});
    };

    let timer: number | undefined;
    if (firstRun.current && document.readyState !== "complete") {
      const onLoad = () => {
        window.clearTimeout(timer);
        run();
      };
      window.addEventListener("load", onLoad, { once: true });
      timer = window.setTimeout(() => {
        window.removeEventListener("load", onLoad);
        run();
      }, MAX_WAIT_MS);
    } else {
      // 클라이언트 라우팅: 새 페이지가 그려진 다음 프레임에 시작
      timer = window.setTimeout(run, firstRun.current ? 0 : 120);
    }
    firstRun.current = false;

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      anims.forEach((a) => a.cancel());
    };
  }, [pathname]);

  return (
    <div ref={coverRef} className="preloader" aria-hidden="true">
      {/* 원본의 로딩 GIF 자리 — 작은 로고가 숨 쉬듯 깜빡인다 */}
      <div ref={iconRef} className="preloader-icon">
        <Logo />
      </div>
    </div>
  );
}
