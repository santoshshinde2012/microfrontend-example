const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;

module.exports = {
  output: {
    publicPath: 'http://localhost:3002/',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  devServer: {
    port: 3002,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource'
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dogs',
	  library: { type: "var", name: "dogs" },
      filename: 'remoteEntry.js',
      exposes: {
        '.': './src/App',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
		  eager: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
		  eager: true,
          requiredVersion: deps['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
		  eager: true,
          requiredVersion: deps['react-router-dom'],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};
