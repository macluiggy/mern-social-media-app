const path = require("path");
const webpack = require("webpack");

const rulesForTypeScript = {
  test: /\.tsx?$/,
  use: "ts-loader",
  exclude: /node_modules/,
};
const rulesForBabel = {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
    },
  },
};
module.exports = {
  entry: "./src/index.ts",
  target: "node",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      "crypto-browserify": require.resolve("crypto-browserify"), //if you want to use this module also don't forget npm i crypto-browserify
      url: false,
      util: false,
      util: require.resolve("util"),
      querystring: require.resolve("querystring-es3"),
      buffer: require.resolve("buffer/"),
    },
  },
  module: {
    rules: [rulesForBabel, rulesForTypeScript],
  },
  plugins: [new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
