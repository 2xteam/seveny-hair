/**
 * 사이트 아이콘. 원본은 Webflow 템플릿 CDN 의 SVG 를 썼는데, 그 의존을 끊으려고 같은 크기·선 굵기로 다시 그렸다.
 * 모두 currentColor 를 따른다.
 */
type P = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const IconLocation = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 21s-6.5-6.2-6.5-11.2A6.5 6.5 0 0 1 18.5 9.8C18.5 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.8" r="2.4" />
  </svg>
);

export const IconPhone = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M6.6 3.5h3l1.5 4-2 1.3a11 11 0 0 0 6.1 6.1l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" />
  </svg>
);

export const IconInstagram = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const IconBlog = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="4.5" width="17" height="13" rx="2" />
    <path d="M8 21l3-3.5M8.5 9v5M8.5 9l4 5V9M15.5 9v5" />
  </svg>
);

export const IconCalendar = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </svg>
);

export const IconHome = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 11l8-7 8 7M6 9.5V20h12V9.5" />
  </svg>
);

export const IconArrowDown = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3v18M6 15l6 6 6-6" />
  </svg>
);

export const IconArrowLeft = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M21 12H3M9 6l-6 6 6 6" />
  </svg>
);

export const IconArrowRight = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M3 12h18M15 6l6 6-6 6" />
  </svg>
);

export const IconCard = ({ size = 50, className }: P) => (
  <svg {...base(size)} strokeWidth={1.1} className={className}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="1.5" />
    <path d="M2.5 9.5h19M5.5 15h4" />
  </svg>
);

export const IconCash = ({ size = 50, className }: P) => (
  <svg {...base(size)} strokeWidth={1.1} className={className}>
    <rect x="2.5" y="6.5" width="19" height="11" rx="1" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M5.5 9.5v5M18.5 9.5v5" />
  </svg>
);

export const IconZeroPay = ({ size = 50, className }: P) => (
  <svg {...base(size)} strokeWidth={1.1} className={className}>
    <rect x="4.5" y="2.5" width="15" height="19" rx="2.5" />
    <path d="M9 8.5h6l-6 7h6M10.5 19h3" />
  </svg>
);

/** 후기 영역 오른쪽 위 큰 따옴표 (원본 quote-icon 자리) */
export const QuoteMark = ({ className }: { className?: string }) => (
  <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true" className={className}>
    <path
      fill="#ffffff26"
      d="M0 48V28C0 12.6 8.4 3.2 25.2 0l2.4 6.4C19 8.6 14.6 13.4 14.4 20.8H26V48H0zm36 0V28C36 12.6 44.4 3.2 61.2 0l2.4 6.4C55 8.6 50.6 13.4 50.4 20.8H62V48H36z"
    />
  </svg>
);
