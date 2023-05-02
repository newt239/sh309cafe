/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("rippleui")],
  darkMode: "class",
  rippleui: {
    removeThemes: ["dark"],
  },
}

