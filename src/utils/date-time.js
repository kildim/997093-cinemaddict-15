import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale('ru');

const formatTime = (time) => dayjs(time).format('H[h] m[m]');
const formatDate = (date) => dayjs(date).format('D MMMM YYYY');
const calculateDateRepresentation = (date) => {
  const currentDate = dayjs();
  const commentDate = dayjs(date);
  return dayjs.duration(commentDate.diff(currentDate)).humanize(true);
};

export {formatTime, formatDate, calculateDateRepresentation};
