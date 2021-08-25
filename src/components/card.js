import {BLANK_FILM_DATA, parseFilmCard} from '../utils/adapters.js';
import Abstract from '../classes/abstract.js';

const getActiveClass = (condition) => (condition ? 'film-card__controls-item--active':'');

export default class Card extends Abstract {
  constructor(filmData = BLANK_FILM_DATA) {
    super();
    this._filmData= filmData;
    this._callback = {};
    this._clickShowDetailHandler = this._clickShowDetailHandler.bind(this);

    this._clickAddToWatchlistHandler = this._clickAddToWatchlistHandler.bind(this);
    this._clickMarkAsWatchedHandler = this._clickMarkAsWatchedHandler.bind(this);
    this._clickAddToFavoriteHandler = this._clickAddToFavoriteHandler.bind(this);
  }

  _clickShowDetailHandler(evt) {
    evt.preventDefault();
    this._callback.clickShowDetail(this._filmData);
  }

  _clickAddToWatchlistHandler(evt) {
    evt.preventDefault();
    this._callback.clickAddToWatchlist(this._filmData);
  }

  _clickMarkAsWatchedHandler(evt) {
    evt.preventDefault();
    this._callback.clickMarkAsWatched(this._filmData);
  }

  _clickAddToFavoriteHandler(evt) {
    evt.preventDefault();
    this._callback.clickAddToFavorite(this._filmData);
  }

  setClickHandlers({
    showDetailCallBack = null,
    addToWatchlistCallBack = null,
    markAsWatchedCallBack = null,
    addToFavoriteCallBack = null,
  }) {

    this._callback.clickShowDetail = showDetailCallBack;
    this._callback.clickAddToWatchlist = addToWatchlistCallBack;
    this._callback.clickMarkAsWatched = markAsWatchedCallBack;
    this._callback.clickAddToFavorite = addToFavoriteCallBack;

    this.getElement().querySelector('img').addEventListener('click', this._clickShowDetailHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._clickShowDetailHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._clickShowDetailHandler);

    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._clickAddToWatchlistHandler);
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._clickMarkAsWatchedHandler);
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._clickAddToFavoriteHandler);
  }

  _createCardTemplate()  {
    const {id, title, rating, description, poster, genre, duration, comments, watchlist, alreadyWatched, favorite} = parseFilmCard(this._filmData);

    return `<article class="film-card" data-id="${id}">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${rating}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src=${poster} alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${getActiveClass(watchlist)}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${getActiveClass(alreadyWatched)}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${getActiveClass(favorite)}" type="button">Mark as favorite</button>
      </div>
    </article>`;
  }

  getTemplate()  {
    return this._createCardTemplate();
  }
}
