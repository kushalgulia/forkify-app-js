import icons from 'url:../../img/icons.svg';
import { generateRecipePreview } from './recipePreview.js';
import View from './view';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  #overlay = document.querySelector('.overlay');
  #window = document.querySelector('.add-recipe-window');
  #btnOpen = document.querySelector('.nav__btn--add-recipe');
  #btnClose = document.querySelector('.btn--close-modal');
  constructor() {
    super();
    this.#addHandlerOpen();
    this.#addHandlerClose();
  }
  addHandler(cb) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      const data = [...new FormData(this._parentEl)];
      const dataObj = Object.fromEntries(data);
      cb(dataObj);
    });
  }
  _toggleHidden() {
    [this.#overlay, this.#window].forEach(el => el.classList.toggle('hidden'));
  }
  #addHandlerOpen() {
    this.#btnOpen.addEventListener('click', this._toggleHidden.bind(this));
  }
  #addHandlerClose() {
    [this.#overlay, this.#btnClose].forEach(el =>
      el.addEventListener('click', this._toggleHidden.bind(this))
    );
  }
}

export default new AddRecipeView();
