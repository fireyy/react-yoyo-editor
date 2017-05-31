const path = require("path");
const pkg = require("../package.json");

export default {
  entry: path.resolve(__dirname, "..", "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "..", "lib"),
    filename: "index.js",
    library: pkg.name,
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  url: {
    dataUrlLimit: Infinity
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel?cacheDirectory" }
    ]
  },
  resolve: {
    root: [
      path.resolve(__dirname, "..", "src"),
      path.resolve(__dirname, "..", "node_modules")
    ],
    extensions: ["", ".js"]
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    }
  },
  plugins: []
};
