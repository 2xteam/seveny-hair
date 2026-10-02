import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  // 클론 CSS(globals.css)의 기본 스타일을 덮지 않도록 preflight 를 끈다.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      fontFamily: {
        futura: ["var(--font-futura)", "sans-serif"],
        bodoni: ["var(--font-bodoni)", "serif"],
        oswald: ["var(--font-oswald)", "sans-serif"],
      },
      colors: {
        ink: "#111",
        "dark-grey": "#777",
        gainsboro: "#ddd",
        "light-grey": "#e7e7e7",
      },
    },
  },
  plugins: [],
};

export default config;
