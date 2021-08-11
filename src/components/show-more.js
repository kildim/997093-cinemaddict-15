import {createElement, renderElement} from '../utils/utils.js';

export default class ShowMore {
  constructor(managedList, container) {
    this._managedList = managedList;
    this._container = container;
    this._element = createElement(this.getTemplate());
    function onclickEventHandler(list, button) {
      return function () {
        if (list.renderNextChunk()) {button.setAttribute('hidden', '');}
      };
    }
    this._element.addEventListener('click', onclickEventHandler(this._managedList, this._element));
  }

  _createShowMoreTemplate() {
    return '<button class="films-list__show-more">Show more</button>';
  }

  getTemplate()  {
    return this._createShowMoreTemplate();
  }

  render() {
    renderElement(this._container, this._element);
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
