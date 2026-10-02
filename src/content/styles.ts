/**
 * 네이버 플레이스 "스타일 정보" (업체 등록, 26개 · 2026-10-02 수집).
 * title/category 는 네이버 원문(한글), titleEn 은 영어 표기가 필요할 때 쓴다.
 * gender 는 원문 값에 "남성…" 제목을 m 으로 바로잡았다.
 */
export type Style = {
  num: string;
  title: string;
  category: string;
  titleEn: string;
  gender: "f" | "m";
  images: { src: string; w: number; h: number }[];
  order: number;
};

export const styles: Style[] = [
  {
    "num": "17754333",
    "title": "핑크바이올렛 투톤",
    "category": "투톤",
    "titleEn": "Pink-violet two-tone",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20230511_274/1683812624910jvbAD_JPEG/00E5FB81-0F75-40F4-86BE-9401733FE150.jpeg",
        "w": 1440,
        "h": 1552
      }
    ],
    "order": 1
  },
  {
    "num": "17754334",
    "title": "S컬펌",
    "category": "S컬펌 · 디지털펌",
    "titleEn": "S-curl perm",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20230511_80/1683811369815oiWo4_JPEG/IMG_5608.jpeg",
        "w": 1170,
        "h": 1844
      }
    ],
    "order": 2
  },
  {
    "num": "17754335",
    "title": "플라워펌",
    "category": "물결펌(플라워펌) · 히피펌(젤리펌)",
    "titleEn": "Flower perm",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20230511_186/1683811130555Mp7QP_JPEG/ABE6EB64-3F50-47A2-A48B-414936F22F84.jpeg",
        "w": 2697,
        "h": 3371
      }
    ],
    "order": 3
  },
  {
    "num": "1233663",
    "title": "매직셋팅",
    "category": "매직셋팅 · C컬펌",
    "titleEn": "Magic setting",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20210307_122/1615119743236DuWsj_JPEG/XGSIrRTCgxqWxbY2EhV1VR_v.jpeg.jpg",
        "w": 900,
        "h": 1124
      }
    ],
    "order": 4
  },
  {
    "num": "17754336",
    "title": "다양한 컬러염색",
    "category": "투톤 · 탈색",
    "titleEn": "Creative color",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20230511_195/1683810677209YY1gW_JPEG/1F1B9A8E-36D3-4CC3-9050-C809A1EFBB61.jpeg",
        "w": 1440,
        "h": 1637
      }
    ],
    "order": 5
  },
  {
    "num": "17754337",
    "title": "오렌지 브라운 투톤",
    "category": "오렌지브라운 · 투톤",
    "titleEn": "Orange-brown two-tone",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20230511_202/168381072814208A8N_JPEG/C45E7053-1342-47D6-B6D0-5517B784F6E6.jpeg",
        "w": 1440,
        "h": 1631
      }
    ],
    "order": 6
  },
  {
    "num": "1453462",
    "title": "레드그라데이션",
    "category": "레드바이올렛 · 옴브레(그라데이션)",
    "titleEn": "Red gradation",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20210620_104/16241555475006FOEp_JPEG/ZichiAqNDeXqFAtP11EZrDLr.jpeg.jpg",
        "w": 1440,
        "h": 1725
      },
      {
        "src": "https://ldb-phinf.pstatic.net/20210620_141/1624155553445Sl2Jf_JPEG/iok1A1Jsg7iJTzW7td2Zr4rc.jpeg.jpg",
        "w": 1440,
        "h": 1735
      }
    ],
    "order": 7
  },
  {
    "num": "17754338",
    "title": "바이올렛 투톤",
    "category": "투톤 · 애쉬바이올렛",
    "titleEn": "Violet two-tone",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20230511_86/1683810819783Nsmuw_JPEG/FF079501-8C07-4DB7-9BA8-1095AD92E65D.jpeg",
        "w": 2535,
        "h": 2706
      }
    ],
    "order": 8
  },
  {
    "num": "17754339",
    "title": "애쉬그레이",
    "category": "애쉬그레이 · 탈색",
    "titleEn": "Ash grey",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20230512_59/1683877549368b6Him_JPEG/14CBA5EB-06B7-4E38-9F11-F10D7F5372A5.jpeg",
        "w": 1440,
        "h": 1531
      },
      {
        "src": "https://ldb-phinf.pstatic.net/20230511_87/1683811507443b8Ee6_JPEG/0A9360E5-80B7-4443-9CBD-26081776E41A.jpeg",
        "w": 1440,
        "h": 1526
      }
    ],
    "order": 9
  },
  {
    "num": "1142544",
    "title": "블론드",
    "category": "탈색 · 블론드",
    "titleEn": "Blonde",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20210119_238/1611066881763N9VGO_JPEG/_1SJpvWO1wpkvIBM2I4WTUrc.jpeg.jpg",
        "w": 900,
        "h": 1024
      }
    ],
    "order": 10
  },
  {
    "num": "1233665",
    "title": "카키브라운",
    "category": "애쉬카키브라운 · 카키브라운",
    "titleEn": "Khaki brown",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20210307_189/1615119966805DftxR_JPEG/etqKESBt0CLR4LfzdIwV1Eil.jpeg.jpg",
        "w": 1440,
        "h": 1440
      }
    ],
    "order": 11
  },
  {
    "num": "1142557",
    "title": "매트브라운",
    "category": "매트브라운 · 밀크브라운",
    "titleEn": "Matte brown",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20210119_282/1611067873946jG5JF_JPEG/j8DwJ3cOc8nrRLgUCfC5q4s4.jpeg.jpg",
        "w": 1024,
        "h": 1280
      }
    ],
    "order": 12
  },
  {
    "num": "17754343",
    "title": "허쉬컷",
    "category": "허쉬컷",
    "titleEn": "Hush cut",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20230511_82/1683810883484YBn2B_JPEG/IMG_8888.jpeg",
        "w": 1170,
        "h": 1391
      }
    ],
    "order": 13
  },
  {
    "num": "17754344",
    "title": "보브컷",
    "category": "보브컷",
    "titleEn": "Bob cut",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20230511_274/1683810609362HX3TX_JPEG/A7DB0736-5956-4321-888A-0B95A6BD0EBA.jpeg",
        "w": 1440,
        "h": 1529
      }
    ],
    "order": 14
  },
  {
    "num": "17754345",
    "title": "히피펌",
    "category": "히피펌(젤리펌) · 디지털펌",
    "titleEn": "Hippie perm",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20230511_74/1683811056033edIRX_JPEG/EB055098-E424-4E87-BCA0-3515786958C2.jpeg",
        "w": 1440,
        "h": 1440
      }
    ],
    "order": 15
  },
  {
    "num": "100169452",
    "title": "히피해피",
    "category": "히피펌(젤리펌) · 일자컷",
    "titleEn": "Hippie happy",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20250617_65/1750169276604pmsQg_JPEG/IMG_9631.jpeg",
        "w": 1170,
        "h": 1316
      }
    ],
    "order": 16
  },
  {
    "num": "100169397",
    "title": "짜파게티 히피펌",
    "category": "히피펌(젤리펌) · 구름펌",
    "titleEn": "Noodle hippie perm",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20250617_70/1750168014754ai79k_JPEG/IMG_9496.jpeg",
        "w": 2426,
        "h": 3689
      },
      {
        "src": "https://ldb-phinf.pstatic.net/20250617_241/1750168014811OjiFg_JPEG/IMG_9495.jpeg",
        "w": 3024,
        "h": 4032
      }
    ],
    "order": 17
  },
  {
    "num": "100169398",
    "title": "라면 히피",
    "category": "히피펌(젤리펌) · 구름펌",
    "titleEn": "Ramen hippie",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20250617_79/1750168183042RHXx6_JPEG/IMG_9621.jpeg",
        "w": 953,
        "h": 1537
      },
      {
        "src": "https://ldb-phinf.pstatic.net/20250617_218/1750168183583SAKpc_JPEG/IMG_9618.jpeg",
        "w": 2067,
        "h": 3362
      }
    ],
    "order": 18
  },
  {
    "num": "1233666",
    "title": "신데렐라 클리닉",
    "category": "클리닉",
    "titleEn": "Cinderella clinic",
    "gender": "f",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20210307_295/1615119887382M2SkE_JPEG/ZiDEC2UwZrYk7ToSjgRvd3sx.jpeg.jpg",
        "w": 1536,
        "h": 2048
      }
    ],
    "order": 19
  },
  {
    "num": "17781921",
    "title": "남성 리프컷 / 펌",
    "category": "남성 커트 · 펌",
    "titleEn": "Men’s leaf cut / perm",
    "gender": "m",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20230512_133/16838697041107p0yU_JPEG/IMG_7517.jpeg",
        "w": 1170,
        "h": 1704
      },
      {
        "src": "https://ldb-phinf.pstatic.net/20230512_150/1683869704016EcXSF_JPEG/IMG_7518.jpeg",
        "w": 1170,
        "h": 1814
      }
    ],
    "order": 20
  },
  {
    "num": "17781920",
    "title": "남성 시스루컷 / 펌",
    "category": "남성 커트 · 펌",
    "titleEn": "Men’s see-through cut / perm",
    "gender": "m",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20230512_20/1683869773598a9AjH_JPEG/IMG_6983.jpeg",
        "w": 1170,
        "h": 1539
      }
    ],
    "order": 21
  },
  {
    "num": "17781922",
    "title": "남성 드랍컷 / 펌",
    "category": "다운펌",
    "titleEn": "Men’s drop cut / perm",
    "gender": "m",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20230512_237/1683869922339NPJM6_JPEG/IMG_6239.jpeg",
        "w": 1130,
        "h": 1525
      },
      {
        "src": "https://ldb-phinf.pstatic.net/20230512_37/1683869922343qqhIG_JPEG/IMG_6237.jpeg",
        "w": 1130,
        "h": 1605
      }
    ],
    "order": 22
  },
  {
    "num": "100169450",
    "title": "나의오렌지나무",
    "category": "레드오렌지 · 탈색",
    "titleEn": "Orange tree",
    "gender": "m",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20250617_49/17501683917223lw5H_JPEG/IMG_5643.jpeg",
        "w": 1836,
        "h": 2448
      }
    ],
    "order": 23
  },
  {
    "num": "100169451",
    "title": "탈색 그리고 용달블루와 딥다크블루",
    "category": "탈색 · 애쉬블루",
    "titleEn": "Blues, light & deep",
    "gender": "m",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20250617_131/1750168661916abXzA_JPEG/IMG_3435.jpeg",
        "w": 1534,
        "h": 2448
      },
      {
        "src": "https://ldb-phinf.pstatic.net/20250617_239/1750168662280sicry_JPEG/IMG_3429.jpeg",
        "w": 2623,
        "h": 4029
      },
      {
        "src": "https://ldb-phinf.pstatic.net/20250617_287/175016866169714Kr4_JPEG/IMG_4901.jpeg",
        "w": 1836,
        "h": 2448
      }
    ],
    "order": 24
  },
  {
    "num": "100169453",
    "title": "다운펌과 댄디 그 사이",
    "category": "시스루펌 · 다운펌",
    "titleEn": "Between down perm & dandy",
    "gender": "m",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20250617_98/1750169108649f8F7S_JPEG/IMG_4394.jpeg",
        "w": 1280,
        "h": 2158
      }
    ],
    "order": 25
  },
  {
    "num": "100169454",
    "title": "남자 시스루루루~히피",
    "category": "스핀스왈로펌 · 스왈로펌",
    "titleEn": "See-through hippie",
    "gender": "m",
    "images": [
      {
        "src": "https://ldb-phinf.pstatic.net/20250617_244/1750169389717s7u4a_JPEG/IMG_9632.jpeg",
        "w": 1170,
        "h": 1207
      }
    ],
    "order": 26
  }
];
