const MAX_DESCRIPTION_LENGTH = 139;

const truncateDescription = (description) => description.length > MAX_DESCRIPTION_LENGTH ? `
  ${description.slice(0, MAX_DESCRIPTION_LENGTH)}...` : description;

const extractFirstGenre = (genre) => genre.length > 0 ? genre[0] : [];

export {truncateDescription, extractFirstGenre};
