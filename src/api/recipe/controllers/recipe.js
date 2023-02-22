'use strict';

/**
 * recipe controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::recipe.recipe', ({ strapi }) =>  ({
    async update(ctx) {
      try {
        ctx.body = 'ok';
      } catch (err) {
        ctx.body = err;
      }
    },
  }));
