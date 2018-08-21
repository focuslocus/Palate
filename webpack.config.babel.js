/* global __dirname */
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
	entry: [
		'./app/index.tsx'
	],
	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'app.bundle.js',
		publicPath: '/'
	},
	devtool: "devtool",
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				loader: 'awesome-typescript-loader',
				exclude: /node_modules/,
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'React / Typescript Frontend Boilerplate',
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
		extensions: ['.ts', '.tsx', '.js', '.css', 'json']
	},
	devServer: {
		contentBase: resolve(__dirname, './dist/'),
		port: 5000
	}
};
