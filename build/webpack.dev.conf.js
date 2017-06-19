const path = require("path");
const webpack = require("webpack");
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  debug: true,
  devtool: "#inline-source-map",
  entry: ["webpack-hot-middleware/client", "./demo/index.js"],
  output: {
    path: path.resolve(__dirname, "..", "example"),
    filename: "bundle.js",
    publicPath: "/"
  },
  url: {
    dataUrlLimit: Infinity
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel?cacheDirectory"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  resolve: {
    root: [
      path.resolve(__dirname, "..", "src"),
      path.resolve(__dirname, "..", "node_modules")
    ],
    extensions: ["", ".js"]
  },
  plugins: [
    // new LodashModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
