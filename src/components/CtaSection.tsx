import type { Section, Shop } from "@/lib/types";
import FixedBg from "./FixedBg";

/** 고정 배경 이미지 위 예약 유도 영역 (원본 .section.image-2, background-attachment: fixed) */
export default function CtaSection({ section, shop }: { section: Section; shop: Shop }) {
  const bg = section.images?.[0]?.src;
  return (
    <div className="section image-cta has-fixed-bg">
      {bg && <FixedBg image={bg} overlay="#1119" />}
      <div className="section-intro no-margin-bottom">
        {section.kicker && <div className="cta-kicker">{section.kicker}</div>}
        {section.heading && <h2 className="heading">{section.heading}</h2>}
        {section.body?.map((p, i) => (
          <p key={i} className="paragraph text-white middle">
            {p}
          </p>
        ))}
        <a href={shop.phoneHref} className="button ghost-white-button">
          {shop.phone}
        </a>
        <a href={shop.bookingUrl} target="_blank" rel="noreferrer" className="button ghost-white-button solid">
          예약하기
        </a>
      </div>
    </div>
  );
}
