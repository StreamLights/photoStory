var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.join(__dirname, '/dist/assets'),
        filename: '[name].bunle.js'
    },
    resolve: {
        alias: {
            // 默认 NPM 包导出的是运行时构建，为了使用独立构建，在webpack配置中添加下面的别名。  就是说单文件组件使用不了的使用配置
            'vue': 'vue/dist/vue.js'  // Replace modules with other modules or paths.
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new webpack.optimize.OccurrenceOrderPlugin(), // 用途：排序输出 通过模块调用次数给模块分配ids，常用的ids就会分配更短的id，使ids可预测，减小文件大小，推荐使用
        new webpack.HotModuleReplacementPlugin(),  //启用热替换模块(Hot Module Replacement)，也被称为 HMR。W> 永远不要在生产环境(production)下启用 HMR
        new webpack.NoEmitOnErrorsPlugin(),  // 用来跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
        new webpack.DefinePlugin({     // 通过配置了DefinePlugin，那么这里面的标识就相当于全局变量
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};