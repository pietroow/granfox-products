/** @type {import('tailwindcss').Config} */

const withMt = require("@material-tailwind/react/utils/withMT");

module.exports = withMt({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});