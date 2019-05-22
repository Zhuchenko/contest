const path = require('path');
const webpack = require('webpack');
const serverConfig = require('../server/config/production.server.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const root = path.join(__dirname, '..');

module.exports = {
  mode: 'production',

  entry: {
    main: [
      '@babel/polyfill',
      path.join(root, 'client', 'main.js')
    ]
  },

  output: {
    filename: '[name].js',
    path: path.join(root, 'dist', 'public', 'assets'),
    publicPath: serverConfig.assetsRoot
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(root, 'client'),
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader', options: { hmr: false } },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash:5].[ext]'
        }
      }
    ]
  },

  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules\\[*lodash*|react\-dom\-factories]/,
          name: 'vendors',
          chunks: 'initial'
        }
      }
    }
  },

  plugins: [
    new webpack.IgnorePlugin(
        /^\.\/locale$/,
        /moment$/
    ),
    new CopyWebpackPlugin([
      {from: path.join(root, 'public.key'), to: path.join(root, 'dist', 'public.key')},
      {from: path.join(root, 'private.key'), to: path.join(root, 'dist', 'private.key')},
      {from: path.join(root, 'index.js'), to: path.join(root, 'dist', 'index.js')},
      {from: path.join(root, 'package.json'), to: path.join(root, 'dist', 'package.json')},
      {from: path.join(root, 'web.config'), to: path.join(root, 'dist', 'web.config')}
    ])
  ]
};