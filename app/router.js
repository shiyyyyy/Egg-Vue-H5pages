
module.exports = app => {
  app.get('/', app.controller.home.home.index);
  app.get('*', app.controller.home.home.noPage);
};
