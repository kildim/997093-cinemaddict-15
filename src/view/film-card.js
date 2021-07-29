export const createFilmCardTemplate = (filmData = {}) => (
  `<article class="film-card">
      <h3 class="film-card__title">${filmData.title}</h3>
      <p class="film-card__rating">${filmData.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmData.info.rating}</span>
        <span class="film-card__duration">${filmData.info.duration}</span>
        <span class="film-card__genre">${filmData.info.genre}</span>
      </p>
      <img src=${filmData.poster} alt="" class="film-card__poster">
      <p class="film-card__description">${filmData.description}</p>
      <a class="film-card__comments">${filmData.comments}</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`
);
