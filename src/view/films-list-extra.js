import {generateFilmsListExtra} from '../helpers/film-lists-helpers.js';

export const createFilmsListExtraTemplate = (header) => (
  `<section class="films-list films-list--extra">
     <h2 class="films-list__title">${header}</h2>

     <div class="films-list__container">
        ${generateFilmsListExtra()}
     </div>
   </section>`
);
