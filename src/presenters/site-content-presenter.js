import Enum from '../classes/enum.js';
import dayjs from 'dayjs';
import {getStats} from '../utils/statistics.js';
import {isEmpty, render, renderTemplate} from '../utils/render';
import FilmsContentView from '../components/films-content';
import FilmsListContainer from '../components/films-list-container';
import ShowMore from '../components/show-more';
import {createEmptyAllMooviesTemplate} from '../views/empty-all-movies';
import CardsListPresenter from './cards-list-presenter';
import MenuView from '../components/menu.js';
import SortView from '../components/sort.js';
import UserProfileView from '../components/user-profile';
import Footer from '../components/footer';
import DetailsPresenter from './details-presenter';

const FILTER_MODE = new Enum({all: 0, whatchlist: 1, favorites: 2, history: 3});
const FILMS_LIST_DISPLAY_LIMIT = 5;
const TOP_RATED_LIST_DISPLAY_LIMIT = 2;
const MOST_COMMENTED_LIST_DISPLAY_LIMIT = 2;


const getTopRatedList = (list) => (list.slice().sort((first, second) => second['film_info']['total_rating'] - first['film_info']['total_rating']));
const getMostCommentedList = (list) =>  (list.slice().sort((first, second)=> second['comments'].length - first['comments'].length));

export default class SiteContentPresenter {

  constructor(films) {
    this._headerElement = document.querySelector('.header');
    this._mainElement = document.querySelector('.main');
    this._footerElement = document.querySelector('.footer');
    this._films = films;
    this._stats = getStats(films);
    this._detail = null;
    this._filmsListContent = null;
    this._topRatedListContent = null;
    this._mostCommentedListContent = null;
    this._filmsList = null;
    this._topRatedList = null;
    this._mostCommentedList =null;
    this._filter = null;
    this._showDetail = this._showDetail.bind(this);
    this._addToWatchList = this._addToWatchList.bind(this);
    this._markAsWatched = this._markAsWatched.bind(this);
    this._addToFavorite = this._addToFavorite.bind(this);
    this._removeDetail = this._removeDetail.bind(this);
  }

  _removeDetail() {
    document.querySelector('.film-details').remove();
    this._detail = null;
  }

  _showDetail(film) {
    this._detail = this._detail || new DetailsPresenter(this._footerElement, film);
    this._detail.init({
      removeDetailCallBack: this._removeDetail,
      addToWatchlistCallBack: this._addToWatchList,
      markAsWatchedCallBack: this._markAsWatched,
      addToFavoriteCallBack: this._addToFavorite,
    });
  }

  _updateFilmCards(film) {
    this._filmsListContent.updateFilmCard(film);
    this._topRatedListContent.updateFilmCard(film);
    this._mostCommentedListContent.updateFilmCard(film);
    if (this._detail !== null) {
      this._detail.updateFilmCard(film);
    }
  }

  _addToWatchList(film) {
    film['user_details']['watchlist'] = !film['user_details']['watchlist'];
    this._menuView.watchList = getStats(this._films).watchList;
    this._updateFilmCards(film);
  }

  _markAsWatched(film) {
    film['user_details']['already_watched'] = !film['user_details']['already_watched'];
    film['user_details']['watching_date'] = film['user_details']['already_watched'] ?
      dayjs().format('YYYY-MM-DD HH:mm:ss') : '';
    this._menuView.history = getStats(this._films).history;
    this._updateFilmCards(film);
  }

  _addToFavorite(film) {
    film['user_details']['favorite'] = !film['user_details']['favorite'];
    this._menuView.favorites = getStats(this._films).favorites;
    this._updateFilmCards(film);
  }

  _createCardsListContent({container, list, chunkSize, cardClickCallBacks}) {
    const cardsListContent = new CardsListPresenter({
      container:  container,
      list: list,
      chunkSize: chunkSize,
      cardClickCallBacks: cardClickCallBacks,
    });
    cardsListContent.renderByDefault();
    return cardsListContent;
  }

  _renderMenuView(container) {
    this._menuView = this._menuView || new MenuView (this._stats);
    render(container, this._menuView);
  }

  _renderFooterView(container) {
    render(container, new Footer(this._films));
  }

  _renderSortView(container) {
    this._sortView = this._sortView || new SortView();
    render(container, this._sortView);
  }

  _renderUserProfileView(container) {
    render(container, new UserProfileView(this.getNumberOfWatched(this._films)));
  }

  _renderNoFilmsContent() {
    renderTemplate(this._mainElement, createEmptyAllMooviesTemplate());
  }

  _renderFilmsContentView(container) {
    render(container, new FilmsContentView());
  }

  _getFilmLists() {
    return document.querySelectorAll('.films-list');
  }

  _setEscKeyDownListener() {
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this._removeDetail();
      }
    };

    document.addEventListener('keydown', onEscKeyDown);
  }

  _renderHaveFilmsContent() {
    this._renderUserProfileView(this._headerElement);
    this._renderSortView(this._mainElement);
    this._renderFilmsContentView(this._mainElement);
    this._renderFilteredLists(FILTER_MODE.all);
    this._setEscKeyDownListener();
  }

  // eslint-disable-next-line accessor-pairs
  _renderFilteredLists(filterMode) {
    const [filmsList, topRatedList, mostCommentedList] = this._getFilmLists();
    const filmsListContainer = new FilmsListContainer();
    const topRatedListContainer = new FilmsListContainer();
    const mostCommentedListContainer = new FilmsListContainer();
    const showMore = new ShowMore();
    const TOP_RATED_LIST = getTopRatedList(this._films).slice(0, TOP_RATED_LIST_DISPLAY_LIMIT);
    const MOST_COMMENTED_LIST = getMostCommentedList(this._films).slice(0, TOP_RATED_LIST_DISPLAY_LIMIT);

    switch (filterMode) {
      case FILTER_MODE.all:
        render(filmsList, filmsListContainer);

        this._filmsListContent = this._createCardsListContent({
          container:  filmsListContainer,
          list: this._films,
          chunkSize: FILMS_LIST_DISPLAY_LIMIT,
          cardClickCallBacks: {
            showDetailCallBack: this._showDetail,
            addToWatchlistCallBack: this._addToWatchList,
            markAsWatchedCallBack: this._markAsWatched,
            addToFavoriteCallBack: this._addToFavorite,
          },
        });
        this._sortView.setClickHandlers({
          sortByDefaultCallBack: this._filmsListContent.renderByDefault,
          sortByDateCallBack: this._filmsListContent.renderByDate,
          sortByRatingCallBack: this._filmsListContent.renderByRating,
        });

        showMore.setClickHandler(this._filmsListContent.renderNextChunk);
        if (this._films.length > FILMS_LIST_DISPLAY_LIMIT)  {
          render(filmsList, showMore);
        }

        render(topRatedList, topRatedListContainer);

        this._topRatedListContent = this._createCardsListContent({
          container: topRatedListContainer,
          list: TOP_RATED_LIST,
          chunkSize: TOP_RATED_LIST_DISPLAY_LIMIT,
          cardClickCallBacks: {
            showDetailCallBack: this._showDetail,
            addToWatchlistCallBack: this._addToWatchList,
            markAsWatchedCallBack: this._markAsWatched,
            addToFavoriteCallBack: this._addToFavorite,
          },
        });

        render(mostCommentedList, mostCommentedListContainer);

        this._mostCommentedListContent = this._createCardsListContent({
          container: mostCommentedListContainer,
          list: MOST_COMMENTED_LIST,
          chunkSize: MOST_COMMENTED_LIST_DISPLAY_LIMIT,
          cardClickCallBacks: {
            showDetailCallBack: this._showDetail,
            addToWatchlistCallBack: this._addToWatchList,
            markAsWatchedCallBack: this._markAsWatched,
            addToFavoriteCallBack: this._addToFavorite,
          },
        });
        break;
    }
  }

  getNumberOfWatched(movies) {
    let counter = 0;
    for (const film of movies) {if (film['user_details']['already_watched']) {counter++;}}
    return counter;
  }

  init() {
    this._renderMenuView(this._mainElement);
    isEmpty(this._films) ? this._renderNoFilmsContent() : this._renderHaveFilmsContent();
    this._renderFooterView(this._footerElement);
  }

}
