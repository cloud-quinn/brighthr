const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	"entry": {
		"main": "./src/index.js",
		//"app": "./src/App.jsx",
		//"pages": "./src/Pages/index.js"
	},
	"output": {
		"path": __dirname+"/dist",
		"filename": "[name].[chunkhash:8].js"
	},
	"devtool": "source-map",
	"devServer": {
		"port": 3000,
		"publicPath": "/",
		"historyApiFallback": true
	},
	"module": {
		"rules": [
		{
			"test": /\.(js|jsx)$/,
			"exclude": /node_modules/,
			"loader": require.resolve("babel-loader"),
		},
		{
			"test": /\.(svg|eot|ttf|woff|jpg|png|ico)$/,
			"exclude": /node_modules/,
			"loader": "file-loader",
		},
		{
			"test": /\.(txt|xml)$/,
			"loader": "file-loader",
			"options": {
				"name": '[name].[ext]'
			}
		}
		]
	},
	"plugins": [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			"template": "./src/index.html"
		}),
	],
	"output": {
		"chunkFilename": "[name].[chunkhash].js",
		"filename": "[name].[chunkhash].js"
	},
	"mode": "development",
	"optimization": {
		"minimizer": [new UglifyJsPlugin({
			"uglifyOptions": {
				"output": {
					"comments": false
				},
			}})],
		"splitChunks": {
			"cacheGroups": {
				"vendors": {
					"priority": -10,
					"test": /[\\/]node_modules[\\/]/
				},
				"styles": {
					"name": 'styles',
					"test": /\.css$/,
					"chunks": 'all',
					"enforce": true,
				}
			},

			"chunks": "async",
			"minChunks": 1,
			"minSize": 30000,
			"name": true
		}
	}
};
