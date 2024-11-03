/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0C0C0C",
        secondary: "#F5F5F5",
        1: "#FEFBF6",
      },
      fontFamily: {
        hero: ["Matemasie", "sans-serif"],
        text: ["Libre Baskerville", "serif"],
      },
    },
  },
  plugins: [],
};
