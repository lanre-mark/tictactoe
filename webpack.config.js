const webpack = require("webpack");
const path = require("path");

const entry = ["./src/index.js"];

const output = {
  path: path.resolve(__dirname, "dist"),
  publicPath: "/dist/",
  filename: "bundle.js",
};

module.exports = {
  entry,
  output,
  devtool: "eval-source-map",
  module: {
    loaders: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react", "stage-2"],
        },
      },
    ],
  },
  devServer: {
    contentBase: "./",
    port: 4500,
  },
};
