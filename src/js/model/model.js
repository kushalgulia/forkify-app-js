import { API_URL, RES_PER_PAGE } from '../config.js';
import { AJAX } from '../helpers.js';

//////////////////////////////////////////////

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const getFormattedRecipeData = function (recipe) {
  return {
    id: recipe.id,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    publisher: recipe.publisher,
    title: recipe.title,
    image: recipe.image_url,
    cookingTime: recipe.cooking_time,
    source: recipe.source_url,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    //fetch data
    const data = await AJAX(`${API_URL}${id}?key=${process.env.KEY}`);
    let { recipe } = data.data;
    //store the data inside state
    state.recipe = getFormattedRecipeData(recipe);
    //add bookmarked property
    state.recipe.bookmarked = state.bookmarks.some(item => item.id === id);
  } catch (err) {
    throw err; //reaches controller
  }
};

export const loadSearchResults = async function (query) {
  try {
    if (!query) return;
    state.search.query = query;
    //fetch data
    const data = await AJAX(
      `${API_URL}?search=${query}&key=${process.env.KEY}`
    );
    //store the data inside state
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        publisher: recipe.publisher,
        title: recipe.title,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
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

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  //add to bookmarks array
  state.bookmarks.push(recipe);
  //set bookmarked property as true
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  //store the bookmarks
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  //delete item from the bookmarks array
  const index = state.bookmarks.findIndex(item => item.id === id);
  state.bookmarks.splice(index, 1);
  //set bookmarked property as false
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  //store the bookmarks
  persistBookmarks();
};

export const uploadRecipe = async function (newRecipe) {
  try {
    //create ingredients array
    const ingredients = Object.entries(newRecipe)
      .filter(val => val[0].startsWith('ingredient') && val[1])
      .map(val => {
        const values = val[1].split(',').map(v => v.trim());
        if (values.length < 3)
          throw new Error('Please enter values in correct format');
        const [quantity, unit, description] = values;
        return {
          quantity: quantity ? +quantity : null,
          unit: unit || '',
          description: description || '',
        };
      });
    //create the recipe object to be uploaded
    const recipeUpload = {
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      title: newRecipe.title,
      ingredients,
    };
    //recive the uploaded recipe
    const data = await AJAX(`${API_URL}?key=${process.env.KEY}`, recipeUpload);
    let { recipe } = data.data;
    recipe = getFormattedRecipeData(recipe);
    //set the recipe as the current recipe
    state.recipe = recipe;
    //add uploaded recipe to bookmarks
    addBookmark(recipe);
  } catch (err) {
    throw err;
  }
};
///////////////////////////////////////////////////////////////////////

const loadBookmarks = function () {
  const data = localStorage.getItem('bookmarks');
  if (data) state.bookmarks = JSON.parse(data);
};
loadBookmarks();
