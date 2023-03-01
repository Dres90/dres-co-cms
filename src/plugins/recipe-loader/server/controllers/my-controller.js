'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('recipe-loader')
      .service('myService')
      .getWelcomeMessage();
  },
});
