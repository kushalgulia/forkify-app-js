import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  _parentEl = '';
  _errorMessage = '';
  _message = '';
  addHandler(cb) {}
  _generateMarkup() {}
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    this.#clear();
    this._parentEl.insertAdjacentHTML('afterbegin', this._generateMarkup());
  }
  renderSpinner() {
    const markup = `
    <div class="spinner">
    <svg>
    <use href="${icons}#icon-loader"></use>
    </svg>
    </div>
    `;
    this.#clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
        <svg>
            <use href="${icons}#icon-alert-triangle"></use>
            </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this.#clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
          <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}.</p>
      </div>
    `;
    this.#clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  #clear() {
    this._parentEl.innerHTML = '';
  }
}
