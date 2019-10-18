/**
 * Created by qianggao on  2019/7/19
 */
'use strict';
const headUrls = {
  dev: {
    j:'http://192.168.50.118:28256/api',
    p:'http://192.168.50.118:28256/api',
  },
  head201: {
    j:'http://192.168.50.118:28256/api',
    p:'http://192.168.50.118:28256/api',
  },
  head210: {
    j:'http://47.105.78.210:11420/yinduo-api',
     p:'http://47.105.78.210:28256/api',
    // j:'https://www.easy-mock.com/mock/5d37adccf20830546044b0a2/api/',
    //p:'http://47.97.46.201:7300/mock/5d3a92816b9cb060d75bf4c4',
  },
  head118: {
    j:'http://192.168.50.118:28256/api',
    p:'http://192.168.50.118:28256/api',
  },
  head39: {
    j:'http://192.168.50.118:28256/api',
    p:'http://192.168.50.118:28256/api',
  },
  testProd:{
    j:'http://192.168.50.118:28256/api',
    p:'http://192.168.50.118:28256/api',
  },
  prod: {
    j:'http://192.168.50.118:28256/api',
    p:'http://192.168.50.118:28256/api',
  }
};

module.exports = {
  // 开发环境
  development: {
    port: 10041,
    alinode: {
      enable: false, // 是否启动alinode
      id: '2409',
      secret: 'cc554d6511838df47854f7e314442cd5f7a77b8a',
    },
    // 端口号
    api: {
      url_head: headUrls.head117, // 接口地址
      options: {
        json: true, // 是否是json
        gzip: true, // 是否gzip
        timeout: 55000, // 超时时间
      },
      pageUrlHead:'http://47.97.46.201:10051'
    },
  },
  // 测试环境
  test210: {
    port: 10041,
    cdn: 'http://asks.oss-cn-beijing.aliyuncs.com/consumStageWeb/test210/dist_082801',
    alinode: {
      enable: false, // 是否启动alinode
      id: '2409',
      secret: 'cc554d6511838df47854f7e314442cd5f7a77b8a',
    },
    // 端口号
    api: {
      url_head: headUrls.head210, // 接口地址
      options: {
        json: true, // 是否是json
        gzip: true, // 是否gzip
        timeout: 55000, // 超时时间
      },
      pageUrlHead:'http://47.105.78.210:10041'
    },
  },
  test118: {
    port: 10041,
    cdn: 'http://asks.oss-cn-beijing.aliyuncs.com/consumStageWeb/test118/dist_012401',
    alinode: {
      enable: false, // 是否启动alinode
      id: '2409',
      secret: 'cc554d6511838df47854f7e314442cd5f7a77b8a',
    },
    // 端口号
    api: {
      url_head: headUrls.head118, // 接口地址
      options: {
        json: true, // 是否是json
        gzip: true, // 是否gzip
        timeout: 55000, // 超时时间
      },
      pageUrlHead:'http://47.97.46.201:10051'
    },
  },
  // 生产环境
  prod: {
    port: 10041,
    alinode: {
      enable: false, // 是否启动alinode
      id: '2409',
      secret: 'cc554d6511838df47854f7e314442cd5f7a77b8a',
    },
    // 端口号
    api: {
      url_head: headUrls.prod, // 接口地址
      options: {
        json: true, // 是否是json
        gzip: true, // 是否gzip
        timeout: 55000, // 超时时间
      },
      pageUrlHead:'http://47.97.46.201:10051'
    },
  },
};
