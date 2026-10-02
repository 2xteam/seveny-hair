import Link from "next/link";
import type { Post } from "@/lib/types";

/** 블로그 카드 3열 (원본 .blog-post-v3). 카드마다 Slide Up 1 등장, 호버 시 이미지 1.05 확대 */
export default function BlogCards({ posts, reveal = true }: { posts: Post[]; reveal?: boolean }) {
  return (
    <div className="blog-posts" role="list">
      {posts.map((p) => (
        <div key={p.slug} className="blog-post-v3" role="listitem" data-reveal={reveal ? "up" : undefined}>
          <Link href={`/post/${p.slug}`} className="post-card-v3">
            <div className="post-card-info-v3">
              <h4 className="post-card-v3-heading">{p.title}</h4>
              <div className="link-v2 white-link">더 보기</div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.thumbnail} alt="" className="zoom-image" />
          </Link>
        </div>
      ))}
    </div>
  );
}
