import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {renderTemplate, renderElement, RenderPlace} from './utils/utils.js';
import UserProfileView from './components/user-profile';
import MenuView from './components/menu.js';
import SortView from './components/sort.js';
import FilmsContentView from './components/films-content.js';
import CardsList from './components/cards-list.js';
import ShowMore from './components/show-more.js';
import FilmDetailsView from './components/film-details.js';
import FilmCardView from './components/film-card.js';
import Enum from './classes/enum.js';


import {createFooterStatisticsTemplate} from './view/footer-statistics.js';
import {createEmptyAllMooviesTemplate} from './view/empty-all-movies.js';
import {getStats} from './utils/statistics.js';
import {getMockFilms} from './mocks/mock-films.js';

const FILMS_LIST_DISPLAY_LIMIT = 5;
const TOP_RATED_LIST_DISPLAY_LIMIT = 2;
const MOST_COMMENTED_LIST_DISPLAY_LIMIT = 2;

const films = getMockFilms();
const stats = getStats(films);

const getTopRatedList = (list) => (list.slice().sort((first, second) => second['film_info']['total_rating'] - first['film_info']['total_rating']));
const getMostCommentedList = (list) =>  (list.slice().sort((first, second)=> second['comments'].length - first['comments'].length));
const getNumberOfWatched = (movies) => {
  let counter = 0;
  for (const film of movies) {if (film['user_details']['already_watched']) {counter++;}}
  return counter;
};


const FILTER_MODE = new Enum({all: 0, whatchlist: 1, favorites: 2, history: 3});
const filter = FILTER_MODE.all;

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

if (films.length > 0) {
  renderElement(siteHeaderElement, new UserProfileView(getNumberOfWatched(films)).getElement());
}
renderElement(siteMainElement, new MenuView (stats).getElement());
renderElement(siteMainElement, new SortView().getElement());

if (filter === FILTER_MODE.all) {
  if (films.length > 0 ) {
    renderElement(siteMainElement, new FilmsContentView().getElement());

    const [filmsList, topRatedList, mostCommentedList] = document.querySelectorAll('.films-list');

    const filmDetails = new FilmDetailsView();
    renderElement(siteFooterElement, filmDetails.getElement(), RenderPlace.AFTER_END);

    const filmCardsList = new CardsList();
    renderElement(filmsList, filmCardsList.getElement());

    let cardsListTailMarker = 0;

    const renderChunk = (chunk, container) => {
      chunk.forEach((card) => renderElement(container, new FilmCardView(card, filmDetails).getElement()));
    };
    const renderNextChunk = function () {
      const lastMarker = cardsListTailMarker + FILMS_LIST_DISPLAY_LIMIT;
      const nextChunk = films.slice(cardsListTailMarker, lastMarker);
      renderChunk(nextChunk, filmCardsList.getElement());
      cardsListTailMarker = lastMarker;
      return cardsListTailMarker >= films.length;
    };

    renderNextChunk();
    renderElement(filmsList, new ShowMore(renderNextChunk).getElement());

    const TOP_RATED_LIST = getTopRatedList(films).slice(0, TOP_RATED_LIST_DISPLAY_LIMIT);
    const filmTopRatedCardsList = new CardsList();
    renderElement(topRatedList, filmTopRatedCardsList.getElement());
    renderChunk(TOP_RATED_LIST, filmTopRatedCardsList.getElement());

    const MOST_COMMENTED_LIST = getMostCommentedList(films).slice(0, MOST_COMMENTED_LIST_DISPLAY_LIMIT);
    const filmMostCommentedCardsList = new CardsList();
    renderElement(mostCommentedList, filmMostCommentedCardsList.getElement());
    renderChunk(MOST_COMMENTED_LIST, filmMostCommentedCardsList.getElement());

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        filmDetails.clearContent();
      }
    };

    document.addEventListener('keydown', onEscKeyDown);
  } else {
    renderTemplate(siteMainElement, createEmptyAllMooviesTemplate());
  }
}

renderTemplate(siteFooterElement, createFooterStatisticsTemplate(films));


