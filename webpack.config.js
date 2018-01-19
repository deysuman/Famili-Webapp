var webpack = require('webpack');
var path = require('path');
const fs = require('fs')

var APP_DIR = path.resolve(__dirname,'src');
var BUILD_DIR = path.resolve(__dirname,'dist/js');

var config = {
	entry: APP_DIR + '/index.js',
	output:{
		path:BUILD_DIR,
		publicPath:'/dist/js',
		filename:'bundle.min.js'
	},
	
	module:{
		loaders:[
		{
  			test: /\.css$/,
  			loader: 'style-loader',
  			exclude:'/node_modules/',
		},
		{
            test: /\.scss$/,
            loader: 'style!css!sass',
            exclude:'/node_modules/',
        },

		{
			test:/\.jsx?/,
			include:APP_DIR,
			loader:'babel-loader',
			exclude:'/node_modules/',
		},
		{
        	test: /\.json$/,
        	loader: "json-loader"
    	}




		]
	},
	plugins: [
		  
		new webpack.ProvidePlugin({
		  'videojs': 'video.js',
		  'window.videojs': 'video.js'
		}),
    ],
	
};

module.exports = config;