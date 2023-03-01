'use strict';

/**
 *  controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::recipe-loader.recipe-job', {
    async run(ctx) {
        try {
            ctx.body = await strapi
            .plugin('recipe-loader')
            .service('recipe-job')
            .getRecipes();
        }
        catch (error) {
            console.error(error);
            ctx.badRequest();
        }
    }
});
