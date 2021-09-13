import Card from '../components/card';
import {render, replace, remove} from '../utils/render';

export default class CardPresenter {
  constructor(container, film) {
    this._container = container;
    this._card = null;
    this._film = film;
  }

  init(cardCallBacks) {
    this._card = new Card(this._film);
    this._cardCallBacks = cardCallBacks;
    this._card.setClickHandlers(cardCallBacks);
    render(this._container, this._card);
  }

  updateCard() {
    const prevCard = this._card;
    this._card = new Card(this._film);
    this._card.setClickHandlers(this._cardCallBacks);
    replace(this._card, prevCard);
    remove(prevCard);
  }
}
