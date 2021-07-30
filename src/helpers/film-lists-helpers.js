import {getMockFilm} from '../mocks/mockFilms.js';
import {createFilmCardTemplate} from '../view/film-card.js';

const FILMS_LIST_COUNT = 5;
const EXTRA_FILMS_LIST_COUNT = 2;

const generateFilmCardList = (limit) => new Array(limit).fill('').map(() => createFilmCardTemplate(getMockFilm())).join('\n').trim();

const generateFilmsList = () =>  generateFilmCardList(FILMS_LIST_COUNT);
const generateFilmsListExtra = () =>  generateFilmCardList(EXTRA_FILMS_LIST_COUNT);

export {generateFilmsList, generateFilmsListExtra};
