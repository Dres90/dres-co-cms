'use strict';

/**
 *  router
 */

module.exports = [
	{
		method: 'GET',
		path: '/recipes',
		handler: 'recipeController.find',
        config: {
            policies: [],
            auth: false,
        },
	},
	{
		method: 'POST',
		path: '/recipes',
		handler: 'recipeController.create',
        config: {
            policies: [],
            auth: false,
        },
	},
	{
		method: 'DELETE',
		path: '/recipes/:id',
		handler: 'recipeController.delete',
        config: {
            policies: [],
            auth: false,
        },
	},
];
