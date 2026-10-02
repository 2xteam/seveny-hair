"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { LinkRef } from "@/lib/types";
import Logo from "./Logo";

/** 원본 a-31(닫기) 첫 그룹이 끝나는 시점: 600ms 지연 + 800ms */
const CLOSE_TOTAL_MS = 1400;

type MenuState = "closed" | "mounting" | "open" | "closing";

type Props = {
  name: string;
  nameSuffix: string;
  byline: string;
  nav: LinkRef[];
};

/**
 * 좌측 고정 내비 (데스크톱) / 상단바 (≤991px).
 * - 데스크톱: 큰 세로 로고 + 누운 타이틀 + 하단 "Menü" 버튼 → 전체화면 메뉴
 * - 태블릿·모바일: 작은 가로 로고 + 가운데 타이틀 + 햄버거 → 드롭다운
 */
export default function SiteNav({ name, nameSuffix, byline, nav }: Props) {
  const pathname = usePathname();
  const [menu, setMenu] = useState<MenuState>("closed");
  const [dropdown, setDropdown] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  const openMenu = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setMenu("mounting");
    // display:flex 가 적용된 다음 프레임에 전환을 시작해야 opacity 전환이 보인다
    requestAnimationFrame(() => requestAnimationFrame(() => setMenu("open")));
  }, []);

  const closeMenu = useCallback(() => {
    setMenu("closing");
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu("closed"), CLOSE_TOTAL_MS);
  }, []);

  const toggleMenu = () => (menu === "open" || menu === "mounting" ? closeMenu() : openMenu());

  // 페이지가 바뀌면 메뉴를 닫는다 (원본은 새로고침이라 항상 닫힌 상태로 시작)
  useEffect(() => {
    window.clearTimeout(closeTimer.current);
    setMenu("closed");
    setDropdown(false);
  }, [pathname]);

  useEffect(() => {
    if (menu === "closed") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu, closeMenu]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="nav-bar-left" data-menu={menu} role="banner">
      <Link href="/" className="brand" aria-label={`${name} ${nameSuffix}`}>
        <Logo className="brand-logo" />
      </Link>

      <div className="nav-info">
        <h2 className="nav-info-heading">
          {name} <span>{nameSuffix}</span>
        </h2>
        <div className="nav-info-description">{byline}</div>
      </div>

      {/* ≤991px 드롭다운 */}
      <button
        type="button"
        className={`menu-button${dropdown ? " is-open" : ""}`}
        aria-label="Menu"
        aria-expanded={dropdown}
        onClick={() => setDropdown((v) => !v)}
      >
        <span className="nav-icon" aria-hidden="true" />
      </button>
      <div className={`nav-overlay${dropdown ? " is-open" : ""}`}>
        <nav className="nav-menu-left" aria-label="Main navigation">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* 데스크톱 전체화면 메뉴. "Menü" 의 ü 는 원본 디자인 포인트라 영어화에서도 남긴다 */}
      <button
        type="button"
        className="full-screen-menu-button"
        aria-expanded={menu === "open"}
        aria-controls="full-screen-menu"
        onClick={toggleMenu}
      >
        <span className="menu-label">Menü</span>
        <span className="menu-button-line top-line" />
        <span className="menu-button-line middle-line" />
        <span className="menu-button-line bottom-line" />
        <span className="menu-close-text">Close</span>
      </button>
      <div id="full-screen-menu" className="full-screen-menu" aria-hidden={menu === "closed"}>
        <div className="full-screen-menu-list">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`full-screen-menu-link${isCurrent(l.href) ? " is-current" : ""}`}
              onClick={closeMenu}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
