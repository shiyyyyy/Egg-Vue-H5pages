const crypto = require('crypto');
const Controller = require('egg').Controller

class BaseController extends Controller {


  /**
   * 请求接口基类PHP_GET方法
   * @param url
   * @param params
   * @returns {Promise<any>}
   */
  async phpGet(uri, params) {
    try {
      let that =this;
      // 获取接口地址
      const url = this.app.C.url_head[uri.serverENV] + uri.url
      this.logger.info('调用 php get 接口地址：' + url + ', 接口参数：' + JSON.stringify(params))
      // 调用请求方式
      const result = await this.ctx.curl(url, {
        method: 'GET',
        dataType: 'json',
        gzip: true,
        data: params,
        timeout:50000
      })
      this.logger.info('调用 php get 接口数据：' + JSON.stringify(result.data))
      // 返回json数据
      return result.data
    }catch (e) {
      this.logger.error('php接口出错，出错接口：' + JSON.stringify(uri) + ', 接口参数：' + JSON.stringify(params) + ', 错误信息：' + e)
      return Promise.reject(e)
    }
  }

  /**
   * 请求接口基类PHP_GET方法
   * @param url
   * @param params
   * @returns {Promise<any>}
   */
  async phpPost(uri, params) {
    try {
      let that =this;
      // 获取接口地址
      const url = this.app.C.url_head[uri.serverENV] + uri.url
      this.logger.info('调用 php POST 接口地址：' + url + ', 接口参数：' + JSON.stringify(params))
      // 调用请求方式
      const result = await this.ctx.curl(url, {
        method: 'POST',
        dataType: 'json',
        gzip: true,
        data: params,
        timeout:50000
      })
      this.logger.info('调用 php POST 接口数据：' + JSON.stringify(result.data))
      // 返回json数据
      return result.data
    }catch (e) {
      this.logger.error('php接口出错，出错接口：' + JSON.stringify(uri) + ', 接口参数：' + JSON.stringify(params) + ', 错误信息：' + e)
      return Promise.reject(e)
    }
  }

  /**
   * 请求接口基类JAVA_GET方法
   * @param uri 接口地址
   * @param params 请求参数
   * @return {Promise<any>}z
   */
  async javaGet(uri, params) {
    try {
      // 获取接口地址
      const url = this.app.C.url_head[uri.serverENV] + uri.url;
      this.logger.info('调用 java get 接口地址：' + url + ', 接口参数：' + JSON.stringify(params));
      // 调用请求方式, 必须是get请求
      const result = await this.ctx.curl(url, {
        method: 'get',
        // dataType: 'json',
        data: params,
        timeout:50000
      });
      this.logger.info('调用 java get 接口数据：' + JSON.stringify(decodeURIComponent(result.data)));
      // 返回json数据
      return JSON.parse(decodeURIComponent(result.data));
    } catch (e) {
      this.logger.error('java接口出错，出错接口：' + JSON.stringify(uri) + ', 接口参数：' + JSON.stringify(params) + ', 错误信息：' + e);
      return Promise.resolve(e);
    }
  }

  /**
   * 请求接口基类JAVA_POST方法
   * @param uri 接口地址
   * @param params 请求参数
   * @return {Promise<any>}
   */
  async javaPost(uri, params) {
    try {
      // 获取接口地址
      const url = this.app.C.url_head[uri.serverENV] + uri.url;
      this.logger.info('调用 java post 接口地址：' + url + ', 接口参数：' + JSON.stringify(params));
      // 调用请求方式, 必须是get请求
      const result = await this.ctx.curl(url, {
        method: 'post',
        // dataType: 'json',
        data: params,
        timeout:50000
      });
      this.logger.info('调用 java post 接口数据：' + JSON.stringify(decodeURIComponent(result.data)));
      // 返回json数据
      return JSON.parse(decodeURIComponent(result.data));
    } catch (e) {
      this.logger.error('java接口出错，出错接口：' + JSON.stringify(uri) + ', 接口参数：' + JSON.stringify(params) + ', 错误信息：' + e);
      return Promise.resolve(e);
    }
  }
  /**
   * 错误数据输出
   * @param e 错误信息
   */
  error(e) {
    if (!this.ctx.body){
      this.ctx.body =  this.config.errMsg
      this.logger.error('错误信息：' + e)
      this.logger.error('错误位置：' + e.stack)
    }
  }
  async render(target,params){
    console.log("我要打印status")
    console.log(params)
    if(params.resultInfo!=undefined){
      if(params.resultInfo.status == 'L00001'){
        await this.ctx.render('404/404.js',{resultInfo:params});
      }else{
        Object.assign(params,{pageUrlHead:this.app.C.pageUrlHead})
        await this.ctx.render(target,params);
      }
    }else{
      Object.assign(params,{pageUrlHead:this.app.C.pageUrlHead})
      await this.ctx.render(target,params);
    }
    
    
  }
  // /**
  //  * 防止404刷新
  //  * @returns {Promise<void>}
  //  */
  // async noPage() {
  //   await this.ctx.redirect('/');
  // }

  /**
   * 拼接字符串
   * @param {*} args
   */
  rawString(args, token) {
    let keys = Object.keys(args);
    keys = keys.sort();
    const newArgs = {};
    keys.forEach(function(key) {
      newArgs[key] = args[key];
    });
    let string = '';
    for (const k in newArgs) {
      string += '&' + k + '=' + newArgs[k];
    }
    if (string.length !== 0) {
      string = string.substr(1) + token;
    } else {
      string = token;
    }
    return string;
  }
  /**
   * 签名
   * @param {*} url
   */
  sign(t,token,ret) {
    const _this = this;
    let params = {
      ip:t.ctx.request.ip
    }
    ret = Object.assign(ret, params)
    const string = _this.rawString(ret, token);
    const str = _this.md5(string);
    return str;
  }
  md5(msg) {
    return crypto.createHash('md5').update(msg.toString()).digest('hex')
      .toLowerCase();
  }
}

module.exports = BaseController;
