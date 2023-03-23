/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primaryDark: "#000000",
        secondaryDark: "#A39393",
        lightDark: "#F5F5F5",
        yellow: "#E8B70A",
        brightYellow: "#F8CA29",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
