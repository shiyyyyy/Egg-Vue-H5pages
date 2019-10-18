module.exports = app => {

    //分类
    const {router,controller} = app;
    const classificationRouter = router.namespace('/classification');

    classificationRouter.get('/district', app.controller.classification.district.district);//商城专区
    classificationRouter.post('/getDistrict', app.controller.classification.district.getDistrict);//商城专区上拉加载
    classificationRouter.get('/goodsList', app.controller.classification.goodsList.goodsList);//二级分类-商品列表
    classificationRouter.post('/getGoodsList', app.controller.classification.goodsList.getGoodsList);//二级分类-商品列表上拉加载
    // yxj
    classificationRouter.get('/category', app.controller.classification.goodsList.category); //商品一级分类
    classificationRouter.post('/getCategory', app.controller.classification.goodsList.getCategory); //商品一级分类切换
    classificationRouter.get('/goodsDetail', app.controller.classification.goodsList.goodsDetail); //商品详情
    classificationRouter.post('/getGoodsContent', app.controller.classification.goodsList.getGoodsContent); //商品介绍
    classificationRouter.post('/getGoodsPrice', app.controller.classification.goodsList.getGoodsPrice);//商品价格
};
