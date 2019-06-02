const path = require("path");

const ROOT_DIR = path.resolve(__dirname, ".");
const CACHE_DIR = path.resolve(__dirname, "./node_modules/.cache/cache-loader");
const DIST_DIR = path.resolve(__dirname, "./dist");

module.exports = {
  mode: "none",
  target: "web",
  context: ROOT_DIR,
  devtool: "source-map",
  entry: {
    bundle: ["@babel/polyfill", "./src/index.tsx"],
  },
  output: {
    path: DIST_DIR,
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "cache-loader",
            options: {
              cacheDirectory: CACHE_DIR,
            },
          },
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
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    open: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    contentBase: DIST_DIR,
  },
};
