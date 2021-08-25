import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {isNotEmpty, render} from './utils/utils.js';
import UserProfileView from './components/user-profile.js';


import {getMockFilms} from './mocks/mock-films.js';
import Footer from './components/footer.js';
import MoviesListPresenter from './presenter/movies-list-presenter';

const films = getMockFilms();

const getNumberOfWatched = (movies) => {
  let counter = 0;
  for (const film of movies) {if (film['user_details']['already_watched']) {counter++;}}
  return counter;
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const movieList = new MoviesListPresenter(siteMainElement, siteFooterElement, films);

if (isNotEmpty(films)) {
  render(siteHeaderElement, new UserProfileView(getNumberOfWatched(films)));
}

movieList.init();

render(siteFooterElement, new Footer(films));


