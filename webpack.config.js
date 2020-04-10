const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js", // 入口文件
  output: {
    path: path.resolve(__dirname, "./dist"), //输出路径，就是上步骤中新建的dist目录，
    publicPath: "/dist/",
    filename: "filters.min.js",
    library: "Filters",
    libraryExport: "default",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [["@babel/preset-env"]],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "production",
  devServer: {
    //   搭建服务器的文件夹
    contentBase: path.resolve(__dirname, "dist"),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开
    open: true,
  },
};
