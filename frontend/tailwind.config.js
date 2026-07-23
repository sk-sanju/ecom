/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2874f0", // Flipkart Blue
        secondary: "#ffe500", // Flipkart Yellow / Amazon Orange-ish
        accent: "#fb641b", // Buy Now Orange
        dark: "#111112",
        light: "#f1f3f6", // Standard light gray background for retailer sites
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'], // Standard dense retailer font
      },
    },
  },
  plugins: [],
}
