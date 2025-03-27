/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: '#D5E3FF',
        customPurple: '#E6D7FF',
      },
    },
  },
  plugins: [],
};
