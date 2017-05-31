const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("./webpack.dev.conf");
const staticPath = path.join(__dirname, "..", "demo");

const app = express();
const compiler = webpack(config);

app.use(express.static(staticPath));

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true
  })
);

app.use(webpackHotMiddleware(compiler));

app.listen(3001);
