"use client";

import { Fragment, useRef, useState } from "react";
import type { Service } from "@/lib/types";

const OUT_MS = 100; // data-duration-out
/**
 * Angebot 가격표 탭 (원본 w-tabs: 나갈 때 100ms, 들어올 때 300ms 페이드).
 * 같은 탭의 표들을 order 순으로 이어 그린다.
 */
export default function PriceTabs({ tables }: { tables: Service[] }) {
  const tabs = Array.from(new Set(tables.map((t) => t.tab)));
  const [current, setCurrent] = useState(tabs[0]);
  const [hidden, setHidden] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const select = (tab: string) => {
    if (tab === current) return;
    window.clearTimeout(timer.current);
    setHidden(true);
    timer.current = window.setTimeout(() => {
      setCurrent(tab);
      requestAnimationFrame(() => setHidden(false));
    }, OUT_MS);
  };

  const shown = tables.filter((t) => t.tab === current).sort((a, b) => a.order - b.order);

  return (
    <div className="tabs">
      <div className="tabs-menu" role="tablist">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={t === current}
            className={`tabs-button${t === current ? " is-current" : ""}`}
            onClick={() => select(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className={`tab-pane${hidden ? " is-hidden" : ""}`} role="tabpanel">
        {shown.map((table, ti) => {
          const n = table.columns.length;
          const hasHead = table.columns.some((c) => c);
          return (
            <Fragment key={ti}>
              {table.heading && (
                <div>
                  <h2 className="price-heading">{table.heading}</h2>
                </div>
              )}
              <div className={`price-grid cols-${n}`}>
                {hasHead &&
                  table.columns.map((c, i) => (
                    <p key={`h${i}`} className={i === 0 ? "angebot-service price-head" : "angebot-service price-head"}>
                      {c}
                    </p>
                  ))}
                {table.rows.map((row, ri) => (
                  <Fragment key={ri}>
                    <p className={`angebot-service${row.note ? " is-note" : ""}`}>{row.label}</p>
                    {Array.from({ length: n - 1 }, (_, pi) => (
                      <p key={pi} className={`preis-angebot${row.note ? " is-note" : ""}`}>
                        {row.prices[pi] ?? ""}
                      </p>
                    ))}
                  </Fragment>
                ))}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
