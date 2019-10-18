'use strict';
const path = require('path');
const config = require('./config/web/c')[process.env.NODE_ENV];
const oos = require('./config/deployOss');
let UPLOAD_CDN = process.env.UPLOAD_CDN;
module.exports = {
  egg: true,
  framework: 'vue',
  entry: {
    include: ['app/web/page'],
    exclude: ['app/web/page/[a-z]+/component', 'app/web/page/example'],
    loader: {
      client: 'app/web/framework/vue/entry/client-loader.js',
      server: 'app/web/framework/vue/entry/server-loader.js',
    }
  },
  alias: {
    server: 'app/web/framework/vue/entry/server.js',
    client: 'app/web/framework/vue/entry/client.js',
    asset: 'app/web/asset',
    component: 'app/web/component',
    framework: 'app/web/framework',
    vue: 'vue/dist/vue.esm.js'
  },
  dll: ['vue', 'axios'],
  loaders: {
    sass: {
      options: {
        includePaths: [
          path.resolve(process.cwd(), 'app/web/page')
        ]
      }
    },
    scss: {
      options: {
        includePaths: [
          path.resolve(process.cwd(), 'app/web/page')
        ]
      }
    },
    less: {
      options: {
        includePaths: [
          path.resolve(process.cwd(), 'app/web/page')
        ]
      }
    }
  },
  plugins: {},
  cdn: UPLOAD_CDN ? { url: config.cdn } : {},
  publicPath: UPLOAD_CDN ? '/' : '/public',
  done() {
    if (UPLOAD_CDN) {
      // 上传静态文件到oss,延时500毫秒等控制台把webpack打包信息输出后，再输出上传信息
      setTimeout(() => {
        oos.upload()
      }, 500)
    }
  }
};