const { defineConfig } = require('@vue/cli-service')
const path = require('path')
// const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  // 不输出 map 文件，以加速生产环境构建
  productionSourceMap: false,
  devServer: {
    hot: true,
    open: true
  },
  configureWebpack: () => {
    return {
      name: 'V3-webpack',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src')
        }
      },
      plugins: [
        // webpack.providPlugin({}),
      ]
    }
  },
  chainWebpack: config => {
    // 当有很多页面时，它会导致太多毫无意义的请求
    config.plugins.delete('prefetch')
    // 开发环境 sourcemap 不包含列信息
    config.when(process.env.NODE_ENV === 'development',
      config => config.devtool('cheap-source-map')
    )
  }
})
