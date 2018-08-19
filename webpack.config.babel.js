/* global __dirname */
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

export default {
	entry: [
		'./app/index.jsx'
	],
	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'app.bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			title: 'Book Tracker | Apply What You Learn',
			template: './app/assets/index.html',
			favicon: './app/assets/favicon.png',
			inject: 'body',
			files: {
				js: ['dist/app.bundle.js'],
				css: ['semantic/semantic.min.css']
			}
		})
	],
	resolve: {
		extensions: ['.js', '.jsx', '.css']
	}
};
