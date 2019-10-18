
import MainLayout from './main';

const content = '<div id="app"><MainLayout><slot></slot></MainLayout></div>';

const template = `<!DOCTYPE html>
<html lang="en" style="height: 100%;width: 100%">
<head>
  <title>{{title}}</title>
  <meta name="keywords" :content="keywords">
  <meta name="description" :content="description">
  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  <script src="https://asks.oss-cn-beijing.aliyuncs.com/static/js/vconsole.min.js"></script>
  <link  v-if="isNeedSwiper" rel="stylesheet" href="https://asks.oss-cn-beijing.aliyuncs.com/static/css/swiper_4_2_0.css">
  <link href="https://asks.oss-cn-beijing.aliyuncs.com/static/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
  <link href="https://asks.oss-cn-beijing.aliyuncs.com/static/css/important.css" rel="stylesheet" type="text/css" />
  <script src="https://asks.oss-cn-beijing.aliyuncs.com/static/js/jquery-2.1.3.min.js"></script>
  <script v-if="isNeedSwiper" src="https://asks.oss-cn-beijing.aliyuncs.com/static/js/swiper_4_2_0.js"></script>
  <script v-if="isNeedBig" src="https://asks.oss-cn-beijing.aliyuncs.com/static/js/big.min.js"></script>
</head>
<body :class="baseClass" style="height: 100%;width: 100%;margin: 0px;padding: 0px;font-size: 62.5%;background-color: #FFFFFF;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div id="app">${content}</div>
</body>
<script >
 new VConsole()
</script>
</html>`;

export default {
  name: 'Layout',
  props: [ 'title', 'description', 'keywords', 'isNeedSwiper','isNeedBig' ],
  components: {
    MainLayout
  },
  computed: {
    vTitle() {
      return this.$root.title || this.title || 'Egg + Vue';
    },
    vKeywords() {
      return this.$root.keywords || this.keywords || 'egg, vue, webpack, server side render';
    },
    vDescription() {
      return this.$root.description || this.description || 'egg-vue-webpack server side render';
    },
    baseClass() {
      return this.$root.baseClass;
    }
  },
  template: EASY_ENV_IS_NODE ? template : content
};
