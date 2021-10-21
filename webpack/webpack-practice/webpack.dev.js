const merge = require("webpack-merge")
const common = require("./webpack.common")
const StyleLintPlugin = require("stylelint-webpack-plugin")

const config = {
  mode: "development",
  devServer: {
    open: false,
    client: {
      overlay: true
    },
    historyApiFallback: {
      rewrites: [{ from: /^\/subpage$/, to: "subpage.html" }]
    },
    port: 3333

    //   historyApiFallback: true
    // }
  },
  plugins: [new StyleLintPlugin()]
}
module.exports = merge(common, config)
