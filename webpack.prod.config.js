/**
 * Created by aresn on 16/7/5.
 */

var webpack = require('webpack');
var config = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');

// config.output.publicPath = 'https://file.iviewui.com/dist/';
config.output.publicPath = '/dist/';
config.output.filename = '[name].[hash].js';                 // 带hash值的入口js名称
config.output.chunkFilename = '[name].[hash].chunk.js';      // 带hash值的路由js名称

config.module.rules[0].options = {
    loaders: {
        // css: ExtractTextPlugin.extract(
        //     "style-loader",
        //     "css-loader",
        //     {
        //         publicPath: "https:\\file.iviewui.com/dist/"
        //         // publicPath: "/dist/",
        //     }
        // ),
        // less: ExtractTextPlugin.extract(
        //     'vue-style-loader',
        //     'css-loader!less-loader'
        // ),
        // sass: ExtractTextPlugin.extract(
        //     'vue-style-loader',
        //     'css-loader!sass-loader'
        // )
    }
};

config.plugins = (config.plugins || []).concat([
    new ExtractTextPlugin({
        filename: '[name].[hash].css',
        allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: 'vendors.[hash].js'
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new HtmlWebpackPlugin({
        filename: '../index_prod.html',
        template: './src/template/index.ejs',
        inject: false
    })
]);

// 写入环境变量
fs.open('./src/config/env.js', 'w', function (err, fd) {
    var buf = 'export default "production";';
    fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){});
});

module.exports = config;