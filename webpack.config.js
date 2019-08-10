const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const buildPath = path.resolve(__dirname, "build")

module.exports = {
  entry: "./src/client/index.ts",
  output: {
    filename: "bundle.js",
    path: buildPath,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    publicPath: "/assets/",
    proxy: {
      "/": "http://localhost:3000",
    },
    compress: true,
    overlay: true,
  },
}
