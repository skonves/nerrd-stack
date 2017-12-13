path = require('path');

module.exports = {
	entry: ['./src/client/index.js'],
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
						'transform-react-jsx'
					]
				}
			},
			{
				test: /\.css$/,
				loader: 'style!css',
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	}
};
