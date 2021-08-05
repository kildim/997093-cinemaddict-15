import {getRandomInteger} from '../utils/utils.js';
import {EMOTIONS} from '../constants/emotions.js';
import dayjs from 'dayjs';

const FILM_MOCKS_NUMBER = 17;
const AGE_RATINGS = ['0+', '6+', '12+', '16+', '18+'];
const TITLES = [
  'The Dance of Life',
  'Santa Claus Conquers the Martians',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'Made for Each Other',
];
const POSTERS = [
  'images/posters/made-for-each-other.png',
  'images/posters/popeye-meets-sinbad.png',
  'images/posters/sagebrush-trail.jpg',
  'images/posters/santa-claus-conquers-the-martians.jpg',
  'images/posters/the-dance-of-life.jpg',
  'images/posters/the-great-flamarion.jpg',
  'images/posters/the-man-with-the-golden-arm.jpg',
];
const MOVIE_DIRECTORS = [
  'Steven Spielberg',
  'Martin Scorsese',
  'Alfred Hitchcock',
  'Stanley Kubrick',
  'Quentin Tarantino',
];
const FILM_WRITERS = [
  'Asghar Farhadi',
  'Eric Roth',
  'Aaron Sorkin',
  'Woody Allen',
  'Chang-dong Lee',
];
const FILM_ACTORS = [
  'Robert De Niro',
  'Jack Nicholson',
  'Marlon Brando',
  'Denzel Washington',
  'Katharine Hepburn',
];
const COUNTRIES = [
  'Finland',
  'Russia',
  'Italy',
  'France',
  'US',
];
const GENRES = [
  'Musicals',
  'Horror',
  'Crime',
  'Drama',
  'Fantasy',
];
const AUTHORS = [
  'Arto Siitonen',
  'Ida Niemi',
  'Raimo Laaksonen',
  'Anne Lahtinen',
  'Hannu Katajakoski',
];
const LOREM_IPSUM_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
  'Cras aliquet varius magna, non porta ligula feugiat eget. ' +
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut ' +
  'lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, ' +
  'sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, ' +
  'sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod ' +
  'diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in ' +
  'sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In ' +
  'rutrum ac purus sit amet tempus.';
const AVATAR = 'images/bitmap@2x.png';
const SENTENCES_DIVIDER = /(?<=\.) /;

const idMaker = function* (){
  let index = 0;
  while(true)
  {yield index++;}
};
const filmId = idMaker();
const commentId = idMaker();
const userID = idMaker();

const getArrayRandomSlice = (array) => new Array(getRandomInteger(0, array.length)).
  fill('').map(() => array[getRandomInteger(0, array.length-1)]);

const divideIntoSentences = (text) => text.split(SENTENCES_DIVIDER);

const getRandomElementFromArray = (array) => (array[getRandomInteger(0,array.length-1)]);
const getRandomRating = () => (getRandomInteger(0,100)/10).toFixed(1);

const getRandomDate = (minYear, maxYear) => {
  const year = String(getRandomInteger(minYear, maxYear));
  const month = String(getRandomInteger(1,12));
  const day = String(getRandomInteger(1, dayjs(`${year}-${month}-01`).daysInMonth()));
  const hours = String(getRandomInteger(0,23));
  const minutes = String(getRandomInteger(0,59));
  const seconds = String(getRandomInteger(0,59));

  return dayjs(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
};
const getRandomDescription = () => {
  const MAX_DESCRIPTION_LENGTH = 5;
  const MIN_DESCRIPTION_LENGTH = 1;

  const descriptionLength = getRandomInteger(MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH);
  const descriptionSentences = divideIntoSentences(LOREM_IPSUM_TEXT);
  let description = '';

  for (let loopCounter = 0; loopCounter < descriptionLength; loopCounter++) {
    description += ` ${  descriptionSentences[getRandomInteger(descriptionSentences.length-1)]}`;
  }

  return description.trim();
};
const getRandomComment = getRandomDescription;

const getCommentMock = () => ({
  'id': commentId.next().value,
  'author': getRandomElementFromArray(AUTHORS),
  'comment': getRandomComment(),
  'date': getRandomDate(2021, 2021),
  'emotion': getRandomElementFromArray(EMOTIONS),
});
const getMockUser = () => ({
  'id': userID.next().value,
  'avatar': `${AVATAR}`,
});

const MOCK_COMMENTS_NUMBER = getRandomInteger(0, 5);
const getMockComments = () => new Array(MOCK_COMMENTS_NUMBER).fill('').map(getCommentMock);

const getFilmMock = () => ({
  'id': filmId.next().value,
  'comments': getMockComments(),
  'film_info': {
    'title': getRandomElementFromArray(TITLES),
    'alternative_title': getRandomElementFromArray(TITLES),
    'total_rating': getRandomRating(),
    'age_rating': getRandomElementFromArray(AGE_RATINGS),
    'poster': getRandomElementFromArray(POSTERS),
    'director': getRandomElementFromArray(MOVIE_DIRECTORS),
    'writers': getArrayRandomSlice(FILM_WRITERS),
    'actors': getArrayRandomSlice(FILM_ACTORS),
    'release': {
      'date': getRandomDate(1960, 2020),
      'release_country': getRandomElementFromArray(COUNTRIES),
    },
    'runtime': getRandomInteger(0, 1000),
    'genre': getArrayRandomSlice(GENRES),
    'description': getRandomDescription(),
  },
  'user_details': {
    'watchlist': Boolean(getRandomInteger(0, 1)),
    'already_watched': Boolean(getRandomInteger(0, 1)),
    'watching_date': getRandomDate(2000, 2020),
    'favorite': Boolean(getRandomInteger(0, 1)),
  },
});

const getMockFilms = () => new Array(FILM_MOCKS_NUMBER).fill('').map(getFilmMock);

export {getMockFilms, getMockComments, getMockUser};
