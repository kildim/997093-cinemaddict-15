const genGenreCell = (genre) =>
  genre.reduce( (acc, val) => acc.concat(`<span class="film-details__genre">${val}</span>`), '');
const getActiveClass = (state) => (state ? 'film-details__control-button--active' : '');
export {genGenreCell, getActiveClass};
