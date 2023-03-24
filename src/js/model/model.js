import { API_URL } from '../config.js';
import { getJSON } from '../helpers.js';

//////////////////////////////////////////////

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    let { recipe } = data.data; //from the api
    state.recipe = {
      id: recipe.id,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      publisher: recipe.publisher,
      title: recipe.title,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      source: recipe.source_url,
    };
  } catch (err) {
    // alert(err);
    throw err; //reaches controller
  }
};
