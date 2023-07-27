/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
      },
      backgroundImage: {
        "auth-page-bg": "url('/assets/auth-page-bg.png')",
      },
    },
  },
  plugins: [],
};
