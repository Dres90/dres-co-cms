'use strict';

module.exports = [
	{
		method: 'GET',
		path: '/recipes',
		handler: 'recipeController.find',
	},
	{
		method: 'POST',
		path: '/recipes',
		handler: 'recipeController.create',
	},
	{
		method: 'DELETE',
		path: '/recipes/:id',
		handler: 'recipeController.delete',
	},
];
