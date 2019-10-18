/**
 * 规范: 驼峰命名方式，开头小写，第二个字母大小。
 * 按模块注释开始与结束
 * 每个模块之间用两行空行分隔
 * 接口注释在右侧，必须写
 * 常用的接口放入公共模块中，比如：检查是否开户，风险测评等。
 */

module.exports = {
    //**************************************** 首页 **************************************************//
    index:{url:'/index/index',serverENV:'p'}, //商城首页
    //**************************************** 首页 **************************************************//


    //**************************************** 商品 **************************************************//
    getGoodsList: {url: '/index/goods',serverENV:'p'},  // 商品列表
    getSpecial: {url: '/index/special',serverENV:'p'},  // 商品专区
    category:{url:'/index/category ',serverENV:'p'},//商品一级分类
    categoryChildren:{url:'/index/children',serverENV:'p'},//商品一级分类其他子类数据获取
    goodsDetail:{url:'/index/detail',serverENV:'p'},//商品详情
    getGoodsContent:{url:'/index/content_show',serverENV:'p'},//商品介绍
    getGoodsPrice:{url:'/index/price',serverENV:'p'},//商品价格
    //**************************************** 商品 **************************************************//
}




