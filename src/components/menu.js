import {createElement} from '../utils/utils.js';

export default class Menu {
  constructor(stats) {
    const {
      watchList: watchList = '0',
      history: history = '0',
      favorites: favorites = '0',
    } = stats;

    this._watchList = watchList;
    this._history = history;
    this._favorites = favorites;
  }

  // eslint-disable-next-line accessor-pairs
  set watchList(watchList) {
    this._watchList = watchList;
  }

  // eslint-disable-next-line accessor-pairs
  set history(history) {
    this._history = history;
  }

  // eslint-disable-next-line accessor-pairs
  set favorites(favorites) {
    this._favorites = favorites;
  }

  _createMenuTemplate() {
    return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${this._watchList}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${this._history}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${this._favorites}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
  }

  getTemplate()  {
    return this._createMenuTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

}
