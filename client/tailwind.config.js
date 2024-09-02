/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Consolas", "sans-serif"],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}