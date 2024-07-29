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
      keyframes: {
        onMouseEnter: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        onHover: {
          "0%": { scale: 1 },
          "100%": { scale: 1.3 },
        },
      },
      animation: {
        onMouseEnter: "onMouseEnter 0.1s ease-in-out",
        onHover: "onHover 0.3s ease-in-out",
      },
    },
  },

  plugins: [require("daisyui")],
};
