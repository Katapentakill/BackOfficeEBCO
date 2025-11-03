import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#D90429',
        'brand-dark': '#212121',
        'brand-text-dark': '#333333',
        'brand-text-light': '#FFFFFF',
        'brand-bg-light': '#F4F4F4',
        'brand-bg-white': '#FFFFFF',
      },
    },
  },
};

export default config;
