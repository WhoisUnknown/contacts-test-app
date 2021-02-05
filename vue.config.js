const path = require('path');
module.exports = {
  lintOnSave: false,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  configureWebpack: {
    resolve: {
      alias: {
        '@pages': path.join(__dirname, 'src/pages'),
        '@layouts': path.join(__dirname, 'src/layouts'),
        assets: path.join(__dirname, 'src/assets'),
      },
    },
  },
};
