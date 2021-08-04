import {formatTime} from '../utils/date-time.js';
import {truncateDescription, extractFirstGenre} from '../helpers/film-card-helper.js';
import {DEFAULT_POSTER} from '../constants/default-poster';

const parseData = (filmData) => {
  const filmInfo = filmData['film_info'];

  return  {
    title: filmInfo['title'] || '',
    rating: filmInfo['total_rating'] || '',
    genre: extractFirstGenre(filmInfo['genre']) || '',
    poster: filmInfo['poster'] || DEFAULT_POSTER,
    duration: formatTime(filmInfo['runtime']),
    description: truncateDescription(filmInfo['description']),
  };
};

export const createFilmCardTemplate = (filmData = {}) => {

  const {title, rating, description, poster, genre, duration} = parseData(filmData);

  return `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${rating}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src=${poster} alt="" class="film-card__poster">
      <a class="film-card__comments">${description}</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`;
};
