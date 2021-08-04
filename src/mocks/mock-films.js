import {getRandomInteger} from '../utils/mathematics.js';
import {AGE_RATINGS} from '../constants/age-rating.js';
import {EMOTIONS} from '../constants/emotions.js';
import dayjs from 'dayjs';

const POSTERS_DIRECTORY = './images/posters/';
const FILM_MOCKS_NUMBER = 17;
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
  `${POSTERS_DIRECTORY}made-for-each-other.png`,
  `${POSTERS_DIRECTORY}popeye-meets-sinbad.png`,
  `${POSTERS_DIRECTORY}sagebrush-trail.jpg`,
  `${POSTERS_DIRECTORY}santa-claus-conquers-the-martians.jpg`,
  `${POSTERS_DIRECTORY}the-dance-of-life.jpg`,
  `${POSTERS_DIRECTORY}the-great-flamarion.jpg`,
  `${POSTERS_DIRECTORY}the-man-with-the-golden-arm.jpg`,
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
const FILM_GENRES = [
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
const AVATAR = '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';

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

const divideIntoSentences = (text) => text.split(/(?<=\.) /);
const getRandomTitle = () => TITLES[getRandomInteger(0,TITLES.length-1)];
const getRandomPoster = () => POSTERS[getRandomInteger(0,POSTERS.length-1)];
const getRandomRating = () => (getRandomInteger(0,100)/10).toFixed(1);
const getRandomAgeRating = () => AGE_RATINGS[getRandomInteger(0, AGE_RATINGS.length-1)];
const getRandomMovieDirector = () => MOVIE_DIRECTORS[getRandomInteger(0, MOVIE_DIRECTORS.length-1)];
const getRandomCountry = ()  => COUNTRIES[getRandomInteger(0, COUNTRIES.length-1)];
const getRandomAuthor = () => AUTHORS[getRandomInteger(0, AUTHORS.length-1)];
const getRandomEmotion = () => EMOTIONS[getRandomInteger(0, EMOTIONS.length-1)];
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
  'author': getRandomAuthor(),
  'comment': getRandomComment(),
  'date': getRandomDate(2021, 2021),
  'emotion': getRandomEmotion(),
});
const getMockUser = () => ({
  'id': userID.next().value,
  'avatar': `data:image/png;base64,${AVATAR}`,
});

const MOCK_COMMENTS_NUMBER = getRandomInteger(0, 5);
const getMockComments = () => new Array(MOCK_COMMENTS_NUMBER).fill('').map(getCommentMock);

const getFilmMock = () => ({
  'id': filmId.next().value,
  'comments': getMockComments(),
  'film_info': {
    'title': getRandomTitle(),
    'alternative_title': getRandomTitle(),
    'total_rating': getRandomRating(),
    'age_rating': getRandomAgeRating(),
    'poster': getRandomPoster(),
    'director': getRandomMovieDirector(),
    'writers': getArrayRandomSlice(FILM_WRITERS),
    'actors': getArrayRandomSlice(FILM_ACTORS),
    'release': {
      'date': getRandomDate(1960, 2020),
      'release_country': getRandomCountry(),
    },
    'runtime': getRandomInteger(0, 1000),
    'genre': getArrayRandomSlice(FILM_GENRES),
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
