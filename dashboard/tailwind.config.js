/** @type {import('tailwindcss').Config} */
const palette = require("./palette");

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: palette,
      fontFamily: {
        regular: ["Roboto", "sans-serif"],
        medium: ["Roboto", "sans-serif"],
        bold: ["Roboto", "sans-serif"],
        black: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
