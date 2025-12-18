/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        popping: ["Poppins", "sans-serif"], // 'custom' is your key name
        roboto: ["Roboto", "sans-serif"], // 'custom' is your key name
      },
    },
  },
  plugins: [],
};
