/*
 * @Author: wadejs
 * @Date: 2018-12-11 16:08:50
 * @GitHub: 'https://github.com/wadejs'
 * @Blog: 'http://blog.wadejs.cn'
 * @Last Modified by:   wadejs
 * @Last Modified time: 2018-12-11 16:08:50
 */

const path = require('path')
// const glob = require('glob') // glob模块允许你使用 *等符号, 来写一个glob规则
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const PurifyCssPlugin = require('purifycss-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const devConf = require('./config')
const utils = require('./config/utils.js')
module.exports = {
  devtool: 'inline-source-map',
  entry: utils.entries(),
  output: {
    path: path.resolve(__dirname, 'dist'),
    /**
    * @description
    * 这里的[name], 跟entry里的key相互对应
    * 如果不设置publicPath，提取出来的css文件中引用的资源会以css文件所在的位子为跟目录去引用资源
    * 就会造成资源路径引用错误（打包后的资源引用路径是以url-loader中定义的outputPath为开头的）
    * 例：css中 background: url(img/be68719a9e63469fb846d7e1dec92b81.png) no-repeat;
    * 这个背景图就会从css的目录中去查找 img/be68719a9e63469fb846d7e1dec92b81.png
    */
    filename: 'static/js/[name].[chunkhash].js',
    publicPath: '/' // 打包生成的html中引用的地址会包括主机（绝对路径）
  },
  resolve: {
    /**
    * @description 可以在引入资源时省略拓展名
    */
    extensions: ['.js', '.vue', '.json', '.styl', '.css', '.scss', '.less'],
    /**
    * @description 为模块设置别名，使引用时更加方便，只需引用这里设置的名字就好，不用写路径
    */
    alias: {
      /**
      * @description 给定对象的键后的末尾添加 $，以表示精准匹配;引入时只需要写vue
      */
      'vue$': 'vue/dist/vue.esm.js',
      'js': path.resolve(__dirname, './src/assets/js/'),
      'css': path.resolve(__dirname, './src/assets/css/'),
      'img': path.resolve(__dirname, './src/assets/img/'),
      '@': path.resolve(__dirname, './src/')
    }
  },
  module: {
    rules: [
      // {
      //   /**
      //   * @description
      //   * 因为有些jquery插件需要用到全局的jq变量，
      //   * 通过expose-loader来把jquery暴露到全局
      //   * 这里只是起到把变量暴露到全局的作用,
      //   * 并不能自动引用相关的模块，
      //   * 所有需要手动引入模块或者通过webpack.ProvidePlugin插件自动引入
      //   */
      //   test: require.resolve('jquery'),
      //   use: [{
      //     loader: 'expose-loader',
      //     options: 'jQuery'
      //   }, {
      //     loader: 'expose-loader',
      //     options: '$'
      //   }]
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          /**
          * @description
          * 不提取成单独的css文件时将样式使用style-loader插入页面
          * 一般来说处理顺序从数组的尾部开始
          * eg. ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'||'less-loader'||'sass-loader']
          */
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        /**
        * @description
        * 处理css预处理语言less
        * 一般来说处理顺序从数组的尾部开始
        * eg. ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'||'less-loader'||'sass-loader']
        */
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      },
      {
        /**
        * @description
        * 处理css预处理语言stylus
        * 一般来说处理顺序从数组的尾部开始
        * eg. ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'||'less-loader'||'sass-loader']
        */
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          }, {
            loader: 'stylus-loader'
          }]
        })
      },
      {
        /**
        * @description
        * 处理css预处理语言scss
        * 一般来说处理顺序从数组的尾部开始
        * eg. ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'||'less-loader'||'sass-loader']
        */
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      // 使用html-loader代替
      // {
      //   /**
      //   * @description
      //   * 打包在html中引用的img
      //   */
      //   test: /\.(htm|html)$/i,
      //   use: ['html-withimg-loader']
      // },
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      },
      {
        /**
        * @description
        * 该loader用于打包图片或文件
        * outputPath定义图片或文件导出的目录（会自动生成）
        * css和html引用资源时会自动带上outputPath的路径
        */
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            outputPath: 'static/imgs/' // 路径为dist下（根据output.path）
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'static/imgs/' // 路径为dist下（根据output.path）
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'static/fonts/' // 路径为dist下（根据output.path）
        }
      },
      {
        /**
        * @description
        * 用babel编译js
        */
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        /**
        * @description
        * 这里匹配到的.html文件需要依赖html-loader或者html-withimg-loader才可使用
        */
        test: /\.(html|js|vue)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter') // 编译后错误报告格式
        }
      }
    ]
  },
  plugins: [
    /**
    * @description 控制台输出
    */
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${devConf.dev.devServer.host}:${devConf.dev.devServer.port}`]
      }
    }),
    /**
    * @description 公共模块拆出来；主要做拆分和在页面上插入script的工作
    */
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: 2
    }),
    /**
    * @description 提取出webpack的运行文件，以防每当更新应用程序包时更新vendor哈希
    */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    /**
    * @description
    * 使用ProvidePlugin加载的模块在使用时将不再需要import和require进行引入;
    * 相当于在所有js里import和require引入了相关的库
    * 主要做的是代替用户引入模块的作用
    * 如果每个文件都要引用某个模块的话可以考虑使用这个插件
    * 这里定义的key就是为所有**模块**中可以使用的变量；但是这些变量在全局中是不存在的，如直接在控制台打印的话是不存在的；
    * 因为他们是被引用到各个单独的模块中的
    * 这里需要注意：通过这个插件引入的变量，eslint会报not defined 的错，
    * 需要处理一下
    * 在.eslintrc.js里配置一下EG. env.jquery = true
    */
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    //   // Vue: ['vue/dist/vue.esm.js', 'default'] // 插件文档里的写法
    // }),
    /**
    * @description 把css提取出来成为文件;路径为dist下（根据output.path）
    */
    new ExtractTextPlugin('static/css/[name].[contenthash].css'),
    // new PurifyCssPlugin({
    //   // 精简css；只会打包有用到的样式；比如引入了bootstrap后使用了一些样式，打包时只会打包有用到的样式
    //   // ***WARN: 有一些动态加载的dom需要使用到的样式不能经过这个插件处理，
    //   // 否则，动态插入的dom将没有样式；因为在打包时页面没有引用相关样式，所以会被过滤掉
    //   paths: glob.sync(path.join(__dirname, 'src/*.html')) // glob模块允许你使用 *等符号, 来写一个glob规则
    // }),
    /**
    * @description 在js文件开头加上相关信息
    */
    new webpack.BannerPlugin('by wadejs'),
    new CopyWebpackPlugin([{
      // 将不经过打包的文件复制资源到产出目录
      from: path.join(__dirname, '/src/static'),
      to: './static',
      ignore: ['.*']
    }])
  ].concat(utils.htmlPlugin()),
  devServer: devConf.dev.devServer
}