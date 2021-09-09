import Enum from '../classes/enum.js';
import dayjs from 'dayjs';
import {getStats} from '../utils/statistics.js';
import {isEmpty, render, RenderPlace, renderTemplate} from '../utils/utils';
import FilmsContentView from '../components/films-content';
import FilmDetails from '../components/film-details';
import FilmsListContainer from '../components/films-list-container';
import ShowMore from '../components/show-more';
import {createEmptyAllMooviesTemplate} from '../view/empty-all-movies';
import CardsListPresenter from './cards-list-presenter';
import MenuView from '../components/menu.js';
import SortView from '../components/sort.js';

const FILTER_MODE = new Enum({all: 0, whatchlist: 1, favorites: 2, history: 3});
const FILMS_LIST_DISPLAY_LIMIT = 5;
const TOP_RATED_LIST_DISPLAY_LIMIT = 2;
const MOST_COMMENTED_LIST_DISPLAY_LIMIT = 2;


const getTopRatedList = (list) => (list.slice().sort((first, second) => second['film_info']['total_rating'] - first['film_info']['total_rating']));
const getMostCommentedList = (list) =>  (list.slice().sort((first, second)=> second['comments'].length - first['comments'].length));

export default class SiteContentPresenter {

  constructor(mainElement, footerElement, films) {
    this._mainElement = mainElement;
    this._footerElement = footerElement;
    this._films = films;
    this._stats = getStats(films);
    this._menuView = null;
    this._detail = null;
    this._filmsListContent = null;
    this._topRatedListContent = null;
    this._mostCommentedListContent = null;
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
    if (this._detail !== null) {
      this._removeDetail();
    }
    this._detail =  new FilmDetails(film);
    this._detail.setClickHandlers({
      removeDetailCallBack: this._removeDetail,
      addToWatchlistCallBack: this._addToWatchList,
      markAsWatchedCallBack: this._markAsWatched,
      addToFavoriteCallBack: this._addToFavorite,
    });
    render(this._footerElement, this._detail, RenderPlace.AFTER_END);
  }

  _addToWatchList(film) {
    film['user_details']['watchlist'] = !film['user_details']['watchlist'];
    this._menuView.watchList = getStats(this._films).watchList;
    this._filmsListContent.toggleCardsAddToWatchlist(film['id']);
    this._topRatedListContent.toggleCardsAddToWatchlist(film['id']);
    this._mostCommentedListContent.toggleCardsAddToWatchlist(film['id']);
    if (this._detail !== null) {
      this._detail.toggleCardsAddToWatchlist(film['id']);
    }
  }

  _markAsWatched(film) {
    film['user_details']['already_watched'] = !film['user_details']['already_watched'];
    film['user_details']['watching_date'] = film['user_details']['already_watched'] ?
      dayjs().format('YYYY-MM-DD HH:mm:ss') : '';
    this._menuView.history = getStats(this._films).history;
    this._filmsListContent.toggleMarkAsWatched(film['id']);
    this._topRatedListContent.toggleMarkAsWatched(film['id']);
    this._mostCommentedListContent.toggleMarkAsWatched(film['id']);
    if (this._detail !== null) {
      this._detail.toggleMarkAsWatched(film['id']);
    }
  }

  _addToFavorite(film) {
    film['user_details']['favorite'] = !film['user_details']['favorite'];
    this._menuView.favorites = getStats(this._films).favorites;
    this._filmsListContent.toggleAddToFavorite(film['id']);
    this._topRatedListContent.toggleAddToFavorite(film['id']);
    this._mostCommentedListContent.toggleAddToFavorite(film['id']);
    if (this._detail !== null) {
      this._detail.toggleAddToFavorite(film['id']);
    }
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

  _renderMenuView() {
    render(this._mainElement, this._menuView);
  }

  _renderSortView() {
    render(this._mainElement, this._sortView);
  }

  // eslint-disable-next-line accessor-pairs
  set _filter(filterMode) {
    const [filmsList, topRatedList, mostCommentedList] = document.querySelectorAll('.films-list');
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

  _renderFilmsLists(filterMode) {
    render(this._mainElement, new FilmsContentView());
    isEmpty(this._films) ? renderTemplate(this._mainElement, createEmptyAllMooviesTemplate()) : this._filter = filterMode;

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this._removeDetail();
      }
    };

    document.addEventListener('keydown', onEscKeyDown);
  }

  init() {
    this._menuView = new MenuView (this._stats);
    this._sortView = new SortView();
    this._renderMenuView();
    this._renderSortView();
    this._renderFilmsLists(FILTER_MODE.all);
  }

}
