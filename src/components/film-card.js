import {BLANK_FILM_DATA, parseFilmCard} from '../utils/adapters.js';
import {createElement} from '../utils/utils.js';

export default class FilmCard {
  constructor(filmData = BLANK_FILM_DATA, filmDetails) {
    this._filmData= filmData;
    this._element = createElement(this.getTemplate());
    this._filmDetails = filmDetails;

    function onclickEventHandler(details, film) {
      return function () {details.showDetail(film);};
    }
    this._element.querySelector('img').addEventListener('click', onclickEventHandler(this._filmDetails, this._filmData));
    this._element.querySelector('.film-card__title').addEventListener('click', onclickEventHandler(this._filmDetails, this._filmData));
    this._element.querySelector('.film-card__comments').addEventListener('click', onclickEventHandler(this._filmDetails, this._filmData));
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
