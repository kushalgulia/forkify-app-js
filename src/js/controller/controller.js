import * as model from '../model/model.js';
import recipeView from '../views/recipeView.js';
import searchView from '../views/searchView.js';
import resultsView from '../views/resultsView.js';
import paginationView from '../views/paginationView.js';

////////////////////////////////////////////////////////////////
//parcel config
// if (module.hot) {
//   module.hot.accept();
// }
///////////////////////////////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    //render spinner
    recipeView.renderSpinner();
    //load recipe
    await model.loadRecipe(id);
    //mark the recipe
    resultsView.update(model.getResultsPerPage());
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
    //redner spinner
    resultsView.renderSpinner();
    //load search results
    await model.loadSearchResults(query);
    //display search results for the first page
    resultsView.render(model.getResultsPerPage());
    //render pagination for the first page
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goToPage) {
  //render results for the page
  resultsView.render(model.getResultsPerPage(goToPage));
  //render pagination for the page
  paginationView.render(model.state.search);
};

const controlServing = function (newServings) {
  //update the servings data in state
  model.updateServings(newServings);
  //render the update data in recipeView
  recipeView.update(model.state.recipe);
};
const init = function () {
  recipeView.addHandler(controlRecipes);
  recipeView.addHandlerServing(controlServing);
  searchView.addHandler(controlSearchResults);
  paginationView.addHandler(controlPagination);
};
init();
