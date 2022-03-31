module.exports = {
  prefix: 'tw-',
  purge: [
      './**/*.liquid',
      './**/scripts/**/*.vue',
      './**/scripts/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
    fontFamily: {
      sans: ['Proxima Nova Regular', 'sans-serif'],
      semibold: ['Proxima Nova Semibold', 'sans-serif']
    },
    colors: {
      'ifit-blue': '#0069d2', 
      'ifit-green': '#28e1a5'
    }
    }
  },
  variants: {},
  plugins: []
}