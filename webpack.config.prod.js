/*
 * @Author: wadejs
 * @Date: 2018-12-11 16:08:56
 * @GitHub: 'https://github.com/wadejs'
 * @Blog: 'http://blog.wadejs.cn'
 * @Last Modified by:   wadejs
 * @Last Modified time: 2018-12-11 16:08:56
 */
const merge = require('webpack-merge')
const mainConfig = require('./webpack.config')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin') // 打包前清理产出目录
module.exports = merge(mainConfig, {
  devtool: false,
  plugins: [
    /**
    * @description 每次打包会先清空dist目录
    */
    new CleanWebpackPlugin(['dist']),
    new UglifyWebpackPlugin() // 压缩js
  ]
})
