/**
 * Created by yhf on  2019/7/22
 */

const BaseController = require('../base');

class DistrictController extends BaseController {
    /**
     * 商城专区
     */
    async district() {
        const { ctx, app } = this;
        try {
            let Id = this.ctx.request.query.Id;//专题ID
            const result = await this.phpGet( app.I.getSpecial, {s_id:Id});
            console.info(result)
            await this.render('classification/district.js',{result,token:ctx.request.query.token || '',mobileType:ctx.request.query.type,s_id:Id});
        } catch (e) {
            await this.render('404/404.js',{mobileType:this.ctx.request.query.type,title:"商城专区"});
        }
    }


    /**
     * 商城专区-上拉加载
     */
    async getDistrict() {
        const { ctx, app } = this;
        try {
            const page = this.ctx.request.body.page;
            let Id = this.ctx.request.body.Id;//专题ID
            console.info(page)
            const result = await this.phpGet( app.I.getSpecial, {page:page,s_id:Id});
            console.info(result)
            this.ctx.rotateCsrfSecret();
            this.ctx.body = {result}
        } catch (e) {
            this.error(e)
        }
    }


}

module.exports = DistrictController;
