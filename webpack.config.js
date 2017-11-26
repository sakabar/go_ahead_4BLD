module.exports = {
  context: __dirname + '/src/js',
  entry: {
    'index': './index',
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      }
    ]
  }
};
