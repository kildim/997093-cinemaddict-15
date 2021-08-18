import Abstract from '../classes/abstract.js';

export default class CardsList extends Abstract {
  constructor() {
    super();
  }

  get element() {
    return this._element;
  }

  _createCardsListChunkTemplate () {
    return `<div class="films-list__container">
            </div>`;
  }

  getTemplate()  {
    return this._createCardsListChunkTemplate();
  }
}
