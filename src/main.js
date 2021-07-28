import {createUserProfileTemplate} from './view/user-profile.js';
import {createMainNavigationTemplate} from './view/main-navigation.js';
import {createSortTemplate} from './view/sort.js';
import {createFooterStatisticsTemplate} from './view/footer-statistics.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(siteHeaderElement, createUserProfileTemplate(), 'beforeend');
render(siteMainElement, createMainNavigationTemplate(), 'afterbegin');
render(siteMainElement, createSortTemplate(), 'beforeend');
render(siteFooterElement, createFooterStatisticsTemplate(), 'beforeend');
