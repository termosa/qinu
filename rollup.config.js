import uglify from 'rollup-plugin-uglify'

export default {
  input: 'qinu.js',
  output: {
    file: 'qinu.min.js',
    format: 'umd',
    name: 'qinu',
    sourcemap: true
  },
  plugins: [
    uglify()
  ]
}
