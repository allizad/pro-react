var webpack = require('webpack');
/*
 * Default webpack configuration for development
 */
 module.exports = {
  devtool: 'eval-source-map',
  entry: [ __dirname + "/app/App.js"],
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel', // ‘babel-loader’ is also a legal name to reference
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}
