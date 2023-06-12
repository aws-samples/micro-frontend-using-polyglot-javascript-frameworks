const HtmlWebpackPlugin = require('html-webpack-plugin');
const {container, DefinePlugin} = require('webpack');
const path = require('path');
const zlib = require('zlib');
const CompressionPlugin = require("compression-webpack-plugin");
const deps = require("./package.json").dependencies;

module.exports = {
    entry: './src/index',
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'build'),
        },
        port: 8081
    },
    output: {
        publicPath: 'auto',
        path: path.resolve(__dirname, 'build'),
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
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
        new container.ModuleFederationPlugin({
            name: 'reactChartsDataApp',
            filename: 'remoteEntry.js',
            exposes: {
                './ChartData': './src/components/ChartData',
            },
            shared: {
                'react': {
                    singleton: true,
                    eager: true,
                    requiredVersion: deps["react"]
                },
                'react-dom': {
                    singleton: true,
                    eager: true,
                    requiredVersion: deps["react-dom"]
                }
            },
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
        }),
        new DefinePlugin({
            'process.env.CHARTS_BACKEND_API_URL': JSON.stringify(`${process.env.CHARTS_BACKEND_API}`),
        })
    ],
};