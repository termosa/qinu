import uglify from 'rollup-plugin-uglify'
import buble from 'rollup-plugin-buble'

export default {
  input: 'qinu.js',
  output: {
    file: 'qinu.min.js',
    format: 'umd',
    name: 'qinu',
    sourcemap: true
  },
  plugins: [
    buble({
      objectAssign: 'Object.assign'
    }),
    uglify()
  ]
}
