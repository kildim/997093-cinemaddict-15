import {createElement} from '../utils/utils.js';
import Abstract from '../classes/abstract.js';

const createUserProfileTemplate = (rank) => `<section class="header__profile profile">
     <p class="profile__rating">${rank}</p>
     <img class="profile__avatar" src='images/bitmap@2x.png' alt="Avatar" width="35" height="35">
   </section>`;

export default class UserProfile extends Abstract {

  constructor(rank = '') {
    super();
    this._rank = rank;
    this._element = null;
  }

  get rank () {
    if (this._rank > 20) {
      return 'Movie buff';
    } else if (this._rank > 10) {
      return 'Fan';
    } else if (this._rank > 0) {
      return 'Novice';
    }
    return '';
  }

  getTemplate()  {
    return createUserProfileTemplate(this.rank);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
