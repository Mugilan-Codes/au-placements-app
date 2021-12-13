import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(advancedFormat); // REF: https://day.js.org/docs/en/plugin/advanced-format
dayjs.extend(calendar); // REF: https://day.js.org/docs/en/plugin/calendar

export const getCurrentTime = () => {
  return dayjs().calendar();
};

export const getDisplayDate = (date) => {
  return dayjs(date).format('MMMM Do, YYYY');
};
