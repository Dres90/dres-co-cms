module.exports = {
    type: 'admin',
    routes: [
      { // Path defined with an URL parameter
        method: 'GET',
        path: '/recipes/update', 
        handler: 'recipe.update',
        config: {
            policies: [],
        },
      }
    ]
  }