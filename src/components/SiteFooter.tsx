import Link from "next/link";
import { LINKS } from "@/content/defaults";
import type { Shop } from "@/lib/types";
import { IconBlog, IconCalendar, IconCard, IconCash, IconInstagram, IconPhone, IconZeroPay } from "./Icons";

const PAY_ICON: Record<string, React.ReactNode> = {
  card: <IconCard />,
  cash: <IconCash />,
  zeropay: <IconZeroPay />,
};

/** 푸터 내용 — 홈형(.footer-v2)과 글 상세의 반쪽 푸터(.split-footer)가 같이 쓴다 */
export function FooterColumns({ shop }: { shop: Shop }) {
  return (
    <>
      <div className="footer-v2-about">
        <h6 className="footer-v2-heading">
          {shop.name} {shop.nameSuffix}
        </h6>
        <p className="paragraph">
          {shop.address.street}
          <br />
          {shop.address.zip}
        </p>
        <div className="footer-v2-contact">
          <IconPhone />
          <a href={shop.phoneHref} className="footer-v2-email">
            {shop.phone}
          </a>
        </div>
        <div className="footer-v2-contact">
          <IconInstagram />
          <a href={shop.instagram.url} target="_blank" rel="noreferrer" className="footer-v2-email">
            {shop.instagram.handle}
          </a>
        </div>
        <div className="footer-v2-contact">
          <IconCalendar />
          <a href={shop.bookingUrl} target="_blank" rel="noreferrer" className="footer-v2-email">
            네이버 예약
          </a>
        </div>
        <div className="footer-v2-contact">
          <IconBlog />
          <a href={LINKS.blog} target="_blank" rel="noreferrer" className="footer-v2-email">
            네이버 블로그
          </a>
        </div>
      </div>

      <div className="footer-v2-follow">
        <h6 className="footer-v2-heading">OPENING HOURS</h6>
        <div className="hours-grid">
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

      <div className="footer-v2-contacts">
        <h6 className="footer-v2-heading">PAYMENT</h6>
        <div className="payments">
          {shop.payments.map((p) => (
            <div key={p.label} className="payment">
              {PAY_ICON[p.icon] ?? null}
              <p className="paragraph">{p.label}</p>
            </div>
          ))}
        </div>
        <p className="paragraph-small">{shop.paymentNote}</p>
      </div>

      <div className="footer-bottom-v2">
        <div className="footer-bottom-left">
          <p className="paragraph-small">
            {shop.copyright} |{" "}
            <Link href="/imprint" className="link-v2 paragraph-small">
              사업자 정보
            </Link>
          </p>
        </div>
        <div className="footer-bottom-right">
          <p className="paragraph-small">{shop.credit}</p>
        </div>
      </div>
    </>
  );
}

/** 원본 .footer-v2 — 주소·연락처 / 영업시간 / 결제수단 3열 + 하단 저작권 */
export default function SiteFooter({ shop }: { shop: Shop }) {
  return (
    <footer className="section no-padding-vertical">
      <div className="wrapper">
        <div className="footer-v2">
          <FooterColumns shop={shop} />
        </div>
      </div>
    </footer>
  );
}
