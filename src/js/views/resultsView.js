import icons from 'url:../../img/icons.svg';
import View from './view';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No results found for your query. Try something else!';
  _message = 'Happy Cooking';
  _generateMarkup() {
    return this._data.map(this._generateRecipePreview).join('');
  }
  _generateRecipePreview(recipe) {
    return `
    <li class="preview">
        <a class="preview__link " href="#${recipe.id}">
        <figure class="preview__fig">
            <img src="${recipe.image}" alt="${recipe.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated">
            <svg>
                <use href="${icons}#icon-user"></use>
            </svg>
            </div>
        </div>
        </a>
    </li>
    `;
  }
}

export default new ResultsView();
