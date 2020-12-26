import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/Main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es'
  },
  plugins: [
    nodeResolve({
      browser: true
    })
  ]
}