/**
 * Created by yhf on  2019/7/22
 */

const BaseController = require('../base');

class GoodsListController extends BaseController {
    /**
     * 二级分类
     */
    async goodsList() {
        const { ctx, app } = this;
        try {
            let Id = this.ctx.request.query.Id;//分类ID
            const result = await this.phpGet( app.I.getGoodsList, {c_id:Id});
            await this.render('classification/goodsList.js',{result,token:ctx.request.query.token || '',mobileType:ctx.request.query.type,c_id:Id});
        } catch (e) {
            await this.render('404/404.js',{mobileType:ctx.request.query.type,title:"商品列表"});
        }
    }
    /**
     * 二级分类-上拉加载
     */
    async getGoodsList() {
        const { ctx, app } = this;
        try {
            const page = this.ctx.request.body.page;
            let Id = this.ctx.request.body.Id;//分类ID
            const result = await this.phpGet( app.I.getGoodsList, {page:page,c_id:Id});
            console.info(result)
            this.ctx.rotateCsrfSecret();
            this.ctx.body = {result}
        } catch (e) {
            this.error(e)
        }
    }
    //商品一级分类获取 返回第一个类的数据
    async category() {
        const { ctx, app } = this;
        try {
            const resultInfo = await this.phpGet( app.I.category, {});
            resultInfo.children_list = resultInfo.category_list[0].child;
            if(resultInfo.children_list.length%3 == 2){
                resultInfo.children_list  =  resultInfo.children_list .concat({"id": -1,"name": "","type":0});
            }
            resultInfo.activity = resultInfo.category_list[0].id;
            await this.render('classification/category.js',{resultInfo,token:ctx.request.query.token || '',mobileType:this.ctx.request.query.type});
        } catch (e) {
            await this.render('404/404.js',{mobileType:this.ctx.request.query.type,title:"商城分类"});
        }
      }
   //商品一级分类切换 
      async getCategory() {
        const { ctx, app } = this;
        try {
            const resultInfo = await this.phpGet( app.I.categoryChildren , {c_id:this.ctx.request.body.id});
            if(resultInfo.children_list.length%3 == 2){
                resultInfo.children_list  =  resultInfo.children_list .concat({"id": -1,"name": "","type":0});
            }
            this.ctx.rotateCsrfSecret();
            this.ctx.body = resultInfo;
        } catch (e) {
            this.error(e)
        }
      }
          //商品详情
    async goodsDetail() {
        const { ctx, app } = this;
        let resultInfo;
        console.log(ctx.request.query)
        try {
            
            // const params = {
            //     g_id:ctx.request.query.Id,
            //     token:ctx.request.query.token || ''
            // };
            const order = ctx.request.query.order || '';
            if(ctx.request.query.token){
                var params = {
                    g_id:ctx.request.query.Id,
                    token:ctx.request.query.token
                };
            }else{
                var params = {
                    g_id:ctx.request.query.Id,
                    // token:''
                };
            }
            console.log(params)
            resultInfo = await this.phpGet( app.I.goodsDetail, params);
            resultInfo.thumb_list.unshift(resultInfo.thumb);
            resultInfo.order = order;
            const arr = resultInfo.desc;
            var desc = '';
            for(let i = 0;i < arr.length;i++){
                desc+=arr[i];
                if(i != arr.length-1){
                    desc+='<i style="margin:0 7px;font-style:normal;">|</i>'
                }
            }
            resultInfo.desc = desc
            this.ctx.rotateCsrfSecret();
            await this.render('classification/goodsDetail.js',{resultInfo,token:ctx.request.query.token || '',mobileType:this.ctx.request.query.type});
        } catch (e) {
            console.log(this.ctx.request.query.type)
            await this.render('404/404.js',{resultInfo,mobileType:this.ctx.request.query.type,title:"商品详情"});
        }
      }

      async getGoodsContent() {
        const { ctx, app } = this;
        try {
            const params = {
                g_id: this.ctx.request.body.g_id
            };
            const resultInfo = await this.phpGet(app.I.getGoodsContent , params);
            this.ctx.rotateCsrfSecret();
            this.ctx.body = resultInfo;
        } catch (e) {
            this.error(e)
        }
      }

   //商品价格
      async getGoodsPrice() {
        const { ctx, app } = this;
        try {
            const params = {
                af_id: this.ctx.request.body.af_id,
                as_id: this.ctx.request.body.as_id,
                g_id: this.ctx.request.body.g_id,
                cycle: this.ctx.request.body.cycle 
            };
            const resultInfo = await this.phpGet( app.I.getGoodsPrice , params);
            this.ctx.rotateCsrfSecret();
            this.ctx.body = resultInfo;
        } catch (e) {
            this.error(e)
        }
      }
}

module.exports = GoodsListController;
