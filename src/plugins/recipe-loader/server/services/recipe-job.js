'use strict';

const axios = require('axios').default;
/**
 *  service
 */

const { createCoreService } = require('@strapi/strapi').factories;

// Cannot use since login requests can be blocked from cloudflare
const getToken = async (username, password) => {
    let token = null;
    const params = { country: 'FR', locale: 'fr-FR'};
    const requestConfig = { 
        method: 'POST', 
        url: 'https://www.hellofresh.fr/gw/login', 
        params,
        data: { username, password }
    };
    try {
        const response = await axios(requestConfig);
        token = response?.data?.access_token; 
    }
    catch (error) {
        console.error(error);
    }
    return token;
}

const getCategory = async (data, categories) => {
    if (!data) return null;
    const { id } = data;
    if (categories.has(id))
        return categories.get(id);
    let category = await strapi.db.query('plugin::recipe-loader.recipe-category').findOne({
        select: ['id'],
        where: { external_id: id }
    });
    if (category) {
        categories.set(id, category.id);
        return category.id;
    }
    category = await strapi.entityService.create('plugin::recipe-loader.recipe-category', {
        data: {
            name: data.name,
            external_id: id
        }
    });
    categories.set(id, category.id);
    return category.id;
}

const cleanRecipe = (recipe) => {
    const { id, name } = recipe;
    return {
        name,
        external_id: id,
        recipe_category: recipe.category
    }
}

module.exports = createCoreService('plugin::recipe-loader.recipe-job', {
    async getRecipes() {
        let recipes = [];
        let log = '';
        let skip = 0;
        let take = 3; // Set to 250 when ready to launch
        let total = Infinity;
        let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJibG9ja2VkIjpmYWxzZSwiY291bnRyeSI6ImZyIiwiZW1haWwiOiJhZ3VpbGFyLmNocmlzdGluYUBpY2xvdWQuY29tIiwiZXhwIjoxNjc3NzcxNTU2LCJpYXQiOjE2Nzc3Njk3NTYsImlkIjoiNGEwZDJhOTItODZiYi00ZTJjLTliN2EtNzgyYWMyMTNmNzgxIiwiaXNzIjoiYTM1MDI5MzYtMWE2MS00NWQ5LWE4OGQtMThjYTA1NGM0NGRjIiwianRpIjoiYTU1ZTA1NjctZTg3NC00OGMxLWI1MzMtNzcxMTliMGViYjE3IiwibWV0YWRhdGEiOnsibmFtZSI6IkFHVUlMQVIgQ2hyaXN0aW5hIiwicGFzc3dvcmRsZXNzIjpmYWxzZX0sInJvbGVzIjpbXSwic2NvcGUiOiIiLCJzdWIiOiI0YTBkMmE5Mi04NmJiLTRlMmMtOWI3YS03ODJhYzIxM2Y3ODEiLCJ1c2VybmFtZSI6ImFndWlsYXIuY2hyaXN0aW5hQGljbG91ZC5jb20ifQ.RxpEGtZDG53CUkZnAazE4YEP3vNCd-ayjUdFgpWCxUc';
        if (!token) return recipes;

        const getRecipesJson = async () => {
            const params = { country: 'FR', locale: 'fr-FR', product: 'classic-box', skip, take};
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

        let categories = new Map();

        recipes.forEach(async recipe => {
            recipe.category = await getCategory(recipe.category, categories);
            const existingRecipe = await strapi.db.query('plugin::recipe-loader.recipe').findOne({
                select: ['id'],
                where: { external_id: recipe.id }
            });
            if (existingRecipe) {
                await strapi.entityService.update('plugin::recipe-loader.recipe', existingRecipe.id, {
                    data: cleanRecipe(recipe)
                });
                return;
            }
            await strapi.entityService.create('plugin::recipe-loader.recipe', {
                data: cleanRecipe(recipe),
            });
        })
        return { status: 200, recipes: recipes }
    }
});
