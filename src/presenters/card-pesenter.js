import Card from '../components/card';
import {render} from '../utils/utils';

export default class CardPresenter {
  constructor(container, film) {
    this._container = container;
    this._card = null;
    this._film = film;
    this.updateView = this._updateView.bind(this);
  }

  init(cardCallBacks) {
    this._card = new Card(this._film);
    this._card.setClickHandlers(cardCallBacks);
    render(this._container, this._card);
  }

  _updateView() {
    console.log(this._card.getElement());
    this._card.removeElement();
  }
}
