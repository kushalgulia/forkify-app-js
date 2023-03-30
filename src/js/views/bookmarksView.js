// import icons from 'url:../../img/icons.svg';
import { generateRecipePreview } from './recipePreview.js';
import View from './view';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet! Click the bookmark icon to add a recipe.';
  _message = 'Happy Cooking';
  _generateMarkup() {
    return this._data.map(generateRecipePreview).join('');
  }
}

export default new BookmarksView();
