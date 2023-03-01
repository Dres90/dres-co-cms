'use strict';

const axios = require('axios').default;
/**
 *  service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('plugin::recipe-loader.recipe-job', {
    async getRecipes() {
        let recipes = [];
        let log = '';
        let skip = 0;
        let take = 3; // Set to 250 when ready to launch
        let total = Infinity;
        const getRecipesJson = async () => {
            console.log(skip, take, total);
            const params = { country: 'FR', locale: 'fr-FR', product: 'classic-box', skip, take};
            const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJibG9ja2VkIjpmYWxzZSwiY291bnRyeSI6ImZyIiwiZW1haWwiOiJhZ3VpbGFyLmNocmlzdGluYUBpY2xvdWQuY29tIiwiZXhwIjoxNjc3NjkxNjQ5LCJpYXQiOjE2Nzc2ODk4NDksImlkIjoiNGEwZDJhOTItODZiYi00ZTJjLTliN2EtNzgyYWMyMTNmNzgxIiwiaXNzIjoiYTM1MDI5MzYtMWE2MS00NWQ5LWE4OGQtMThjYTA1NGM0NGRjIiwianRpIjoiN2FmYzRmYTgtZTVhZi00ZmI0LTlhM2MtZGQyZmU3MzdmMTMyIiwibWV0YWRhdGEiOnsibmFtZSI6IkFHVUlMQVIgQ2hyaXN0aW5hIiwicGFzc3dvcmRsZXNzIjpmYWxzZX0sInJvbGVzIjpbXSwic2NvcGUiOiIiLCJzdWIiOiI0YTBkMmE5Mi04NmJiLTRlMmMtOWI3YS03ODJhYzIxM2Y3ODEiLCJ1c2VybmFtZSI6ImFndWlsYXIuY2hyaXN0aW5hQGljbG91ZC5jb20ifQ.bu2nJvQAmwGCzqGdIxZt4qWtcGu7Ni4fqi2jl6bBMvg';
            const headers = { authorization: token }
            const requestConfig = { 
                method: 'GET', 
                url: 'https://www.hellofresh.fr/gw/recipes/recipes/search', 
                params,
                headers
            };
            try {
                const response = await axios(requestConfig);
                if (response.data.items) {
                    console.log('got here', response.data.items.length)
                    recipes = recipes.concat(response.data.items);
                }
                total = response.data.total;
                skip = skip + response.data.count;
                log += `Loaded ${response.data.count} recipes` + '\n';

            }
            catch (error) {
                console.error(error);
                skip = Infinity;
                log += error + '\n';
            }
        }
        // uncomment when loading all recipes
        // while (skip < total) {
        //     await getRecipesJson();
        // }
        await getRecipesJson();

        // Now write recipes to db, if recipe exist overwrite

        return { status: 200, recipes: recipes.length }
    }
});
