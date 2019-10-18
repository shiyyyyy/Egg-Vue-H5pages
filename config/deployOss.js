/**
 * Created by gaoqiang on 2018/5/15.
 */
const co = require('co');
const OSS = require('ali-oss');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const config = require('./web/c')[process.env.NODE_ENV]
const ossBasePath = 'consumStageWeb/'

const localFolderName = 'public';

/**
 * 阿里云oss自动上传静态文件
 * @type {Promise<undefined>}
 */
class deployOss {

  /**
   * 上传静态文件到oss方法
   * @returns {Promise<void>}
   */
  async upload() {
    // 阿里oss配置对象
    const client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAIkBVHOaXvMUkm',
      accessKeySecret: 'jVZMAMQEWXl0K1XwXU2T3INxr5fWuY',
      bucket: 'asks'
    });
    // //文件列表
    const filesList = [];
    // //读取本地需要上传文件
    travel(path.join(__dirname, '..', localFolderName), filesList);
    console.info('***************************');
    console.info(filesList);
    console.info('***************************');
    // //遍历上传文件
    filesList.forEach(function(filename, index) {
      co(function* () {
        // 上传文件路径
        const fn = filename.split('/' + localFolderName + '/')[1]
        console.log('正在上传文件(%s/%s):%s...', index + 1, filesList.length, fn)
        // oss上传文件路径
        const oosPathName = config.cdn.substring(config.cdn.indexOf(ossBasePath), config.cdn.length) + '/' + fn
        console.log('oss上传文件路径: ' + oosPathName)
        // 上传文件
        const result = yield client.put(oosPathName, filename, {timeout:120000})
        console.log('完成上传文件(%s/%s):%s', index + 1, filesList.length, fn)
      });
    });
  }
}

/**
 * 循环遍历目录与文件
 * @param dir 目录
 * @param filesList 文件列表
 */
function travel(dir, filesList) {
  fs.readdirSync(dir).forEach(function(file) {
    const pathname = path.join(dir, file);
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, filesList);
    } else {
      filesList.push(pathname);
    }
  });
}

module.exports = new deployOss();
