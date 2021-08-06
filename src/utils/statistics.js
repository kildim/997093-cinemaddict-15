const calculateFilmStats = (statistic) => (film) => {
  const filmStats = statistic;
  const userDetails = film['user_details'];

  if (userDetails['watchlist']) {
    filmStats.watchList++;
  }
  if (userDetails['already_watched']) {
    filmStats.history++;
  }
  if (userDetails['favorite']) {
    filmStats.favorites++;
  }
};

const getStats = (films = []) => {
  const stats = {
    watchList: 0,
    history: 0,
    favorites: 0,
  };

  films.forEach(calculateFilmStats(stats));
  return stats;
};

export {getStats};
