import dayjs from 'dayjs';
// import localIn from 'dayjs/locale/en-in';
import advancedFormat from 'dayjs/plugin/advancedFormat';
// import localizedFormat from 'dayjs/plugin/localizedFormat';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(advancedFormat); // REF: https://day.js.org/docs/en/plugin/advanced-format
// dayjs.extend(localizedFormat); // REF: https://day.js.org/docs/en/plugin/localized-format
dayjs.extend(calendar); // REF: https://day.js.org/docs/en/plugin/calendar

// const _currentTimeDefaultFormat = 'hh:mm:ss A --> ddd DD/MM/YYYY'; // 11:17:09 AM --> Sat 10/04/2021
export const getCurrentTime = () => {
  // return dayjs().locale(localIn).format('llll');
  // return dayjs().format('llll');
  return dayjs().calendar();
};

export const getDisplayDate = (date) => {
  return dayjs(date).format('MMMM Do, YYYY');
};
