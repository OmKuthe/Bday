/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'titan': ['"Titan One"', 'cursive'],
        'dancing': ['"Dancing Script"', 'cursive'],
        'sriracha': ['"Sriracha"', 'cursive'],
      },
      colors: {
        'birthday-pink': '#FF7882',
        'birthday-bg': '#feecea',
        'letter-bg': '#fff8e4',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}