import Abstract from '../classes/abstract.js';

export default class FilmsListContainer extends Abstract {
  constructor() {
    super();
  }

  get element() {
    return this._element;
  }

  _createFilmsListContainerTemplate () {
    return `<div class="films-list__container">
            </div>`;
  }

  getTemplate()  {
    return this._createFilmsListContainerTemplate();
  }
}
