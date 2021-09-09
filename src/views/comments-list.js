import {createCommentTemplate} from './comment.js';

export const createCommentsListTemplate = (comments = {}) =>
  (comments.map((comment) => (`
        <ul class="film-details__comments-list">
            ${createCommentTemplate(comment)}
        </ul>`)).join('').trim());
