/**
 * seveny hair 사진 — 네이버 플레이스 "업체 사진" 22장 (2026-10-02 수집).
 * 원본 주소를 그대로 링크한다 (pstatic 은 외부 링크를 허용). R2 로 옮기면 이 파일만 바꾼다.
 * 방문자 리뷰 사진은 고객이 올린 것이라 쓰지 않는다.
 */
const N = "https://ldb-phinf.pstatic.net/";

export const PHOTOS = {
  ownerPortrait: N + "20260724_178/1784889613718zWGxs_JPEG/IMG_4139.jpg", // 원장 + KCIA 배지 (1170×1244)
  kciaAward: N + "20260724_13/1784889606018SVDOn_JPEG/IMG_4133.jpg", // 2026 KCIA 포스터 (정사각)
  londonGroup: N + "20251023_17/17612258489498YJMF_JPEG/IMG_4883.jpeg", // 런던 사순 단체
  londonMirror: N + "20251023_45/1761225849108UwBKv_JPEG/IMG_5178.jpeg", // 사순 교실 거울
  londonFriends: N + "20251023_105/1761225848875NIls3_JPEG/IMG_4878.jpeg",
  londonClass: N + "20251023_287/1761225849130VsyeM_JPEG/IMG_5010.jpeg", // 수강생 단체 (세로)
  londonCollection: N + "20251023_217/17612256881365Nz0g_PNG/IMG_5183.png", // collection class 캡처
  houseOfSassoon: N + "20251023_122/1761225688075i6Ebn_JPEG/IMG_5184.jpeg",
  signWall: N + "20201125_114/16063095357017zjF1_JPEG/X8jKyDsh0BIOulVqd1de6zF8.jpeg.jpg", // SEVENY HAIR 벽 사인
  interior: N + "20201210_122/1607609231239ty3W2_JPEG/PeFi5lP1Hs2zYMCzpI0Fls4F.jpeg.jpg", // 실내 (3024×3575)
  styleAshLayer: N + "20231219_291/1702975810220gOT6G_JPEG/C5257F13-7CEA-4BD4-B809-2FBEB496129D.jpeg",
  styleTeal: N + "20231219_170/17029758102978MITv_JPEG/5E793B9F-58A4-4454-962E-0B4A810432AB.jpeg",
  styleMensCut: N + "20231219_39/1702975810389idutL_JPEG/4C67225C-47F8-4CD4-93BF-99A52D3829B6.jpeg",
  styleBob: N + "20231219_70/1702975810360Ykto7_JPEG/14BC2E81-5B5E-4E92-8BA8-E8C2B5DD8E42.jpeg",
  styleWave: N + "20231219_240/1702975811013Uq3Jl_JPEG/ABE6EB64-3F50-47A2-A48B-414936F22F84.jpeg",
  styleBobBack: N + "20231219_20/1702975811125zT1Qj_JPEG/336C77D4-DDA0-48F4-B43B-7371FCB0D824.jpeg",
  stylePinkViolet: N + "20231219_95/1702975810297JV771_JPEG/00E5FB81-0F75-40F4-86BE-9401733FE150.jpeg",
  styleShort: N + "20231219_143/1702975810325QhLNc_JPEG/A7DB0736-5956-4321-888A-0B95A6BD0EBA.jpeg",
  styleLongWave: N + "20231219_157/1702975810351n1gns_JPEG/D98578CB-D75C-45F6-81DB-61E2C8A7779C.jpeg",
  interiorWide: N + "20201125_277/1606307629162PwXpy_JPEG/09TyEtXkPM40yZZ6MPawOXCC.jpeg.jpg", // 실내 (샹들리에)
  signCurtain: N + "20201125_50/1606309502183l1Ybg_JPEG/e4lYhUFSu8QiCBY3PXuD3QfV.jpeg.jpg", // 커튼 위 사인
  interiorAlt: N + "20201210_22/1607609261462pAz1l_JPEG/4NAphNLTGR8KrDOwmV7-QHJl.jpeg.jpg",
} as const;

/** 네이버 리뷰 키워드 아이콘 (후기 아바타 자리) */
const E = "https://ssl.pstatic.net/static/pup/emoji/";
export const EMOJI = {
  greenHeart: E + "green_heart20220119222224.png",
  beatingHeart: E + "beating_heart20220119222223.png",
  magnifier: E + "magnifying_glass20220119222236.png",
  hairDone: E + "woman_getting_hair_done20220119222234.png",
  sunglasses: E + "face_with_sunglasses20220119222235.png",
  sparkles: E + "sparkles20220119222028.png",
} as const;
