"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/types";
import { IconArrowLeft, IconArrowRight, QuoteMark } from "./Icons";

type Props = {
  heading: string;
  items: Testimonial[];
  meta?: { label: string; href: string };
};

const DURATION = 600; // data-duration="600", easing ease

/**
 * Webflow w-slider 재현 (data-animation="slide", data-infinite="true", autoplay 없음).
 * 무한 루프는 앞뒤에 복제 슬라이드를 하나씩 두고, 끝에 닿으면 전환 없이 제자리로 점프한다.
 */
export default function TestimonialSlider({ heading, items, meta }: Props) {
  const n = items.length;
  const slides = n > 1 ? [items[n - 1], ...items, items[0]] : items;
  const [pos, setPos] = useState(n > 1 ? 1 : 0);
  const [animate, setAnimate] = useState(true);
  const busy = useRef(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      if (busy.current || n < 2) return;
      busy.current = true;
      setAnimate(true);
      setPos(next);
    },
    [n],
  );

  useEffect(() => {
    if (!busy.current) return;
    const t = window.setTimeout(() => {
      busy.current = false;
      if (pos === 0 || pos === n + 1) {
        setAnimate(false);
        setPos(pos === 0 ? n : 1);
      }
    }, DURATION);
    return () => window.clearTimeout(t);
  }, [pos, n]);

  useEffect(() => {
    if (animate) return;
    const r = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(r);
  }, [animate]);

  const active = n > 1 ? (pos - 1 + n) % n : 0;

  return (
    <div className="testimonials-v1" role="region" aria-roledescription="carousel" aria-label={heading.replace("\n", " ")}>
      <h2 className="testimonials-v1-heading">
        {heading.split("\n").map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </h2>
      <div
        className="slider-mask"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? pos + 1 : pos - 1);
        }}
      >
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${pos * 100}%)`,
            transition: animate ? undefined : "none",
          }}
        >
          {slides.map((t, i) => (
            <div key={i} className="slide" aria-hidden={i !== pos}>
              <div className="review-v1">
                <QuoteMark className="quote-mark" />
                <div className="review-v1-avatar-wrapper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt="" className="review-v1-avatar" />
                </div>
                <div className="review-v1-content">
                  <h4 className="post-card-v3-heading">{t.name}</h4>
                  <p className="review-v1-text">{t.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="testimonials-arrows">
        <button type="button" className="testimonials-v1-arrow" aria-label="이전" onClick={() => go(pos - 1)}>
          <IconArrowLeft size={22} />
        </button>
        <button type="button" className="testimonials-v1-arrow right" aria-label="다음" onClick={() => go(pos + 1)}>
          <IconArrowRight size={22} />
        </button>
      </div>
      {meta && (
        <p className="review-meta">
          <a href={meta.href} target="_blank" rel="noreferrer">
            {meta.label}
          </a>
        </p>
      )}
      <div className="testimonials-nav">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            className={i === active ? "is-active" : undefined}
            onClick={() => go(i + 1)}
          />
        ))}
      </div>
    </div>
  );
}
