import {getEmojiPath} from '../constants/emotions.js';
import {calculateDateRepresentation} from '../utils/date-time.js';

const parseData = (data = {}) => ({
  author: data['author'] || '',
  commentText: data['comment'] || '',
  date: calculateDateRepresentation(data['date']) || '',
  emoji: getEmojiPath(data['emotion']),
});

export const createCommentTemplate = (comment) => {
  const {author, commentText, date, emoji} = parseData(comment);

  return `
    <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src=${emoji} width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${commentText}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>
  `;
};
