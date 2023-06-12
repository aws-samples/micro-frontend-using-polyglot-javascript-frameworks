const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSPlugin = require('mini-css-extract-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const zlib = require('zlib');

let reactChartsDataApp = "reactChartsDataApp@http://localhost:8081/remoteEntry.js"
let angularChartsaApp = "angularChartsApp@http://localhost:8082/remoteEntry.js"

// If REACT_CHARTS_DATA_APP and ANGULAR_CHARTS_APP are exported use the following
if (process.env.REACT_CHARTS_DATA_APP && process.env.ANGULAR_CHARTS_APP) {
  reactChartsDataApp = `reactChartsDataApp@${process.env.REACT_CHARTS_DATA_APP}/remoteEntry.js`
  angularChartsaApp = `angularChartsApp@${process.env.ANGULAR_CHARTS_APP}/remoteEntry.js`
}

module.exports = {
  entry: './src/index',
  mode: 'production',
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    port: 8080,
  },
  output: {
    publicPath: 'auto',
    path: path.resolve(__dirname, 'build')
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/,
        use: [MiniCSSPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader']
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        reactChartsDataApp: reactChartsDataApp,
        angularChartsApp: angularChartsaApp
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "*.png",
          to: "./",
          context: "public",
        },
      ],
    }),
    new MiniCSSPlugin({
      filename: 'style.css'
    }),
    new MiniCSSExtractPlugin({
      filename:'style.[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    })
  ],
};