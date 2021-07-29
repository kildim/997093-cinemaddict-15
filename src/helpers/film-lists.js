import {getFilm} from '../factories/films-data.js';
import {createFilmCardTemplate} from '../view/film-card.js';

const FILMS_LIST_COUNT = 5;
const EXTRA_FILMS_LIST_COUNT = 2;

const generateFilmCardList = (limit) => {
  let filmCardList = '';
  for (let i = 0; i < limit; i++) {
    filmCardList +=createFilmCardTemplate(getFilm());}
  return filmCardList;
};

const generateFilmsList = () =>  generateFilmCardList(FILMS_LIST_COUNT);
const generateExtraFilmsList = () =>  generateFilmCardList(EXTRA_FILMS_LIST_COUNT);

export {generateFilmsList, generateExtraFilmsList};
