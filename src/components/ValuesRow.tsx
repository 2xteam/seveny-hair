import type { Section } from "@/lib/types";

/**
 * 가치 4열 (원본 .column-nachhaltigkeit). 열마다 Slide Up 1 등장.
 * spaced: 앞 섹션이 어두운 띠일 때(The Salon) 원본처럼 위 여백을 둔다.
 * 홈은 앞이 흰 섹션이라 원본대로 위 여백 없이 붙인다.
 */
export default function ValuesRow({ items, spaced = false }: { items: NonNullable<Section["items"]>; spaced?: boolean }) {
  return (
    <div className={`section green-gradient${spaced ? "" : " no-padding-top"}`}>
      <div className="wrapper">
        <div className="values-row">
          {items.map((v) => (
            <div key={v.title} className="values-col" data-reveal="up">
              {v.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={v.image.src} alt="" loading="lazy" />
              )}
              <h2 className="heading-13">{v.title}</h2>
              <div className="paragraph pb20">{v.body}</div>
              {v.link && (
                <a href={v.link.href} target="_blank" rel="noreferrer" className="button ghost-button">
                  {v.link.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
