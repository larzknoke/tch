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
        "tch-blue-light": "#ECF0F3",
      },
      listStyleType: {
        square: "square",
      },
      screens: {
        xl: "1000px",
        "2xl": "1000px",
      },
    },
  },
  plugins: [],
};
