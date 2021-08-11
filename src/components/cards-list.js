import {createElement, renderElement} from '../utils/utils.js';
import FilmCardView from './film-card.js';

export default class CardsList {
  constructor(list, container, filmDetail, chunkLimit) {
    this._list = list;
    this._chankLimit = chunkLimit || list.length;
    this._container = container;
    this._marker = 0;
    this._element = createElement(this.getTemplate());
    this._filmDetail = filmDetail;
  }

  get container() {
    return this._container;
  }

  set container(container) {
    this._container = container;
  }

  get element() {
    return this._element;
  }

  renderNextChunk () {
    const lastMarker = this._marker + this._chankLimit;
    const nextChunk = this._list.slice(this._marker, lastMarker);
    this._renderChunk(nextChunk);
    this._marker = lastMarker;
    return this._marker >= this._list.length;
  }

  _renderChunk (chunk) {
    chunk.forEach((card) => renderElement(this._element, new FilmCardView(card, this._filmDetail).getElement()));
  }

  render() {
    renderElement(this._container, this._element);
    this.renderNextChunk ();
  }

  _createCardsListChunkTemplate () {
    return `<div class="films-list__container">
            </div>`;
  }

  getTemplate()  {
    return this._createCardsListChunkTemplate();
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
