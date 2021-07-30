import {getMockFilmsNumber} from '../mocks/mockFilms.js';

export const createFooterStatisticsTemplate = () => (
  `<section class="footer__statistics">
    <p>${getMockFilmsNumber()} movies inside</p>
  </section>`
);
