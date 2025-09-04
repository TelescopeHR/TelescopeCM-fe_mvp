const { color } = require('framer-motion');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust if your source folder is different
  ],
  theme: {
    extend: {
      colors: {
         primary: {
          DEFAULT: "#0F172A",
          light: "#1E293B",
          dark: "#0B1120",
        },
        secondary: {
          DEFAULT: "#3B82F6",
          light: "#60A5FA",
          dark: "#2563EB",
        },
        accentx: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
        },
        background: "#F9FAFB",
        text: "#111827",
      },
    },
  },
  plugins: [],
}