// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        lisBlue: '#1A237E',
        primaryDark: '#003366',
        bgLight: '#F8F9FA',
        accentLight: '#D6EAF8'
      },
      fontSize: {
        hero: ['48px', '1.2'],
        subtitle: ['20px', '1.3'],
        base: ['16px', '1.5'],
      }
    },
  },
  plugins: [],
}
