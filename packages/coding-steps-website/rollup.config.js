import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import html from "@rollup/plugin-html";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const isDevelopment = process.env.NODE_ENV === "development";

const devPlugins = [
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
      `;
    },
  }),
  serve({
    contentBase: "./dist",
    open: true,
    verbose: true,
  }),
  livereload({
    watch: "./dist",
  }),
];

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "umd",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
      __buildDate__: () => JSON.stringify(new Date()),
      __buildVersion: 1,
      preventAssignment: true,
    }),
    commonjs(),
    nodeResolve({
      extensions: [".js", ".ts"],
      customResolveOptions: {
        moduleDirectories: ["src"],
      },
    }),
    typescript({ lib: ["es5", "es6", "dom"], target: "es5", jsx: "react" }),
    ...(isDevelopment ? devPlugins : []),
  ],
  onwarn: function (warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if (warning.code === "THIS_IS_UNDEFINED") {
      return;
    }

    // console.warn everything else
    console.warn(warning.message);
  },
};
