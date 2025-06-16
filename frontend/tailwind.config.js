/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        purple: {
          400: '#a78bfa',
          500: '#8b5cf6',
        },
        orange: {
          400: '#fb923c',
          500: '#f97316',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        }
      }
    },
  },
  plugins: [],
}

