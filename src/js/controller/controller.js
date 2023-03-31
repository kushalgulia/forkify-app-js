import * as model from '../model/model.js';
import recipeView from '../views/recipeView.js';
import searchView from '../views/searchView.js';
import resultsView from '../views/resultsView.js';
import paginationView from '../views/paginationView.js';
import bookmarksView from '../views/bookmarksView.js';
import addRecipeView from '../views/addRecipeView.js';
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
    //mark the recipe as selected
    resultsView.update(model.getResultsPerPage());
    //update bookmarksView mark the selected recipe(if present)
    bookmarksView.update(model.state.bookmarks);
    //load recipe
    await model.loadRecipe(id);
    //render recipe
    recipeView.render(model.state.recipe);
    console.log(model.state.recipe);
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
    resultsView.render(model.getResultsPerPage(1));
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
const controlBookmarks = function () {
  //update the data inside model
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //render recipeView with updated data
  recipeView.update(model.state.recipe);
  //render bookmarks data
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = function (newRecipe) {
  console.log(newRecipe);
};
const init = function () {
  //render all the bookmarks
  bookmarksView.render(model.state.bookmarks);
  //url hash
  recipeView.addHandler(controlRecipes);
  //servings btn
  recipeView.addHandlerServing(controlServing);
  //bookmark btn
  recipeView.addHandlerBookmark(controlBookmarks);
  //search btn
  searchView.addHandler(controlSearchResults);
  //pagination btn
  paginationView.addHandler(controlPagination);
  //upload btn
  addRecipeView.addHandler(controlAddRecipe);
};
init();
