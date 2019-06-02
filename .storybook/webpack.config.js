const path = require("path");
const merge = require("webpack-merge");

const ROOT_DIR = path.resolve(__dirname, "..");

module.exports = ({config}) =>
  merge(config, {
    context: ROOT_DIR,
    node: {
      __dirname: true,
      __filename: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
            {
              loader: "ts-loader",
              options: {
                onlyCompileBundledFiles: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
  });
