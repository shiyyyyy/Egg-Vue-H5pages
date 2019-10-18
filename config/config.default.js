const path = require('path');
const fs = require('fs');
const c = require('./web/c')[process.env.EGG_SERVER_ENV || 'development'];
module.exports = app => {
  const exports = {};
  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  };

  exports.view = {
    cache: false
  };

  exports.cluster = {
    listen: {
      port: c.port,
    },
  };

  exports.vuessr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.html'),
    renderOptions: {
      // 告诉 vue-server-renderer 去 app/view 查找异步 chunk 文件
      basedir: path.join(app.baseDir, 'app/view')
    }
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };
  // 错误信息
  exports.errMsg = {
    status: 0,
    msg: '服务器暂无响应, 请稍后再试!',
  };
  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  exports.keys = app.name + '_1551852103446_7789';

  exports.middleware = [
    'access'
  ];

  // 日志
  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs'),
  };

  // 日志按小时分割
  exports.logrotator = {
    filesRotateByHour: [
      path.join(app.baseDir, 'logs', app.name, 'common-error.log'),
    ],
  };
  // 配置csrf
  exports.security = {
    csrf: {
      // headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-tokenß
      queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
    },
    xframe: {
      enable: false,
    },
  };

  return exports;
};
