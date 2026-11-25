/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-color)",
        foreground: "var(--text-color)",
        card: "var(--card-color)",
        border: "var(--border-color)",
        navbar: "var(--navbar-color)",
        input: "var(--input-bg-color)",

        // View button
        view: {
          DEFAULT: "var(--view-btn-bg)",
          text: "var(--view-btn-text)",
          hover: "var(--view-btn-hover)",
        },

        // Edit button
        edit: {
          DEFAULT: "var(--edit-btn-bg)",
          text: "var(--edit-btn-text)",
          hover: "var(--edit-btn-hover)",
        },

        // Delete button
        delete: {
          DEFAULT: "var(--delete-btn-bg)",
          text: "var(--delete-btn-text)",
          hover: "var(--delete-btn-hover)",
        },
      },
    },
  },
  plugins: [],
};