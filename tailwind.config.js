/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      gmarket: ["gmarket"],
      notoSans: ["noto-sans"],
    },
    extend: {
      colors: {
        bgColor: "#F1F1F1",
        borderColor: "#C5C5C5",
        warningColor: "#FF0000",
      },
    },
  },

  plugins: [require("daisyui")],
};
