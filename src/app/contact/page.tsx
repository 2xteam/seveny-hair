import type { Metadata } from "next";
import { IconCalendar, IconHome, IconInstagram, IconPhone } from "@/components/Icons";
import { LINKS } from "@/content/defaults";
import { getPage, getShop } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getPage("contact")).title };
}

/** 원본 /kontakt — 왼쪽 연락처·영업시간, 오른쪽 50vw × 100vh 사진. 푸터 없음 */
export default async function ContactPage() {
  const [shop, page] = await Promise.all([getShop(), getPage("contact")]);

  return (
    <div id="Hero" className="hero-split">
      <div className="hero-split-content">
        <div className="contact-block">
          <h1 className="heading kontakt">
            {shop.name} {shop.nameSuffix}
          </h1>
          <div className="contact-row">
            <IconHome />
            <a className="contact-text" href={LINKS.map} target="_blank" rel="noreferrer">
              {shop.address.street}
              <br />
              {shop.address.zip}
              <br />
              4호선 충렬사역 3번 출구 도보 6분
            </a>
          </div>
          <div className="contact-row">
            <IconPhone size={20} />
            <a href={shop.phoneHref}>{shop.phone}</a>
          </div>
          <div className="contact-row">
            <IconCalendar size={20} />
            <a href={shop.bookingUrl} target="_blank" rel="noreferrer">
              네이버로 예약하기
            </a>
          </div>
        </div>
        <div className="contact-block">
          <h1 className="heading kontakt">{page.hero.heading}</h1>
          <div className="hours-grid kontakt">
            {shop.hours.map((h) => (
              <div key={h.days} style={{ display: "contents" }}>
                <div className="oeffnung-links">{h.days}</div>
                <div className="oeffnung">
                  {h.lines.map((l, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="split-image" style={{ "--bg": `url("${page.hero.image}")` } as React.CSSProperties}>
        <div className="social-contact">
          <a href={shop.instagram.url} target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
            <IconInstagram size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
