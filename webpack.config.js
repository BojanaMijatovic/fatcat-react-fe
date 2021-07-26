const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	target: 'web',
	output: { path: path.join(__dirname, 'build'), filename: 'index.bundle.js' },
	mode: process.env.NODE_ENV || 'development',
	devServer: {
		inline: true,
		port: 3000,
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.(js|ts|tsx)$/,
				loader: 'awesome-typescript-loader',
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(css|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
				use: ['file-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'public', 'index.html'),
		}),
	],
};
