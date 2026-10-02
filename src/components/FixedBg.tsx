/**
 * 고정 배경 — 원본의 `background-attachment: fixed` 를 모바일에서도 같게 보이게 한다.
 *
 * - PC(마우스): 레이어가 섹션을 덮고 background-attachment: fixed (원본과 동일)
 * - 터치 기기: 화면 높이 레이어를 position: sticky 로 섹션 안에 붙인다.
 *   모바일 브라우저는 fixed 배경을 무시하고, "fixed 레이어 + clip" 은 iOS 가 스크롤 중에
 *   늦게 그려서 비었다가 나타났다. sticky 는 스크롤과 같은 단계에서 그려진다.
 *
 * 규칙은 globals.css 의 .fixed-bg / .fixed-bg-layer. 부모 섹션에 .has-fixed-bg 를 붙인다.
 */
export default function FixedBg({ image, overlay }: { image: string; overlay: string }) {
  return (
    <div className="fixed-bg" aria-hidden="true">
      <div
        className="fixed-bg-layer"
        style={{ backgroundImage: `linear-gradient(${overlay}, ${overlay}), url("${image}")` }}
      />
    </div>
  );
}
