const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "script.js",
  },
  devtool: "eval-source-map",
  watch: true,
};
