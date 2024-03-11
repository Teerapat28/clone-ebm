/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'bem-yellow': '#FAD53D',
      'bem-darkyellow': '#E9C73E',
      'bem-dark-text': '#2E383C',
      'bem-underline': '#3f3f3f',
      'bem-borderMapColor': '#666666',
      'bem-footerfontColor' : '#453b00',
    },
    extend: {
      spacing: {
        '8px': '8px',
        '25px': '25px',
        '30px': '30px',
        '50px': '50px',
        '60px': '60px',
        '90px': '90px',
        '31.188rem': '31.188rem',
        '23.409rem': '23.409rem',
        '31.438rem': '31.438rem'
      }
    },
  },
  plugins: [],
}

