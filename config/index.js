/*
 * @Author: wadejs
 * @Date: 2018-12-11 16:09:16
 * @GitHub: 'https://github.com/wadejs'
 * @Blog: 'http://blog.wadejs.cn'
 * @Last Modified by: wadejs
 * @Last Modified time: 2018-12-11 16:10:18
 */
module.exports = {
  dev: {
    devServer: {
      clientLogLevel: 'warning',
      /**
      * @description 
      * 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要。
      * 比如 contentBase: path.resolve(__dirname, 'src/public') 这样设置之后
      * 当引用静态资源时只要通过 '/tpl/header.html'来访问就好了，原来则需要'../public/tpl/header.html'这样才能访问
      */
      // contentBase: path.resolve(__dirname, 'src/public'),
      compress: true, // 是否压缩
      host: 'localhost',
      port: 8888,
      inline: true,
      open: false, // 是否自动打开浏览器
      quiet: true // necessary for FriendlyErrorsPlugin
    }
  }
}