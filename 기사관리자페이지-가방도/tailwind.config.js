/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "login-bg": "#f5f5f5",
        "login-primary": "#4caf50",
        "login-primary-hover": "#45a049",
        "login-text": "#333333",
        "login-border": "#dddddd",
      },
      spacing: {
        "login-container": "400px",
      },
      borderRadius: {
        login: "8px",
      },
      boxShadow: {
        login: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
