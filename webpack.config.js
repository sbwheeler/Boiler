const path = require('path');

module.exports = {
  entry: './browser/index.jsx', // the starting point for our program
  output: {
    path: path.join(__dirname, '/browser'), // absolute path for the directory where we want the output to be placed
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2'],
        },
      },
      { test: /\.scss?$/, loaders: ['style', 'css', 'sass'] },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
        loader: 'file',
      },
    ],
  },
};
