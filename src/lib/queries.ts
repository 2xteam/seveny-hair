import { cache } from "react";
import { connectDB } from "./mongodb";
import { InstagramModel, PageModel, PostModel, ServiceModel, ShopModel, StaffModel, TestimonialModel } from "./models";
import { instagram as instagramDefaults, type InstagramItem } from "@/content/instagram";
import * as defaults from "@/content/defaults";
import * as pageDefaults from "@/content/pages";
import type { Page, Post, Service, Shop, Staff, Testimonial } from "./types";

/*
 * DB 를 먼저 읽고, 실패하거나 비어 있으면 기본 콘텐츠로 그린다.
 * 실패는 삼키되 [db] 로그로 남긴다 — "데이터 없음"과 "연결 실패"가 같아 보이지 않도록.
 */
async function fromDb<T>(label: string, read: () => Promise<T | null | undefined>, fallback: T): Promise<T> {
  if (!process.env.MONGODB_URI) return fallback;
  try {
    await connectDB();
    const value = await read();
    if (value == null || (Array.isArray(value) && value.length === 0)) return fallback;
    return value;
  } catch (err) {
    console.error(`[db] ${label} 실패 — 기본 콘텐츠로 대체`, err instanceof Error ? err.message : err);
    return fallback;
  }
}

const clean = <T,>(doc: unknown): T => JSON.parse(JSON.stringify(doc)) as T;

export const getShop = cache(() =>
  fromDb<Shop>("getShop", async () => clean(await ShopModel.findOne({ key: "main" }).lean()), defaults.shop),
);

const PAGE_DEFAULTS: Record<string, Page> = {
  home: defaults.homePage as Page,
  ...pageDefaults.pages,
};

export const getPage = cache((slug: string) =>
  fromDb<Page>(
    `getPage(${slug})`,
    async () => clean(await PageModel.findOne({ slug }).lean()),
    PAGE_DEFAULTS[slug],
  ),
);

export const getTestimonials = cache(() =>
  fromDb<Testimonial[]>(
    "getTestimonials",
    async () => clean(await TestimonialModel.find({ published: { $ne: false } }).sort({ order: 1 }).lean()),
    defaults.testimonials,
  ),
);

export const getServices = cache(() =>
  fromDb<Service[]>(
    "getServices",
    async () => clean(await ServiceModel.find({ published: { $ne: false } }).sort({ order: 1 }).lean()),
    pageDefaults.services,
  ),
);

export const getStaff = cache(() =>
  fromDb<Staff[]>(
    "getStaff",
    async () => clean(await StaffModel.find().sort({ order: 1 }).lean()),
    pageDefaults.staff,
  ),
);

export const getPosts = cache(() =>
  fromDb<Post[]>(
    "getPosts",
    async () => clean(await PostModel.find({ published: { $ne: false } }).sort({ publishedAt: -1 }).lean()),
    pageDefaults.posts,
  ),
);

export async function getPost(slug: string): Promise<Post | undefined> {
  const all = await getPosts();
  return all.find((p) => p.slug === slug);
}

/**
 * 인스타그램 피드. 고정(pinned) → 최신(takenAt) → order 순.
 * DB 에 하나라도 있으면 DB 를, 없으면 수집해 둔 기본 목록을 쓴다.
 */
export const getInstagram = cache((limit = 24) =>
  fromDb<InstagramItem[]>(
    "getInstagram",
    async () =>
      clean(
        await InstagramModel.find({ hidden: { $ne: true } })
          .sort({ pinned: -1, takenAt: -1, order: 1 })
          .limit(limit)
          .lean(),
      ),
    instagramDefaults.slice(0, limit),
  ),
);
