import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {getMockFilms} from './mocks/mock-films.js';
import SiteContentPresenter from './presenters/site-content-presenter';

const films = getMockFilms();

const siteContent = new SiteContentPresenter(films);
siteContent.init();


