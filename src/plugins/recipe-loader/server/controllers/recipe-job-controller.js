'use strict';

/**
 *   controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::recipe-loader.recipe-job', {
    async run(ctx) {
        const data = await super.create(ctx);
        return data;
    }
});
