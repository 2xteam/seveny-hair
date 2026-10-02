"use client";

import { useCallback, useEffect, useState } from "react";
import type { Style } from "@/content/styles";

/**
 * Style book — 네이버 플레이스 "스타일 정보" 26개.
 * 카드 모양은 원본 블로그 카드(.post-card-v3), 누르면 그 스타일의 사진을 넘겨 보는 라이트박스.
 * 여자/남자 필터는 원본 Angebot 탭 버튼과 같은 모양.
 */
const FILTERS = [
  { key: "all", label: "전체" },
  { key: "f", label: "여성" },
  { key: "m", label: "남성" },
] as const;

export default function StyleBook({ styles }: { styles: Style[] }) {
  const [filter, setFilter] = useState<"all" | "f" | "m">("all");
  const [open, setOpen] = useState<{ style: Style; index: number } | null>(null);
  const shown = styles.filter((s) => filter === "all" || s.gender === filter);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) =>
      setOpen((o) => (o ? { ...o, index: (o.index + d + o.style.images.length) % o.style.images.length } : o)),
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <>
      <div className="tabs-menu">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`tabs-button${filter === f.key ? " is-current" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="blog-posts style-book" role="list">
        {shown.map((s) => (
          <div key={s.num} className="blog-post-v3" role="listitem">
            <button type="button" className="post-card-v3 style-card" onClick={() => setOpen({ style: s, index: 0 })}>
              <div className="post-card-info-v3">
                <h4 className="post-card-v3-heading">{s.title}</h4>
                <div className="link-v2 white-link">
                  {s.category}
                  {s.images.length > 1 ? ` · 사진 ${s.images.length}장` : ""}
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.images[0].src} alt={s.title} loading="lazy" className="zoom-image" />
            </button>
          </div>
        ))}
      </div>

      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={open.style.title} onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={open.style.images[open.index].src} alt={open.style.title} onClick={(e) => e.stopPropagation()} />
          <p className="lb-caption">
            {open.style.title}
            {open.style.images.length > 1 && ` — ${open.index + 1} / ${open.style.images.length}`}
          </p>
          <button type="button" className="lb-close" aria-label="닫기" onClick={close}>
            ×
          </button>
          {open.style.images.length > 1 && (
            <>
              <button
                type="button"
                className="lb-prev"
                aria-label="이전"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className="lb-next"
                aria-label="다음"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
