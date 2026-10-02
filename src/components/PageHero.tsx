/** 하위 페이지 상단 히어로 (원본 .section.about-v1-hero). 배경은 고정, 아래로 어두워지는 그라데이션 */
export default function PageHero({ heading, image, position }: { heading: string; image: string; position?: string }) {
  return (
    <div
      id="Hero"
      className="section page-hero"
      style={{ "--bg": `url("${image}")`, "--pos": position ?? "50%" } as React.CSSProperties}
    >
      <h1 className="hero-big-heading">{heading}</h1>
    </div>
  );
}
