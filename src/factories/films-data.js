const filmData = {
  title: 'The Dance of Life',
  rating: '8.3',
  info: {
    year: '1929',
    duration: '1h 55m',
    genre: 'Musical',
  },
  poster: './images/posters/the-dance-of-life.jpg',
  description: 'Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), ' +
    'end up together on a cold, rainy night at a tr…',

  comments: '5 comments',
};

const getFilm = () => {
  const film = {};
  Object.assign(film, filmData);
  return film;
};

export {getFilm};
