import axios from 'axios';

function getCookie(name) {
  let arr;
  const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
axios.defaults.timeout =  30000;
axios.interceptors.request.use(async (config) => {
  console.info('进入axios请求前拦截器')
  const csrfToken = getCookie('csrfToken');
  if(csrfToken != null){
    config.headers['x-csrf-token'] = csrfToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  return res.data;
}, (error) => {
  // 返回 response 里的错误信息
  return Promise.reject(error); // 返回接口返回的错误信息
});

export default class axiosRequest {
  static async getRequest(params) {
    console.info('进入axios.get')
    const response = await axios.get(params.url,{});
    return response;
  }

  static async postRequest(params) {
    console.info('进入axios.post')
    if (params.url === undefined) {
      const response = await axios.post(params.get('url'), params);
      return response;
    } else {
      const response = await axios.post(params.url, params);
      return response;
    }
  }
}

