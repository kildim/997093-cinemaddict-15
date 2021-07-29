import {createUserProfileTemplate} from './view/user-profile.js';
import {createMenuTemplate} from './view/menu.js';
import {createFilmsTemplate} from './view/films.js';
import {createFooterStatisticsTemplate} from './view/footer-statistics.js';
import {createFilmDetailsTemplate} from  './view/film-details.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createUserProfileTemplate(), 'beforeend');
render(siteMainElement, createMenuTemplate(), 'afterbegin');
render(siteMainElement, createFilmsTemplate(), 'beforeend');
render(siteFooterElement, createFooterStatisticsTemplate(), 'beforeend');
render(siteFooterElement, createFilmDetailsTemplate(), 'afterend');


