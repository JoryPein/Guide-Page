const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const config = {
  // entry: ['@babel/polyfill', './src/main.js'],
  entry: {
    "main": "./src/index/main.js",
    "doc": "./src/doc/main.js"
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: '[name].build.js',
  },  
  plugins:[
     new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
     filename: 'doc.html',
     template: 'public/index.html',
     favicon: 'public/favicon.ico',
     chunks: ['doc'],
   }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 3000,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
				include: [path.resolve(__dirname + 'src')],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|eot|woff|ttf|svg|webp|PNG)(\?\S*)?$/,
        use: ["file-loader"],
      }
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.vue'],
  },
};
module.exports = config;