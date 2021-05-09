import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import sucrase from '@rollup/plugin-sucrase';
import { string as stringP } from "rollup-plugin-string";

export default {
  input: 'src/index.ts',
  output: [{
    file: 'dist/index.js',
    format: 'cjs',
  }, {
    file: 'dist/index.es.js',
    format: 'es',
  }],
  external: [
  ],
  plugins: [
    commonjs(),
    nodeResolve({
      extensions: ['.js', '.ts']
    }),
    sucrase({
      exclude: ['node_modules/**'],
      include: ['**/*.ts'],
      transforms: ['typescript', 'jsx'],
    }),
    stringP({
      include: "**/*.md",
    }),
  ],
}
