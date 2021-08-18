import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {renderTemplate, render, RenderPlace} from './utils/utils.js';
import UserProfileView from './components/user-profile';
import MenuView from './components/menu.js';
import SortView from './components/sort.js';
import FilmsContentView from './components/films-content.js';
import CardsList from './components/cards-list.js';
import ShowMoreView from './components/show-more.js';
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
  render(siteHeaderElement, new UserProfileView(getNumberOfWatched(films)));
}
render(siteMainElement, new MenuView (stats));
render(siteMainElement, new SortView());

if (filter === FILTER_MODE.all) {
  if (films.length > 0 ) {
    render(siteMainElement, new FilmsContentView());

    const [filmsList, topRatedList, mostCommentedList] = document.querySelectorAll('.films-list');

    const filmDetails = new FilmDetailsView();
    render(siteFooterElement, filmDetails, RenderPlace.AFTER_END);

    const filmCardsList = new CardsList();
    render(filmsList, filmCardsList);

    let cardsListTailMarker = 0;

    const renderChunk = (chunk, container) => {
      chunk.forEach((card) => {
        const cardView = new FilmCardView(card, filmDetails);

        cardView.setClickHandler(filmDetails.showDetail );
        render(container, cardView);
      });
    };
    const renderNextChunk = function () {
      const lastMarker = cardsListTailMarker + FILMS_LIST_DISPLAY_LIMIT;
      const nextChunk = films.slice(cardsListTailMarker, lastMarker);
      renderChunk(nextChunk, filmCardsList);
      cardsListTailMarker = lastMarker;
      return cardsListTailMarker >= films.length;
    };

    renderNextChunk();
    const showMore = new ShowMoreView(renderNextChunk);

    showMore.setClickHandler(renderNextChunk);
    render(filmsList, showMore);

    const TOP_RATED_LIST = getTopRatedList(films).slice(0, TOP_RATED_LIST_DISPLAY_LIMIT);
    const filmTopRatedCardsList = new CardsList();
    render(topRatedList, filmTopRatedCardsList);
    renderChunk(TOP_RATED_LIST, filmTopRatedCardsList);

    const MOST_COMMENTED_LIST = getMostCommentedList(films).slice(0, MOST_COMMENTED_LIST_DISPLAY_LIMIT);
    const filmMostCommentedCardsList = new CardsList();
    render(mostCommentedList, filmMostCommentedCardsList);
    renderChunk(MOST_COMMENTED_LIST, filmMostCommentedCardsList);

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


