import {SORT_TYPE} from '../constants/sort-type';
import dayjs from 'dayjs';
import CardPresenter from './card-pesenter';

export default class CardsListPresenter {

  constructor({container, list, chunkSize, cardClickCallBacks}) {
    this._defaultList = list;
    this._container = container;
    this._chunkSize = chunkSize;
    this._sortType = null;
    this._cardPresenters = new Map();
    this._cardClickCallBacks = cardClickCallBacks;
    this.renderNextChunk = this._renderNextChunk.bind(this);
    this.renderByDefault = this._renderByDefault.bind(this);
    this.renderByDate = this._renderByDate.bind(this);
    this.renderByRating = this._renderByRating.bind(this);
  }

  _init() {
    this._container.textContent = '';
    this._tailMarker = 0;
    this._tailMarker = 0;
  }

  _renderSorted(){
    this._container.getElement().textContent = '';
    this._init();
    this._renderNextChunk();
  }

  _renderByDefault() {
    if (this._sortType !== SORT_TYPE.byDefault) {
      this._sortType = SORT_TYPE.byDefault;
      this._list = this._defaultList.slice();
      this._renderSorted();
    }
  }

  _renderByDate() {
    if (this._sortType !== SORT_TYPE.byDate) {
      this._sortType = SORT_TYPE.byDate;
      this._list.sort((film1, film2) => dayjs(film2['film_info']['release']['date']) - dayjs(film1['film_info']['release']['date']));
      this._renderSorted();
    }
  }

  _renderByRating() {
    if (this._sortType !== SORT_TYPE.byRating) {
      this._sortType = SORT_TYPE.byRating;
      this._list.sort((film1, film2) => film2['film_info']['total_rating'] - film1['film_info']['total_rating']);
      this._renderSorted();
    }
  }

  updateFilmCard(film) {
    const cardPresenter = this._cardPresenters.get(film['id']);
    if (cardPresenter) {
      cardPresenter.updateCard();
    }
  }

  _renderChunk(chunk) {
    chunk.forEach((filmData) => {
      const cardPresenter = new CardPresenter(this._container, filmData);
      this._cardPresenters.set(filmData['id'], cardPresenter);
      cardPresenter.init(this._cardClickCallBacks);
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
