/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        ArchivoBlack:['Archivo Black', "sans-serif"],
        Archivo: ['Archivo', "sans-serif"],
        MontserratAlternates : ['Montserrat Alternates', "sans-serif"],
      }
    },
  },
  plugins: [],
}