/** "\n" 을 <br/> 로 바꿔 그린다 (원본 제목의 강제 줄바꿈) */
export function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
    </>
  );
}
