import Abstract from '../classes/abstract.js';

export default class Sort extends Abstract {
  constructor() {
    super();
    this._callback = {};
    this.byDefaultRef = null;
    this.byDateRef = null;
    this.byRating = null;

    this._clickSortByDefaultHandler = this._clickSortByDefaultHandler.bind(this);
    this._clickSortByDateHandler = this._clickSortByDateHandler.bind(this);
    this._clickSortByRatingHandler = this._clickSortByRatingHandler.bind(this);

    this._removeRefsActiveClass = this._removeRefsActiveClass.bind((this));
  }

  _removeRefsActiveClass() {
    this.byDefaultRef.classList.remove('sort__button--active');
    this.byDateRef.classList.remove('sort__button--active');
    this.byRating.classList.remove('sort__button--active');
  }

  _clickSortByDefaultHandler(evt) {
    evt.preventDefault();
    this._callback.clickSortByDefault();
    this._removeRefsActiveClass();
    this.byDefaultRef.classList.add('sort__button--active');
  }

  _clickSortByDateHandler(evt) {
    evt.preventDefault();
    this._callback.clickSortByDate();
    this._removeRefsActiveClass();
    this.byDateRef.classList.add('sort__button--active');
  }

  _clickSortByRatingHandler(evt) {
    evt.preventDefault();
    this._callback.clickSortByRating();
    this._removeRefsActiveClass();
    this.byRating.classList.add('sort__button--active');
  }

  setClickHandlers ({
    sortByDefaultCallBack = null,
    sortByDateCallBack = null,
    sortByRatingCallBack = null,
  }) {
    this._callback.clickSortByDefault = sortByDefaultCallBack;
    this._callback.clickSortByDate = sortByDateCallBack;
    this._callback.clickSortByRating = sortByRatingCallBack;

    [this.byDefaultRef, this.byDateRef, this.byRating] = this.getElement().querySelectorAll('.sort__button');

    this.byDefaultRef.addEventListener('click', this._clickSortByDefaultHandler);
    this.byDateRef.addEventListener('click', this._clickSortByDateHandler);
    this.byRating.addEventListener('click', this._clickSortByRatingHandler);
  }

  _createSortTemplate() {
    return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;
  }

  getTemplate()  {
    return this._createSortTemplate();
  }
}
