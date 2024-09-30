/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#031541",
        secondary: "#003d8d",
      },
    },
  },
  daisyui: {
    themes: [
      "light",
      {
        mytheme: {
          primary: "#031541",
          secondary: "#003d8d",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
