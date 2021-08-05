import {calculateDateRepresentation, formatDate, formatTime} from './date-time.js';
import {getEmojiPath} from '../constants/emotions.js';
import {DEFAULT_POSTER} from '../constants/default-poster.js';

const MAX_DESCRIPTION_LENGTH = 139;

const truncateDescription = (description) => description.length > MAX_DESCRIPTION_LENGTH ? `
  ${description.slice(0, MAX_DESCRIPTION_LENGTH)}...` : description;

const extractFirstGenre = (genre) => genre.length > 0 ? genre[0] : [];

const parseComment = (data = {}) => ({
  author: data['author'] || '',
  commentText: data['comment'] || '',
  date: calculateDateRepresentation(data['date']) || '',
  emoji: getEmojiPath(data['emotion']),
});

const parseFilmCard = (filmData) => {
  const filmInfo = filmData['film_info'];

  return  {
    title: filmInfo['title'] || '',
    rating: filmInfo['total_rating'] || '',
    genre: extractFirstGenre(filmInfo['genre']) || '',
    poster: filmInfo['poster'] || DEFAULT_POSTER,
    duration: formatTime(filmInfo['runtime']),
    description: truncateDescription(filmInfo['description']),
  };
};

const parseFilmDetails = (filmData) => {
  const filmInfo = filmData['film_info'];
  const userDetails = filmData['user_details'];
  return  {
    poster:  filmInfo['poster'] || DEFAULT_POSTER,
    ageRating: filmInfo['age_rating'] || '',
    title: filmInfo['title'] ||  '',
    alternativeTitle: filmInfo['alternative_title'] || '',
    totalRating: filmInfo['total_rating'] || '',
    director: filmInfo['director'] || '',
    writers: filmInfo['writers'].join(', ') || '',
    actors: filmInfo['actors'].join(', ') || '',
    releaseDate: formatDate(filmInfo['release']['date']) || '',
    runtime: formatTime(filmInfo['runtime']) || '',
    releaseCountry: filmInfo['release']['release_country'] || '',
    genres: filmInfo['genre'] || [],
    description: filmInfo['description'] || [],
    watchList: userDetails['watchlist'] || false,
    watched: userDetails['already_watched'] || false,
    favorite: userDetails['favorite'] || false,
  };
};

export {parseComment, parseFilmCard, parseFilmDetails};

