const BaseController = require('../base');
module.exports = app => {
  return class HomeController extends BaseController {
    async index() {
      const { ctx, app } = this;
      try {
          const resultInfo = await this.phpGet( app.I.index, {});
          console.log(resultInfo)
          await this.render('home/index.js',{resultInfo,token:ctx.request.query.token || '',mobileType:ctx.request.query.type});
      } catch (e) {
        await this.render('404/404.js',{mobileType:this.ctx.request.query.type});
      }
    }
      async noPage() {
          const { ctx, app } = this;
          try {
              await this.redirect('/');
          } catch (e) {
            await this.render('404/404.js',{mobileType:this.ctx.request.query.type});
          }
      }
  };
};