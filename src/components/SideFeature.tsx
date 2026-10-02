import Link from "next/link";
import type { Section } from "@/lib/types";
import { Lines } from "./Lines";

/**
 * 이미지 두 장이 겹친 2단 블록 (원본 .side-feature).
 * media-left : 이미지(오른쪽에서 +60px 등장, a-8) + 텍스트(왼쪽에서 -60px 등장, a-9)
 * media-right: 텍스트(a-8) + 이미지(a-9). 모바일(≤991)에서는 이미지가 텍스트 위로 온다.
 * 앞쪽 사진은 스크롤 패럴랙스(a-12)를 탄다.
 */
export default function SideFeature({ section }: { section: Section }) {
  const [back, front] = section.images ?? [];
  const mediaLeft = section.layout !== "media-right";

  const media = (cls: string, reveal: "left" | "right" | undefined, backSide: "left" | "right") => (
    <div className={`side-media ${cls}`} data-reveal={reveal}>
      {back && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={back.src} alt={back.alt ?? ""} className={`side-image-back ${backSide}`} />
      )}
      {front && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={front.src}
          alt={front.alt ?? ""}
          className={`side-image-float ${backSide === "left" ? "right" : "left"}`}
          data-float
        />
      )}
    </div>
  );

  const info = (reveal: "left" | "right") => (
    <div className="side-info" data-reveal={reveal}>
      {section.heading && (
        <h2 className="heading">
          <Lines text={section.heading} />
        </h2>
      )}
      {section.body?.map((p, i) => (
        <p key={i} className="paragraph">
          {p}
        </p>
      ))}
      {section.cta?.map((c) => (
        <Link key={c.href} href={c.href} className="button ghost-button">
          {c.label}
        </Link>
      ))}
    </div>
  );

  return (
    <div className="side-feature">
      {mediaLeft ? (
        <>
          {media("", "left", "left")}
          {info("right")}
        </>
      ) : (
        <>
          {media("only-mobile", undefined, "right")}
          {info("left")}
          {media("only-desktop", "right", "right")}
        </>
      )}
    </div>
  );
}
