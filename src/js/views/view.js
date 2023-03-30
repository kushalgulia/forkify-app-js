import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  _parentEl = '';
  _errorMessage = '';
  _message = '';
  addHandler(cb) {}
  _generateMarkup() {}
  render(data) {
    //render error if no data
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    //set the data to the new data
    this._data = data;
    //clear the parent element
    this.#clear();
    //insert the markup generated inside the parent element
    this._parentEl.insertAdjacentHTML('afterbegin', this._generateMarkup());
  }
  update(data) {
    //set the data to the update data
    this._data = data;
    //generate markup with update data
    const markup = this._generateMarkup();
    //create virtual dom using the update data
    const newDom = document.createRange().createContextualFragment(markup);
    //compare the virtual dom and the real dom
    //replace all the changed text
    const newDomEl = newDom.querySelectorAll('*');
    const domEl = this._parentEl.querySelectorAll('*');

    newDomEl.forEach((el, i) => {
      if (!el.isEqualNode(domEl[i]) && domEl[i].firstChild?.nodeValue.trim())
        domEl[i].textContent = el.textContent;
    });
    //replace all the changed attributes
    newDomEl.forEach((el, i) => {
      if (!el.isEqualNode(domEl[i])) {
        Array.from(el.attributes).forEach(attr =>
          domEl[i].setAttribute(attr.name, attr.value)
        );
      }
    });
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
