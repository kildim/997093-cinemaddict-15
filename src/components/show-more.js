import {createElement} from '../utils/utils.js';

export default class ShowMore {
  constructor(onclickCallBack) {
    this._element = createElement(this.getTemplate());
    this.hide = function () {
      this._element.setAttribute('hidden', '')
    };
    this._element.addEventListener('click',  () => {if (onclickCallBack()) {this.hide();} });

  }

  _createShowMoreTemplate() {
    return '<button class="films-list__show-more">Show more</button>';
  }

  getTemplate()  {
    return this._createShowMoreTemplate();
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
