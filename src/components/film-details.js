import {createElement} from '../utils/utils.js';
import {parseFilmDetails} from '../utils/adapters.js';

const renderGenres = (genres) => genres.map((genre) => (`
    <span class="film-details__genre">${genre}</span>
  `)).join('').trim();
const getActiveClass = (condition) => (condition ? 'film-details__control-button--active' : '');


export default  class FilmDetails {
  constructor() {
    this._element = createElement(this.getTemplate());
    this.clearContent = () =>  {
      while (this._element.firstChild) {
        this._element.removeChild(this._element.firstChild);
      }
    };
    this._onCloseClick = this.clearContent;
  }

  _createFilmDetailsTemplate() {
    return '<section class="film-details"></section>';
  }

  _createFormTemplate(filmData) {
    const {poster, ageRating, title, alternativeTitle, totalRating, director,
      writers, actors, releaseDate, runtime, releaseCountry, genres,
      description, watchList, watched, favorite,
      // comments,
    } = parseFilmDetails(filmData);

    return `
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
`;
  }


  showDetail(film) {
    this._element.innerHTML =  this._createFormTemplate(film);
    this._element.querySelector('.film-details__close-btn').addEventListener('click', this._onCloseClick);
  }

  getTemplate()  {
    return this._createFilmDetailsTemplate();
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
