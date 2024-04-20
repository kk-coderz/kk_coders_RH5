/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*/.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-primary': '#5DEBD7',
        'custom-secondary': '#1679AB',
        'custom-tertiary': '#074173',
      },
      ringColor: {
        'custom-border' : '#C5FF95',
      },
    },
  },
  plugins: [],
}
