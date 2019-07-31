const path = require('path')

module.exports = {
    watchOptions: {
        poll: true,
        ignored: /node_modules/
    },
    entry: {
        "app.js": './client/index.js',
    },
    output: {
        path: path.resolve(__dirname, './public/js'),
        filename: '[name]',
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                },

            },
            {
                test: /\.(sass|scss|css)$/,
                loader: 'style-loader!css-loader!resolve-url-loader!sass-loader?sourceMap'
            },
        ]
    }
}