// TODO: Try date-dns --> https://date-fns.org/

import dayjs from 'dayjs';
import localIn from 'dayjs/locale/en-in';

const _currentTimeDefaultFormat = 'hh:mm:ss A --> ddd DD/MM/YYYY'; // 11:17:09 AM --> Sat 10/04/2021
export const getCurrentTime = ({format = _currentTimeDefaultFormat} = {}) => {
  return dayjs().locale(localIn).format(format);
};
