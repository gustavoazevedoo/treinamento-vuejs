/** @type {import('tailwindcss').Config} */
import { palette } from "./palette";

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
