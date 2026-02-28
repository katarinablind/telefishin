import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixelify: ['"Pixelify Sans"', 'sans-serif'],
      },
      colors: {
        highlight: {
          DEFAULT: "#27a5bb",
          300: "#4db8cc",
          400: "#27a5bb",
          500: "#1e8fa8",
        },
      },
    },
  },
  plugins: [],
};

export default config;
