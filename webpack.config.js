module.exports = {
  entry: './js/index.es6.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /(es6\.js)|(\.jsx)$/, exclude: /node_modules|vendor/, loader: 'babel-loader'}
    ]
  }
};