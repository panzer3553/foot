import moment from 'moment';

export const callTime = (mins) => {
  let timeZone = new moment().utcOffset();

  var h = (mins + timeZone) / 60 | 0,
    m = (mins + timeZone) % 60 | 0;

  let date = new moment().hours(h).minutes(m);

  return { time: date.utc().format('hh:mm'), surfix: date.format('A') };
};

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
