import Vue from 'vue';

import Layout from 'component/layout/standard';
import axiosRequest from '../../utils/axios';
import { Lazyload  } from 'mint-ui';

Vue.use(Lazyload, {
    preLoad: 1.3,
    error: 'https://asks.oss-cn-beijing.aliyuncs.com/consumStageWeb/img/loadingImg.png',
    loading: 'https://asks.oss-cn-beijing.aliyuncs.com/consumStageWeb/img/loadingImg.png',
    attempt: 1
  })
Vue.component(Layout.name, Layout);
Vue.prototype.$http = axiosRequest;

// Vue.prototype.$urlHead= 'http://192.168.50.82:10051'
// Vue.prototype.$urlHead= 'http://47.97.46.201:10051'