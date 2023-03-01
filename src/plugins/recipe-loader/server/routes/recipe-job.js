
/**
 *  router
 */

module.exports = [
	{
		method: 'GET',
		path: '/recipe-jobs',
		handler: 'recipeJobController.find',
        config: {
            policies: [],
            auth: false,
        },
	},
	{
		method: 'POST',
		path: '/recipe-jobs',
		handler: 'recipeJobController.run',
        config: {
            policies: [],
            auth: false,
        },
	},
	{
		method: 'DELETE',
		path: '/recipe-jobs/:id',
		handler: 'recipeJobController.delete',
        config: {
            policies: [],
            auth: false,
        },
	},
];
