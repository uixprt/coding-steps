import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import sucrase from '@rollup/plugin-sucrase';
import html from '@rollup/plugin-html';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'umd',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __buildDate__: () => JSON.stringify(new Date()),
      __buildVersion: 1,
    }),
    commonjs(),
    nodeResolve({
      extensions: ['.js', '.ts']
    }),
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['typescript', 'jsx'],
    }),
    html({
      template: ({ attributes, bundle, files, publicPath, title }) => { 
        return `
        <!DOCTYPE html>
        <html ${attributes}>
          <head>
            <title>${title}</title>
          </head>
          <body>
            <noscript>
              You need to enable JavaScript to run this app.
            </noscript>
            <div id="root"></div>
            <script src="../index.js"></script>
          </body>
        </html>
        `
      }
    }),
    serve({
      contentBase: './dist',
      open: true,
      verbose: true,
    }),
    livereload({
      watch: './dist',
    }),
  ],
}
