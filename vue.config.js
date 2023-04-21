const { defineConfig } = require('@vue/cli-service')
// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Vue3-@Vue/cli'
      })
    ]
  },
  // chainWebpack: config => { }
})
