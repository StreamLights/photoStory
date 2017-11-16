const Koa = require('koa');
const webpack = require('webpack');
const webpackConfig = require('./webpack.base.conf');
//  koa-convert 可以将原来在 koa中使用的中间件转移到koa2中使用
const convert = require('koa-convert');
const koaWebpackMiddleware = require('koa-webpack-middleware');
const webpackDevMiddleware = koaWebpackMiddleware.devMiddleware;
const webpackHotMiddleware = koaWebpackMiddleware.hotMiddleware;

const app = new Koa();

var compile = webpack(webpackConfig);
app.use(webpackDevMiddleware(compile, {
    // display nothing to the console 
    quiet: false,
    // watch options (only lazy: false) 
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    }
}));
app.use(webpackHotMiddleware(compile));
// 在端口3000监听:
app.listen(3000, function () {
    console.log('photoStoryApp started at port 3000...');
});