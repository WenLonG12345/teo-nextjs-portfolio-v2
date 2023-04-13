/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#00A887",
        primary_dark: "#116363",
        primary_light: "#02A687",
        secondary: "#87C1B5",
      },
    },
    screens: {
      sm: "600px",
      md: "728px",
      lg: "984px",
      xl: "1080px",
      "2xl": "1336px",
    },
  },
  plugins: [],
  darkMode: "class",
};
