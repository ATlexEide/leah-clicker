const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, 'src/js/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
              {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/source',
      },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '',
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html')
        }),
    ],
}