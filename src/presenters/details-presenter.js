import FilmDetails from '../components/film-details';
import {render, remove, RenderPlace, replace} from '../utils/render';

export default class DetailsPresenter {
  constructor(container, film) {
    this._container = container;
    this._card = null;
    this._film = film;
  }

  init(cardCallBacks) {
    this._card = new FilmDetails(this._film);
    this._cardCallBacks = cardCallBacks;
    this._card.setClickHandlers(cardCallBacks);
    render(this._container, this._card, RenderPlace.AFTER_END);
  }

  removeCard() {
    remove(this._card);
  }

  updateFilmCard(film) {
    if (film['id'] === this._film['id']) {
      const prevCard = this._card;
      this._card = new FilmDetails(this._film);
      this._card.setClickHandlers(this._cardCallBacks);
      replace(this._card, prevCard);
      remove(prevCard);
    }
  }

}
