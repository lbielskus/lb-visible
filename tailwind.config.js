/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-gradient': 'linear-gradient(135deg, #c9d6ff, #e2e2e2)',
      },
      colors: {
        text: '#36454F',
        text2: '#fffff',
        background: '#e6e7e8',
        primary: '#ff64c4',
        secondary: '#4c4c5e',
        accent: '#232F3E',
        third: '#083344',
        fourth: '#ebebeb',
        hover3: '#245569',
      },
      textColor: {
        'third-mobile': '#083344',
      },
      hover: {
        'text-primary-mobile': '#ff64c4',
      },
      safelist: [
        'backdrop-blur-lg',
        'bg-[rgba(15,23,42,0.84)]',
        'border-white/10',
        'text-white',
        'hover:bg-pink-600',
        'bg-pink-500',
      ],
    },
  },
  plugins: [],
};
