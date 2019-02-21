const QiniuPlugin = require('qiniu-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const QN = require('./qn.conf')
const proPublicPath = QN.cdnBase
const isPro = process.env.NODE_ENV === 'production'
const prjectName = process.env.VUE_APP_PROJECT

module.exports = {
  publicPath: isPro ? proPublicPath : '/',
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: false,
      theme: false
    }
  },
  configureWebpack: config => {
    // 生成环境下的webpack配置
    if (isPro) {
      return {
        plugins: [
          new QiniuPlugin({
            ACCESS_KEY: QN.accessKey,
            SECRET_KEY: QN.secretKey,
            bucket: QN.bucket,
            path: `medicine-backend/`,
            // 支持上传的文件
            include: [
              /\.js$/,
              /\.js.gz$/,
              /\.css$/,
              /\.css.gz$/,
              /\.(gif|png|jpe?g|svg)$/,
              /\.(ttf|eot|woff2?)(\?v=[0-9]\.[0.9]\.[0-9])?$/
            ]
          }),
          new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, `../views/${prjectName}.html`),
            template: path.resolve(__dirname, './public/index.html'),
            inject: true,
            minify: {
              removeComments: true,
              collapseWhitespace: true
              // removeAttributeQuotes: true,
            },
            chunksSortMode: 'dependency',
            basePath: './public'
          })
        ]
      }
    }
  }
}
