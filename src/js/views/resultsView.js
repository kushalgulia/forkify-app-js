// import icons from 'url:../../img/icons.svg';
import { generateRecipePreview } from './recipePreview.js';
import View from './view';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No results found for your query. Try something else!';
  _message = 'Happy Cooking';
  _generateMarkup() {
    return this._data.map(generateRecipePreview).join('');
  }
}

export default new ResultsView();
