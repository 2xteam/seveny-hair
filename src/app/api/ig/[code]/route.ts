import { IG_CODE_RE } from "@/content/instagram";

/**
 * 인스타그램 게시물 이미지 프록시.
 *
 * instagram.com/p/{code}/media/?size=l 은 항상 최신 CDN 주소로 302 를 준다.
 * 브라우저가 그 CDN 을 직접 부르면 cross-origin-resource-policy: same-origin 으로 막히므로
 * 서버가 받아서 우리 출처로 내려준다. Vercel CDN 이 하루 캐시한다.
 */
export const runtime = "nodejs";

const memory = new Map<string, { at: number; type: string; body: ArrayBuffer }>();
const MEMORY_TTL = 60 * 60 * 1000;
const MEMORY_MAX = 80;

export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  if (!IG_CODE_RE.test(code)) return new Response("bad code", { status: 400 });
  const size = new URL(req.url).searchParams.get("size") === "m" ? "m" : "l";
  const key = `${code}:${size}`;

  const hit = memory.get(key);
  if (hit && Date.now() - hit.at < MEMORY_TTL) return image(hit.body, hit.type);

  try {
    const res = await fetch(`https://www.instagram.com/p/${code}/media/?size=${size}`, {
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; seveny-hair/1.0)" },
      cache: "no-store",
    });
    const type = res.headers.get("content-type") ?? "";
    if (!res.ok || !type.startsWith("image/")) {
      console.error(`[ig] ${code} 이미지 실패: ${res.status} ${type}`);
      return new Response("not found", { status: 404, headers: { "Cache-Control": "public, max-age=300" } });
    }
    const body = await res.arrayBuffer();
    if (memory.size >= MEMORY_MAX) memory.delete(memory.keys().next().value!);
    memory.set(key, { at: Date.now(), type, body });
    return image(body, type);
  } catch (err) {
    console.error(`[ig] ${code} 이미지 오류`, err instanceof Error ? err.message : err);
    return new Response("upstream error", { status: 502 });
  }
}

function image(body: ArrayBuffer, type: string) {
  return new Response(body, {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
