const EMOJIS_PATH = './images/emoji/';

const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];
const getEmojiPath = (emotion) => `${EMOJIS_PATH}${emotion}.png`;

export {EMOTIONS, getEmojiPath};
