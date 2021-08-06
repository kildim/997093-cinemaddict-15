import {createUserProfileTemplate} from './view/user-profile.js';
import {createMenuTemplate} from './view/menu.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createFooterStatisticsTemplate} from './view/footer-statistics.js';
import {createFilmDetailsTemplate} from  './view/film-details.js';
import {getStats} from './utils/statistics.js';
import {createFilmsContentTemplate} from './view/films-content.js';
import {createCommentsListTemplate} from './view/comments-list.js';
import {createNewCommentTemplate} from './view/new-comment.js';
import {createCommentsHeader} from './view/comments-header.js';

const FILMS_LIST_DISPLAY_LIMIT = 5;
let filmsListShownMarker = 0;

import {getMockFilms, getMockUser} from './mocks/mock-films.js';

const user = getMockUser();
const films = getMockFilms();
const stats = getStats(films);

const getNumberOfWatched = (films) => {
  let counter = 0;
  for (const film of films) {if (film['user_details']['already_watched']) {counter++;}};
  return counter;
};
const getUserRank = (count) => {
  if (count > 20) {
    return 'Movie buff';
  } else if (count > 10) {
    return 'Fan';
  } else if (count > 0) {
    return 'Novice';
  }
  return '';
};

const RenderPlace = {
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const render = (container, template, place = RenderPlace.BEFORE_END) =>
  container.insertAdjacentHTML(place, template);
const renderCardsList = (container, cardsList) =>
  cardsList.forEach((card) => render(container, createFilmCardTemplate(card)));
const renderFilmsList = (container, buttonShowMore) => {
  const lastShownMarker = filmsListShownMarker + FILMS_LIST_DISPLAY_LIMIT;
  const additionCards = films.slice(filmsListShownMarker, lastShownMarker);
  renderCardsList(container, additionCards);
  filmsListShownMarker = lastShownMarker;
  if (filmsListShownMarker >= films.length) {buttonShowMore.setAttribute('hidden', '');}
};
const getTopRatedList = (list) => (list.slice(0, 2));
const getMostCommentedList = (list) =>  (list.slice(2, 4));


render(siteHeaderElement, createUserProfileTemplate(getUserRank(getNumberOfWatched(films))));
render(siteMainElement, createMenuTemplate(stats));
render(siteMainElement, createFilmsContentTemplate());

const showMoreElement = document.querySelector('.films-list__show-more');

const [filmsList, topRatedList, mostCommentedList] = document.querySelectorAll('.films-list__container');
renderFilmsList(filmsList, showMoreElement);

const clickShowMoreHandler = (list, buttonElement) => () => renderFilmsList(list, buttonElement);
showMoreElement.addEventListener('click', clickShowMoreHandler(filmsList, showMoreElement));

renderCardsList(topRatedList, getTopRatedList(films));
renderCardsList(mostCommentedList, getMostCommentedList(films));

render(siteFooterElement, createFooterStatisticsTemplate(films));

const MOCK_SELECTED_FILM = films[1];
render(siteFooterElement, createFilmDetailsTemplate(MOCK_SELECTED_FILM), RenderPlace.AFTER_END);

const commentsElement = document.querySelector('.film-details__comments-wrap');
render(commentsElement, createCommentsHeader(MOCK_SELECTED_FILM.comments.length));
render(commentsElement, createCommentsListTemplate(MOCK_SELECTED_FILM.comments));
render(commentsElement, createNewCommentTemplate());


