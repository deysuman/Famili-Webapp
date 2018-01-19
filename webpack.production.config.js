var webpack = require('webpack');
var path = require('path');
const fs = require('fs')

var APP_DIR = path.resolve(__dirname, 'src');
var BUILD_DIR = path.resolve(__dirname, 'dist/js');

var config = {
 entry: APP_DIR + '/index.js',
 output: {
  path: BUILD_DIR,
  publicPath: '/dist/js',
  filename: 'entry.js'
 },

 module: {
  loaders: [{
   test: /\.jsx?/,
   include: APP_DIR,
   loader: 'babel-loader',
   exclude: '/node_modules/',
  }]
 },
 plugins: [
  new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    })
 

 ],

};

module.exports = config;