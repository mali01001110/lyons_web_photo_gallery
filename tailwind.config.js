/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        dark: {
          900: "#08090B",
          800: "#111115",
          700: "#1b1c20",
          600: "#242529",
          500: "#202228",
        },
        accent: "#2864FF",
        muted: "#90929a",
        border: "#303137",
      },
    },
  },
  plugins: [],
};
