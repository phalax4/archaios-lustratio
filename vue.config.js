module.exports = {
    configureWebpack: {
      // It will be merged into the final Webpack config
      node: {
        fs: 'empty'
      }
    }
  }