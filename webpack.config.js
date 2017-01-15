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
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'src'),
				query: {
					presets: ['es2015', 'stage-0'],
					plugins: [
						'transform-object-rest-spread',
						'transform-es2015-destructuring',
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
		extensions: ['', '.js', '.jsx'],
	}
};
