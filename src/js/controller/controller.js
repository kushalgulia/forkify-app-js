import * as model from '../model/model.js';
import recipeView from '../views/recipeView.js';
import searchView from '../views/searchView.js';
import resultsView from '../views/resultsView.js';

////////////////////////////////////////////////////////////////
//parcel config
if (module.hot) {
  module.hot.accept();
}
///////////////////////////////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    //render spinner
    recipeView.renderSpinner();
    //load recipe
    await model.loadRecipe(id);
    //render recipe
    // console.log(model.state.recipe);
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
    //redner spinner
    resultsView.renderSpinner();
    //load search results
    await model.loadSearchResults(query);
    //display search results
    // console.log(model.getResultsPerPage(2));
    resultsView.render(model.getResultsPerPage());
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandler(controlRecipes);
  searchView.addHandler(controlSearchResults);
};
init();
