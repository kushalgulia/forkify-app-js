import * as model from '../model/model.js';
import recipeView from '../views/recipeView.js';
import searchView from '../views/searchView.js';
import resultsView from '../views/resultsView.js';
////////////////////////////////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    //render spinner
    recipeView.renderSpinner();
    //load recipe
    await model.loadRecipe(id);
    //render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    //render error
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    //get the query
    const query = searchView.getSearchQuery();
    //load search results
    await model.loadSearchResults(query);
    //display search results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandler(controlRecipes);
  searchView.addHandler(controlSearchResults);
};
init();
