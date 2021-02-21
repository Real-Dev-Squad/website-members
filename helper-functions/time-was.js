const calc = (interval, cycle) => Math.floor(cycle / interval);

function timeWas(timestamp, completeDate = false, differentNow = Date.now()) {
  const timeInSec = Math.floor(differentNow - timestamp) / 1000;

  /**
   * const mins = calc(60, secs)
   * const hours = calc(60, mins)
   * const days = calc(24, hours)
   */

  if (completeDate) {
    const dateObject = new Date(timestamp);
    const month = dateObject.toLocaleString('default', { month: 'long' });
    return `${dateObject.getDate()} ${month}, ${dateObject.getFullYear()}`;
  }

  const mins = calc(60, timeInSec);
  const hours = calc(60, mins);
  const days = calc(24, hours);
  const weeks = calc(7, days);
  const months = calc(30, days);
  const years = calc(12, months);

  let result = years;
  let cycle = 'year';

  if (timeInSec < 1) {
    return '0 second';
  } else if (years > 0) {
    result = years;
    cycle = 'year';
  } else if (months > 0) {
    result = months;
    cycle = 'month';
  } else if (weeks > 0) {
    result = weeks;
    cycle = 'week';
  } else if (days > 0) {
    result = days;
    cycle = 'day';
  } else if (hours > 0) {
    result = hours;
    cycle = 'hour';
  } else if (mins > 0) {
    result = mins;
    cycle = 'minute';
  } else {
    result = timeInSec;
    cycle = 'second';
  }

  return `${result} ${cycle}${result > 1 ? 's' : ''}`;
}

export { timeWas };
