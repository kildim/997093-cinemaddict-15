import Abstract from '../classes/abstract.js';

export default class ShowMore extends Abstract {
  constructor() {
    super();
    this._callback = {};
    this._clickHandler = this._clickHandler.bind(this);

    this._hide = this._hide.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    if (this._callback.click(this._filmData)) {this._hide();}
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

  _hide() {
    this._element.setAttribute('hidden', '');
  }

  _createShowMoreTemplate() {
    return '<button class="films-list__show-more">Show more</button>';
  }

  getTemplate()  {
    return this._createShowMoreTemplate();
  }
}
