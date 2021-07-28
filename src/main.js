import {createUserProfileTemplate} from './view/user-profile.js';
import {createMenuTemplate} from './view/menu.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreTemplate} from './view/show-more.js';
import {createFooterStatisticsTemplate} from './view/footer-statistics.js';
import {createFilmDetailsTemplate} from './view/film-details.js';


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const filmsListCatalogElement = document.querySelector('.films-list__container--catalog');
const filmsListTopRatedElement = document.querySelector('.films-list__container--top-rated');
const filmsListMostCommentedElement = document.querySelector('.films-list__container--most-commented');
const siteFooterElement = document.querySelector('.footer');
const sitePopupElement = document.querySelector('.film-details');


const FILMS_LIST_COUNT = 5;
const EXTRA_FILMS_LIST_COUNT = 2

render(siteHeaderElement, createUserProfileTemplate(), 'beforeend');
render(siteMainElement, createMenuTemplate(), 'afterbegin');

for (let i = 0; i < FILMS_LIST_COUNT; i++) {
  render(filmsListCatalogElement, createFilmCardTemplate(), 'afterbegin');
}

render(filmsListCatalogElement, createShowMoreTemplate(), 'afterend');

for (let i = 0; i < EXTRA_FILMS_LIST_COUNT; i++) {
  render(filmsListTopRatedElement, createFilmCardTemplate(), 'afterbegin');
}
for (let i = 0; i < EXTRA_FILMS_LIST_COUNT; i++) {
  render(filmsListMostCommentedElement, createFilmCardTemplate(), 'afterbegin');
}

render(siteFooterElement, createFooterStatisticsTemplate(), 'beforeend');

render(sitePopupElement, createFilmDetailsTemplate(), 'afterbegin');


