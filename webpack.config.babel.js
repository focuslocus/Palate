/* global __dirname */
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

export default {
	entry: [
		'./app/index.tsx'
	],
	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'app.bundle.js',
		publicPath: '/'
	},
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
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
		extensions: ['.ts', '.tsx', '.js', '.css']
	},
	devServer: {
		contentBase: resolve(__dirname, './dist'),
		port: 5000
	},
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	}
};
