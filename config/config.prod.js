/**
 * 生产环境配置
 *
 * 最终生效的配置为 prod + default（前者覆盖后者）
 */
const config = require('./web/c')[process.env.EGG_SERVER_ENV || 'development']

module.exports = app => {
  const exports = {};


  if (config.alinode.enable) {
    // 阿里性能平台配置
    exports.alinode = {
      // 从 `Node.js 性能平台` 获取对应的接入参数
      server: 'wss://agentserver.node.aliyun.com:8080',
      appid: config.alinode.id,
      secret: config.alinode.secret,
      logdir: config.alinode.logdir
    }
  }

  return exports;
};
