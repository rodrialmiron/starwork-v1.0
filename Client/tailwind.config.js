const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "selector",
  theme: {
    colors: {
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      secondary: "rgb(var(--color-secondary) / <alpha-value>)",
      greenBtn: "rgb(var(--green-button) / <alpha-value>)",
      redBtn: "rgb(var(--red-button) / <alpha-value>)",
      transparent: "transparent",
      pink: colors.pink,
      green: colors.green,
      blue: colors.blue,
      white: colors.white,
      gray: colors.gray,
      black: colors.black,
      blue: colors.blue,
      yellow:colors.yellow,
      red:colors.red,
      "custom-blue": "#1693A5",
      "custom-blueClaro": "#54bdcc",
      "custom-blueOscuro": "#0d6c79",
      "custom-blueOscuro2": "#095965",
      'custom-blueTable': '#58a8b7',
      'custom-blueTable2': '#85bec9',
      'custom-gray': '#D9D9D9',
      'custom-drakGray': '#908F8F',

      red: colors.red,
    },
    extend: {
      spacing: {
        A: "4rem",
      },
      fontFamily: {
        catamaran: ["Catamaran"],
        hammersmith: ["Hammersmith One"],
      },
      maxHeight: {
        128: "32rem",
      },
      boxShadow: {
        'color': '0 10px 15px -3px rgba(22, 12, 71, 0.7), 0 4px 6px -2px rgba(22, 12, 71, 0.05)',
      },
      animation: {
        'bounce-delay-300': 'bounce 1s infinite 300ms',
        'bounce-delay-500': 'bounce 1s infinite 500ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
};
