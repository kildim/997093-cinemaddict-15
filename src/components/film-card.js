import {BLANK_FILM_DATA, parseFilmCard} from '../utils/adapters.js';
import Abstract from '../classes/abstract.js';

export default class FilmCard extends Abstract {
  constructor(filmData = BLANK_FILM_DATA) {
    super();
    this._filmData= filmData;
    this._callback = {};
    this._clickHandler = this._clickHandler.bind(this);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(this._filmData);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('img').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._clickHandler);
  }

  _createFilmCardTemplate()  {
    const {title, rating, description, poster, genre, duration, comments} = parseFilmCard(this._filmData);

    return `<article class="film-card">
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
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`;
  }

  getTemplate()  {
    return this._createFilmCardTemplate();
  }
}
