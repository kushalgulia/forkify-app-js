import icons from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  addHandler(cb) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      cb(+btn.dataset.goto);
    });
  }
  _generateMarkup() {
    const pages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    const currPage = this._data.page;

    //if single page
    if (pages <= 1) {
      return ``;
    }
    //if first page and other pages
    if (pages > 1 && currPage === 1) {
      return this.#markupBtnNext(currPage);
    }
    //if any other page
    if (currPage !== pages) {
      return `${this.#markupBtnPrev(currPage)} ${this.#markupBtnNext(
        currPage
      )}`;
      x;
    }
    //if last page
    if (currPage === pages) {
      return this.#markupBtnPrev(currPage);
    }
  }
  #markupBtnPrev(currPage) {
    return `
    <button data-goto='${
      currPage - 1
    }' class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
    </button>
    `;
  }
  #markupBtnNext(currPage) {
    return `
    <button  data-goto='${
      currPage + 1
    }' class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
  `;
  }
}

export default new PaginationView();
