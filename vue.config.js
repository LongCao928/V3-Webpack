const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const webpack = require('webpack')
// const WebpackBar = require('webpackbar')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'dist',
  assetsDir: 'static',
  // 是否开启 eslint 自动校验
  lintOnSave: true,
  // 不输出 map 文件，以加速生产环境构建
  productionSourceMap: false,
  devServer: {
    hot: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://jsonplaceholder.typicode.com/',
        ws: true,
        pathRewrite: {
          '^/api/': ''
        },
        changeOrigin: true,
        secure: false
      }
    }
  },
  configureWebpack: () => {
    const config = {
      name: 'V3-webpack',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src')
        },
        fallback: {
          // 默认情况下，webpack5 不再包含用于 node.js 模块的 polyfills，所以引入 path-browserify
          path: require.resolve('path-browserify')
        }
      },
      plugins: [
        new webpack.ProvidePlugin({
          _: 'lodash'
        }),
      ]
    }
    if (process.env.NODE_ENV === 'production') {
      /* config.plugins.push[
        new WebpackBar({
          // webpack 配置的项目名称
          name: 'v3-webpack'
        })
      ], */
      // 生产环境清除 console.log
      config.optimization = {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              mangle: true,
              compress: {
                warnings: false,
                drop_console: false,
                drop_debugger: false,
                // 清除 console.log
                pure_funcs: ['console.log']
              },
              output: {
                // 删除注释
                comments: false
              }
            }
          })
        ]
      }
    }
    return config
  },
  chainWebpack: config => {
    // 当有很多页面时，它会导致太多毫无意义的请求
    config.plugins.delete('prefetch')
    // 开发环境 sourcemap 不包含列信息
    config.when(process.env.NODE_ENV === 'development',
      config => config.devtool('cheap-source-map')
    )
    /* config.module.rule('eslint').use('eslint-loader').options({
      fix: true
    }) */
    // svg
    // const dir = path.resolve(__dirname, 'src/icons/svg')
    /*config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include
      .add(dir)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ extract: false })
      .end()
    config.plugin('svg-sprite')
    .use(require('svg-sprite-loader/plugin')),
    [{ pluginSprite: true }]
    config.module
    .rule('svg')
    .exclude
    .add(dir)*/
    // 将运行代码单独生成文件
    if (process.env.NODE_ENV !== 'development') {
      config.cache({
        // 将缓存类型设置为 filesystem, 默认是 memory
        type: 'filesystem',
        buildDependencies: {
          // 更改配置文件时重新缓存
          config: [__filename]
        }
      })
      config.optimization.runtimeChunk('single')
    }
  }
})
