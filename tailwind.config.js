const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // mode: "",
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      colors: {
        primary: "#0FB8CD",
        secondary: "#00607E",
        tertiary: "#7EB6BD",
        quaternary: "#00373F",
        transparent: "transparent",
        "green-deep": "#123413",
        purple: "#453581",
        teal: "#007584",
        gray: "#3d3d3d",
        "gray-dark": "#2e3235",
        "gray-light": "#d3dce6",
      },
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
