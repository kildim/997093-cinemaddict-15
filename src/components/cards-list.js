import Card from './card';
import {render} from '../utils/utils';

export default class CardsList {

  constructor({container, list, chunkSize, cardClickCallBacks}) {
    this._container = container;
    this._list = list;
    this._chunkSize = chunkSize;
    this._cardClickCallBacks = cardClickCallBacks;
    this._findCardById = this._findCardById.bind(this);
    this._tailMarker = 0;

    this.renderNextChunk = this._renderNextChunk.bind(this);
  }

  _findCardById(id) {
    const cards = Array.from(this._container.getElement().querySelectorAll('.film-card'));
    return cards.find((card) => parseInt(card.dataset.id, 10) === id);
  }

  toggleCardsAddToWatchlist(id) {
    const card = this._findCardById(id);
    if (card !== undefined) {card.querySelector('.film-card__controls-item--add-to-watchlist')
      .classList.toggle('film-card__controls-item--active');}
  }

  toggleMarkAsWatched(id) {
    const card = this._findCardById(id);
    if (card !== undefined) {card.querySelector('.film-card__controls-item--mark-as-watched')
      .classList.toggle('film-card__controls-item--active');}
  }

  toggleAddToFavorite(id) {
    const card = this._findCardById(id);
    if (card !== undefined) {card.querySelector('.film-card__controls-item--favorite')
      .classList.toggle('film-card__controls-item--active');}
  }

  _renderChunk(chunk) {
    chunk.forEach((filmData) => {
      const card = new Card(filmData);
      card.setClickHandlers(this._cardClickCallBacks);
      render(this._container, card);
    });
  }

  _renderNextChunk() {
    const lastMarker = this._tailMarker + this._chunkSize;
    const nextChunk = this._list.slice(this._tailMarker, lastMarker);
    this._renderChunk(nextChunk);
    this._tailMarker = lastMarker;
    return this._tailMarker >= this._list.length;
  }
}
