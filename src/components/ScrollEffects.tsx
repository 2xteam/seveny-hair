"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * 페이지 전체의 스크롤 효과를 한곳에서 건다.
 *
 * [data-reveal="up|left|right"] — 원본 IX2 SCROLL_INTO_VIEW (Slide Up/Left/Right).
 *   60px 떨어진 곳에서 opacity 0 → 이동 1000ms / opacity 800ms (ease), 한 번만 재생.
 *   지연은 data-reveal-delay (ms): Slide Up 2 = 300, Slide Up 3 = 600.
 *
 * [data-float] — 원본 a-12 "Floated on Scroll" (SCROLLING_IN_VIEW, smoothing 50).
 *   요소가 화면 아래에서 들어오기 시작할 때 0%, 위로 완전히 나갈 때 100%.
 *   translateY 는 -16% → +16% (요소 자신의 높이 기준). 매 프레임 남은 거리의 절반씩 따라간다.
 */
export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── 등장 효과
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)"));
    revealEls.forEach((el) => {
      const d = el.dataset.revealDelay;
      if (d) el.style.setProperty("--reveal-delay", `${d}ms`);
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0 },
    );
    revealEls.forEach((el) => (reduce ? el.classList.add("is-revealed") : io.observe(el)));

    // ── 떠 있는 이미지
    const floats = Array.from(document.querySelectorAll<HTMLElement>("[data-float]")).map((el) => ({
      el,
      current: Number.NaN,
    }));
    let raf = 0;
    const SMOOTH = 0.5; // IX2: max(1 - smoothing/100, 0.01)

    const target = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      return -16 + 32 * p;
    };

    const tick = () => {
      let moving = false;
      for (const f of floats) {
        const t = target(f.el);
        if (Number.isNaN(f.current)) f.current = t;
        else f.current += (t - f.current) * SMOOTH;
        if (Math.abs(t - f.current) > 0.01) moving = true;
        else f.current = t;
        f.el.style.transform = `translate3d(0, ${f.current.toFixed(3)}%, 0)`;
      }
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    if (floats.length && !reduce) {
      tick();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return null;
}
