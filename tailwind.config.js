/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        airbnb: {
          rausch: '#FF385C',
          rauschDark: '#E00B41',
          charcoal: '#222222',
          muted: '#717171',
          lightMuted: '#B0B0B0',
          border: '#DDDDDD',
          borderLight: '#EBEBEB',
          bgLight: '#F7F7F7',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        'airbnb-card': '0 6px 16px rgba(0, 0, 0, 0.12)',
        'airbnb-header': '0 1px 2px rgba(0, 0, 0, 0.08)',
        'airbnb-pill': '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
        'airbnb-pill-hover': '0 2px 4px rgba(0,0,0,0.18)',
        'airbnb-modal': '0 8px 28px rgba(0, 0, 0, 0.28)',
      },
    },
  },
  plugins: [],
};
