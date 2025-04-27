/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // screens: {
    //   sm: "640px",
    //   md: "768px",
    //   lg: "900px",
    //   xl: "1000px",
    //   "2xl": "1536px",
    // },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "tch-blue": "#19416a",
        "tch-blue-semi": "#6E97C0",
        "tch-blue-light": "#ECF0F3",
        "tch-gold": "#C0A26E",
      },
      listStyleType: {
        square: "square",
      },
      screens: {
        xl: "1200px",
        "2xl": "1200px",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
