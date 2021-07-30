import {createFilmListTemplate} from './films-list.js';
import {createFilmsListExtraTemplate} from './films-list-extra.js';

export const createFilmsTemplate = () => (
  `<section class="films">
     ${createFilmListTemplate()}
     ${createFilmsListExtraTemplate('Most commented')}
     ${createFilmsListExtraTemplate('Made for Each Other')}
   </section>`
);
