import {createCommentTemplate} from './comment.js';

export const createCommentsListTemplate = (filmData = {}) => {
  const comments =  filmData['comments'];
  return `
     <ul class="film-details__comments-list">
       ${comments.reduce((commentText, comment)=> (commentText.concat(createCommentTemplate(comment))), '')}
     </ul>
     `;
};
