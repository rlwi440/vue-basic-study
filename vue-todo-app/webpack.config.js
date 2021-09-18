const path= require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
require('@babel/polyfill')

module.exports={
  //진입점 
  //__dirname 위치를 알려주는 전역변수 
  entry:{
    app:[
      '@babel/polyfill',
      path.join(__dirname,'main.js')
    ]
  },
  //결과물에대한 설정 
  output:{
    filename:'[name].js',//app.js
    path:path.join(__dirname,'dist')
  },
  module:{
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use:'babel-loader'
      },
      {
        test:/\.css$/,
        use:[
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins:[
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template:path.join(__dirname,'index.html')
    }),
    new CopyPlugin({
      patterns: [
        { from: 'assets/', to: '' }
      ],
    }),
  ]
}