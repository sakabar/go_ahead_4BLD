module.exports = {
  context: __dirname + '/src/js',
  entry: {
    'index': './index',
    '5bld': './5bld.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
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
