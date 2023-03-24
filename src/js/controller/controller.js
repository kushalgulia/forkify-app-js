import * as model from '../model/model.js';
import recipeView from '../views/recipeView.js';

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

(function init() {
  recipeView.addHandlerRender(controlRecipes);
})();
