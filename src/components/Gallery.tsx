"use client";

import { useCallback, useEffect, useState } from "react";

type Cell = { src: string; area: string; pos?: string; size?: string; grow?: boolean };

/**
 * Das Haarlokal 갤러리. 데스크톱(3열 그리드, 스크롤 등장)과 모바일(2열, ≤767)을 둘 다 그리고
 * CSS 로 하나만 보인다. 칸을 누르면 같은 묶음 안에서 넘겨 보는 라이트박스가 열린다.
 */
export default function Gallery({ desktop, mobile }: { desktop: Cell[]; mobile: Cell[] }) {
  const [open, setOpen] = useState<{ group: Cell[]; index: number } | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((o) => (o ? { ...o, index: (o.index + d + o.group.length) % o.group.length } : o)),
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

  const cells = (group: Cell[]) =>
    group.map((c, i) => (
      <div key={i} className={`gallery-cell${c.grow ? " grow" : ""}`} style={{ gridArea: c.area }}>
        <div
          className="gallery-bg"
          style={{ "--bg": `url("${c.src}")`, "--pos": c.pos ?? "50%", "--size": c.size ?? "cover" } as React.CSSProperties}
        />
        <button type="button" aria-label={`사진 ${i + 1} 크게 보기`} onClick={() => setOpen({ group, index: i })} />
      </div>
    ));

  return (
    <>
      <div className="gallery-mobile">{cells(mobile)}</div>
      <div className="section gallery-section" data-reveal="up">
        <div className="wrapper">
          <div className="gallery-grid">{cells(desktop)}</div>
        </div>
      </div>

      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={open.group[open.index].src} alt="" onClick={(e) => e.stopPropagation()} />
          <button type="button" className="lb-close" aria-label="닫기" onClick={close}>
            ×
          </button>
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
        </div>
      )}
    </>
  );
}
