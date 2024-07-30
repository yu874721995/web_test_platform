const path = require('path');

const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const zlib = require('zlib')
const isProduction = process.env.NODE_ENV === 'production'


module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 8001,
        disableHostCheck: true,
        proxy: {                      //vue-cli3以上的是proxy
            "/api": {         //自己随便起的名字
                target: 'http://test-platform.xms-prod.yintaerp.com',    //你要访问的服务器的ip，如果不知道,打开cmd，输入ipconfig查看ipv4即可,
                changeOrigin: true,
                ws: true,
            }
        }
    },
    // 配置webpack
    configureWebpack: {
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './src'),
            '@i': path.resolve(__dirname, './src/assets'),
          }
        },
        plugins: [
          new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
          // 下面两项配置才是 compression-webpack-plugin 压缩配置
          // 压缩成 .gz 文件
          new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
          }),
          // 压缩成 .br 文件，如果 zlib 报错无法解决，可以注释这段使用代码，一般本地没问题，需要注意线上服务器会可能发生找不到 zlib 的情况。
          new CompressionPlugin({
            filename: '[path][base].br',
            algorithm: 'brotliCompress',
            test: /\.(js|css|html|svg)$/,
            compressionOptions: {
              params: {
                [zlib.constants.BROTLI_PARAM_QUALITY]: 11
              }
            },
            threshold: 10240,
            minRatio: 0.8
          })
        ],
        // 开启分离 js
        optimization: {
          runtimeChunk: 'single',
          splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 20000,
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name (module) {
                  // get the name. E.g. node_modules/packageName/not/this/part.js
                  // or node_modules/packageName
                  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                  // npm package names are URL-safe, but some servers don't like @ symbols
                  return `npm.${packageName.replace('@', '')}`
                }
              }
            }
          }
        }
      }
}
