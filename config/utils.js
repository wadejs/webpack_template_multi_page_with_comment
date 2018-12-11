/*
 * @Author: wadejs
 * @Date: 2018-12-11 16:09:13
 * @GitHub: 'https://github.com/wadejs'
 * @Blog: 'http://blog.wadejs.cn'
 * @Last Modified by:   wadejs
 * @Last Modified time: 2018-12-11 16:09:13
 */
const glob = require('glob')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

/**
* @description 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
*/
const PAGE_PATH = path.resolve(__dirname, '../src/pages')

/**
* @description 
* 多入口配置
* 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
* 么就作为入口处理
*/
exports.entries = function () {
  let entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
  let map = {}
  entryFiles.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    map[filename] = filePath
  })
  return map
}

/**
* @description 
* 多页面输出配置
* 与上面的多页面入口配置相同，
* 读取pages文件夹下的对应的html后缀文件，然后放入数组中
*/
exports.htmlPlugin = function () {
  let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
  let arr = []
  entryHtml.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    let conf = {
      // 模板来源
      template: filePath,
      // 文件名称
      filename: filename + '.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: ['manifest', 'vendor', filename],
      inject: true
    }
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      })
    }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}
