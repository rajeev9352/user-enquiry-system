/** @type {import('tailwindcss').Config} */
const flowbite = require('flowbite/plugin');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),

  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}