export const  createCommentsHeader = (film) => `
  <h3 class="film-details__comments-title">Comments
    <span class="film-details__comments-count">${film['comments'].length}</span>
  </h3>
`;
