import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {renderTemplate, renderElement, RENDER_PLACE} from './utils/utils.js';
import UserProfileView from './components/user-profile';
import MenuView from './components/menu.js';
import SortView from './components/sort.js';
import  FilmsContentView from './components/films-content.js';
import CardsList from './components/cards-list.js';
import ShowMore from './components/show-more.js';
import FilmDetailsView from './components/film-details.js';


import {createFooterStatisticsTemplate} from './view/footer-statistics.js';
import {getStats} from './utils/statistics.js';
import {getMockFilms} from './mocks/mock-films.js';


const FILMS_LIST_DISPLAY_LIMIT = 5;

const films = getMockFilms();
const stats = getStats(films);

const getTopRatedList = (list) => (list.slice(0, 2));
const getMostCommentedList = (list) =>  (list.slice(2, 4));
const getNumberOfWatched = (movies) => {
  let counter = 0;
  for (const film of movies) {if (film['user_details']['already_watched']) {counter++;}}
  return counter;
};


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

renderElement(siteHeaderElement, new UserProfileView(getNumberOfWatched(films)).getElement());
renderElement(siteMainElement, new MenuView (stats).getElement());
renderElement(siteMainElement, new SortView().getElement());
renderElement(siteMainElement, new FilmsContentView().getElement());

const [filmsList, topRatedList, mostCommentedList] = document.querySelectorAll('.films-list');

const FilmDetails = new FilmDetailsView();
renderElement(siteFooterElement, FilmDetails.getElement(), RENDER_PLACE.AFTER_END);

const filmCardsList = new CardsList(films, filmsList, FilmDetails, FILMS_LIST_DISPLAY_LIMIT);
const topRatedFilmsList = new CardsList(getTopRatedList(films), topRatedList, FilmDetails);
const mostCommentedFilmsList = new CardsList(getMostCommentedList(films), mostCommentedList, FilmDetails);
const showMore = new ShowMore(filmCardsList, filmsList);

filmCardsList.render();
showMore.render();
topRatedFilmsList.render();
mostCommentedFilmsList.render();

renderTemplate(siteFooterElement, createFooterStatisticsTemplate(films));


