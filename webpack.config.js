require("dotenv").config();
const path = require("path");
const webpack = require("webpack");

const ROOT_DIR = path.resolve(__dirname, ".");
const CACHE_DIR = path.resolve(__dirname, "./node_modules/.cache/cache-loader");
const DIST_DIR = path.resolve(__dirname, "./dist");

const RESAS_API_KEY = process.env["RESAS_API_KEY"];
if (RESAS_API_KEY == null) {
  throw new Error(`環境変数「RESAS_API_KEY」をセットしてビルドして下さい`);
}

module.exports = {
  mode: "none",
  target: "web",
  context: ROOT_DIR,
  devtool: "source-map",
  entry: {
    bundle: ["@babel/polyfill", "whatwg-fetch", "./src/index.tsx"],
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
  plugins: [
    new webpack.DefinePlugin({
      "process.env.RESAS_API_KEY": JSON.stringify(RESAS_API_KEY),
    }),
  ],
  devServer: {
    open: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    contentBase: DIST_DIR,
  },
};
