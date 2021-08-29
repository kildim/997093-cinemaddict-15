import {BLANK_FILM_DATA, parseFilmDetails} from '../utils/adapters.js';
import Abstract from '../classes/abstract.js';

const renderGenres = (genres) => genres.map((genre) => (`
    <span class="film-details__genre">${genre}</span>
  `)).join('').trim();
const getActiveClass = (condition) => (condition ? 'film-details__control-button--active' : '');


export default  class FilmDetails extends Abstract{
  constructor(filmData = BLANK_FILM_DATA) {
    super();
    this._filmData= filmData;
    this._callback = {};

    this._clickRemoveDetailHandler = this._clickRemoveDetailHandler.bind(this);

    this._clickAddToWatchlistHandler = this._clickAddToWatchlistHandler.bind(this);
    this._clickMarkAsWatchedHandler = this._clickMarkAsWatchedHandler.bind(this);
    this._clickAddToFavoriteHandler = this._clickAddToFavoriteHandler.bind(this);
  }

  _clickRemoveDetailHandler(evt) {
    evt.preventDefault();
    this._callback.removeDetailCallBack(this._filmData);
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

  toggleCardsAddToWatchlist(id) {
    if (parseInt(this._filmData['id'], 10) === id ) {
      this.getElement().querySelector('#watchlist').classList.toggle('film-details__control-button--active');
    }
  }

  toggleMarkAsWatched(id) {
    if (parseInt(this._filmData['id'], 10) === id ) {
      this.getElement().querySelector('#watched').classList.toggle('film-details__control-button--active');
    }
  }

  toggleAddToFavorite(id) {
    if (parseInt(this._filmData['id'], 10) === id ) {
      this.getElement().querySelector('#favorite').classList.toggle('film-details__control-button--active');
    }
  }

  setClickHandlers({
    removeDetailCallBack = null,
    addToWatchlistCallBack = null,
    markAsWatchedCallBack = null,
    addToFavoriteCallBack = null,
  }) {
    this._callback.removeDetailCallBack = removeDetailCallBack;
    this._callback.clickAddToWatchlist = addToWatchlistCallBack;
    this._callback.clickMarkAsWatched = markAsWatchedCallBack;
    this._callback.clickAddToFavorite = addToFavoriteCallBack;

    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickRemoveDetailHandler);

    this.getElement().querySelector('#watchlist').addEventListener('click', this._clickAddToWatchlistHandler);
    this.getElement().querySelector('#watched').addEventListener('click', this._clickMarkAsWatchedHandler);
    this.getElement().querySelector('#favorite').addEventListener('click', this._clickAddToFavoriteHandler);
  }

  _createFilmDetailsTemplate() {
    const {poster, ageRating, title, alternativeTitle, totalRating, director,
      writers, actors, releaseDate, runtime, releaseCountry, genres,
      description, watchList, watched, favorite,
      // comments,
    } = parseFilmDetails(this._filmData);

    return `
    <section class="film-details">
     <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src=${poster} alt="">

              <p class="film-details__age">${ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${runtime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${renderGenres(genres)}
                  </td>
                </tr>
              </table>
              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <button type="button" class="film-details__control-button ${getActiveClass(watchList)} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
            <button type="button" class="film-details__control-button ${getActiveClass(watched)} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
            <button type="button" class="film-details__control-button ${getActiveClass(favorite)} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
          </section>
        </div>
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
          </section>
        </div>
     </form>
     </section>
`;
  }

  getTemplate()  {
    return this._createFilmDetailsTemplate();
  }
}
