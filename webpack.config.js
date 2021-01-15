const path = require("path");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/shop.js",
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader", /*transpile js to old version */
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              context: "public",
              name: "/images/[name]-[hash].[ext]",
              publicPath: "/",
            },
          },
        ],
      },
    ],
  },
};
