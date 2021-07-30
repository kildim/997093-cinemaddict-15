import {createUserProfileTemplate} from './view/user-profile.js';
import {createMenuTemplate} from './view/menu.js';
import {createFilmsTemplate} from './view/films.js';
import {createFooterStatisticsTemplate} from './view/footer-statistics.js';
import {createFilmDetailsTemplate} from  './view/film-details.js';

const RenderPlace = {
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const render = (container, template, place = RenderPlace.BEFORE_END) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createUserProfileTemplate());
render(siteMainElement, createMenuTemplate());
render(siteMainElement, createFilmsTemplate());
render(siteFooterElement, createFooterStatisticsTemplate());
render(siteFooterElement, createFilmDetailsTemplate(), RenderPlace.AFTER_END);


