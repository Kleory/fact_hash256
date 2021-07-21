const cssNano = require('cssnano')
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer,
    cssNano({
      preset: 'default',
    }),
  ],
}
