import { API_URL, RES_PER_PAGE } from '../config.js';
import { getJSON } from '../helpers.js';

//////////////////////////////////////////////

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    //fetch data
    const data = await getJSON(`${API_URL}${id}`);
    let { recipe } = data.data;
    //store the data inside state
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
    throw err; //reaches controller
  }
};
export const loadSearchResults = async function (query) {
  try {
    if (!query) return;
    state.search.query = query;
    //fetch data
    const data = await getJSON(`${API_URL}?search=${query}`);
    //store the data inside state
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        publisher: recipe.publisher,
        title: recipe.title,
        image: recipe.image_url,
      };
    });
  } catch {
    throw err;
  }
};

export const getResultsPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return state.search.results.slice(start, end);
};