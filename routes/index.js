// map urls to handlers
module.exports = function (app) {
  app.get('/', require('../controls/products').get);
};

