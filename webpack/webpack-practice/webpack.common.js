const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCasExtractPlugin = require("mini-css-extract-plugin")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const postcssLoader = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      path: "postcss.config.js"
    }
  }
}

const isProduction = process.env.NODE_ENV === "PRODUCTION"

//data:mediattype;base64,data

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[hash].js", //hash,contenthash,chunkhash
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      //fliename.module.scss = > css.modules, //filename.scss => global
      {
        test: /\.s?css$/i,
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              {
                loader: MiniCasExtractPlugin.loader
              },
              {
                loader: "css-loader",
                options: {
                  module: true
                }
              },
              postcssLoader,
              "sass-loader"
            ]
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader",
              postcssLoader
            ]
          }
        ]
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name() {
                if (!isProduction) {
                  return "[path][name].[ext]"
                }
                return "[contenthash].[ext]"
              },
              publicPath: "assets/",
              outputPath: "assets/"
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /.js/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new MiniCasExtractPlugin({
      filename: "[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      title: "Webpack",
      template: "./template.hbs",
      meta: {
        ViewPort: "width=device-width ,inital-scale=1.0"
      },
      minify: isProduction
        ? {
            collapseWhitespace: true,
            useShortDoctype: true,
            removeScriptTypeAttributes: true
          }
        : false
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      IS_PRODUCTION: isProduction
    })
  ]
}
