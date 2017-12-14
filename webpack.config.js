path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');

module.exports = {
	entry: ['./src/client/index.js'].concat(glob.sync('./src/common/components/**/*.@(sass|scss)')),
	target: 'web',
	output: {
		path: path.resolve(__dirname, '.compiled/dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'src'),
				query: {
					presets: ['env', 'stage-0'],
					plugins: [
						'transform-react-jsx',
						['transform-runtime', {
							'helpers': false,
							'polyfill': false,
							'regenerator': true,
							'moduleName': 'babel-runtime'
						  }]
					]
				}
			},
			{
				test: /\.(sass|scss)$/,
				loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({ // define where to save the file
			filename: 'style.css',
			allChunks: true,
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	}
};
