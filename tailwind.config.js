/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";
import themes from "daisyui/src/theming/themes";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["sans-serif"],
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "serif"],
        song: ['"Song Myung"', "serif"],
        inter: ["Inter", "serif"],
        lato: ["Lato", "serif"],
        dancing: ["Dancing Script", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#6031A3",
          secondary: "#A8A8A8",
          accent: "#FF7F50",
          neutral: "#3D4451",
          "base-100": "#f3f3f8", // Background for light mode
          info: "#3ABFF8",
          success: "#22C55E",
          warning: "#FACC15",
          error: "#EF4444",
        },
      },
      {
        myDarktheme: {
          primary: "#6031A3",
          secondary: "#A8A8A8",
          accent: "#FF7F50",
          neutral: "#3D4451",
          "base-100": "#011627", // Background for dark mode
          info: "#3ABFF8",
          success: "#22C55E",
          warning: "#FACC15",
          error: "#EF4444",
        },
      },
    ],
    darkTheme: "myDarktheme",
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },

  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
};
