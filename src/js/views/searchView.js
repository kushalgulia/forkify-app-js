class SearchView {
  #parentEl = document.querySelector('.search');
  getSearchQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }
  addHandler(cb) {
    this.#parentEl.addEventListener('submit', e => {
      e.preventDefault();
      cb();
    });
  }
  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
}
export default new SearchView();
