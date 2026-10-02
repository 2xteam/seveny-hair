/**
 * 고정 배경 — 원본의 `background-attachment: fixed` 를 모바일에서도 같게 보이게 한다.
 *
 * iOS Safari·대부분의 안드로이드 브라우저는 background-attachment: fixed 를 무시하고
 * 배경을 "섹션 전체 높이"에 cover 로 맞춘다. 키가 큰 섹션(Milestones 등)은 그림이 크게 확대돼 보인다.
 *
 * 대신 화면 크기만 한 position: fixed 레이어를 두고, 부모를 clip 으로 잘라 섹션 영역만 보여준다.
 * (fixed 자식은 overflow 로는 안 잘리지만 clip / clip-path 로는 잘린다 — iOS 포함)
 * 부모 섹션은 .has-fixed-bg 로 쌓임 맥락을 만들고, 이 레이어는 그 맨 아래에 깔린다.
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
