const path = require('path')
const SimpleWebpackHTMLEntrypoint = require('simple-webpack-html-entrypoint')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        contentBase: path.join(__dirname, 'build','dist'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true // only errors & warns on hot reload
    },
    entry: {
        index: './src/example/index.ts',
    },
    output: {
        path: path.join(__dirname, 'build', 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    name: 'common',
                    chunks: 'all',
                    minSize: 0,
                    minChunks: 2 //模块被引用2次以上的才抽离
                },
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 1,
                },

            }
        }
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@c': path.resolve(__dirname, './src/components'),
            '@d': path.resolve(__dirname, './src/def'),
            '@s': path.resolve(__dirname, './src/shortcut'),
            '@src': path.resolve(__dirname, './src'),
        }
    },
    plugins: [
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            reportFilename: 'bundle-analyzer-report.html'
        }),
        new SimpleWebpackHTMLEntrypoint()
    ]
}
