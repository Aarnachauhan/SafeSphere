/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
  extend: {
  colors: {
    primary: "#30343f",
    accent: "#273469",
    soft: "#e4d9ff",
    background: "#fafaff",
    textMain: "#000000",
    warning: "#e63946",
  },
  fontFamily: {
  header: ["Baskervville", "serif"],
  body: ["Google Sans", "system-ui", "sans-serif"],
},
},
  },
  plugins: [],
};