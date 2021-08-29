import Enum from '../classes/enum.js';
import dayjs from 'dayjs';
import {getStats} from '../utils/statistics.js';
import {isNotEmpty, render, RenderPlace, renderTemplate} from '../utils/utils';
import FilmsContentView from '../components/films-content';
import FilmDetails from '../components/film-details';
import FilmsListContainer from '../components/films-list-container';
import ShowMore from '../components/show-more';
import {createEmptyAllMooviesTemplate} from '../view/empty-all-movies';
import CardsList from '../components/cards-list';
import MenuView from '../components/menu.js';
import SortView from '../components/sort.js';

const FILTER_MODE = new Enum({all: 0, whatchlist: 1, favorites: 2, history: 3});
const FILMS_LIST_DISPLAY_LIMIT = 5;
const TOP_RATED_LIST_DISPLAY_LIMIT = 2;
const MOST_COMMENTED_LIST_DISPLAY_LIMIT = 2;

const getTopRatedList = (list) => (list.slice().sort((first, second) => second['film_info']['total_rating'] - first['film_info']['total_rating']));
const getMostCommentedList = (list) =>  (list.slice().sort((first, second)=> second['comments'].length - first['comments'].length));

export default class MoviesListPresenter {

  constructor(mainElement, footerElement, films) {
    this._mainElement = mainElement;
    this._footerElement = footerElement;
    this._films = films;
    this._stats = getStats(films);
    this._filter = null;
    this._menuView = null;
    this._detail = null;
    this._filmsListContent = null;
    this._mostCommentedListContent = null;
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

  _renderFilmsLists() {
    if (this._filter === FILTER_MODE.all) {
      if (isNotEmpty(this._films) ) {
        render(this._mainElement, new FilmsContentView());

        const [filmsList, topRatedList, mostCommentedList] = document.querySelectorAll('.films-list');

        const filmsListContainer = new FilmsListContainer();
        render(filmsList, filmsListContainer);

        this._filmsListContent = new CardsList({
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
        this._filmsListContent.renderNextChunk();

        const showMore = new ShowMore();
        showMore.setClickHandler(this._filmsListContent.renderNextChunk);
        render(filmsList, showMore);

        const TOP_RATED_LIST = getTopRatedList(this._films).slice(0, TOP_RATED_LIST_DISPLAY_LIMIT);

        const topRatedListContainer = new FilmsListContainer();
        render(topRatedList, topRatedListContainer);

        this._topRatedListContent = new CardsList({
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
        this._topRatedListContent.renderNextChunk();

        const MOST_COMMENTED_LIST = getMostCommentedList(this._films).slice(0, TOP_RATED_LIST_DISPLAY_LIMIT);

        const mostCommentedListContainer = new FilmsListContainer();
        render(mostCommentedList, mostCommentedListContainer);

        this._mostCommentedListContent = new CardsList({
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
        this._mostCommentedListContent.renderNextChunk();

        const onEscKeyDown = (evt) => {
          if (evt.key === 'Escape' || evt.key === 'Esc') {
            evt.preventDefault();
            this._removeDetail();
          }
        };

        document.addEventListener('keydown', onEscKeyDown);
      } else {
        renderTemplate(this._mainElement, createEmptyAllMooviesTemplate());
      }
    }
  }

  _renderMenuView() {
    render(this._mainElement, this._menuView);
  }

  _renderSortView() {
    render(this._mainElement, this._sortView);
  }

  init() {
    this._menuView = new MenuView (this._stats);
    this._sortView = new SortView();
    this._renderMenuView();
    this._renderSortView();
    this._filter = FILTER_MODE.all;
    this._renderFilmsLists();
  }
}
