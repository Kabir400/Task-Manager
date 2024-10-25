const {
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
} = require("date-fns");

// const getStartOfWeek = () => startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday
// const getEndOfWeek = () => endOfWeek(new Date(), { weekStartsOn: 0 }); // Saturday
const getStartOfWeek = () =>
  startOfDay(startOfWeek(new Date(), { weekStartsOn: 0 }));
const getEndOfWeek = () => endOfDay(endOfWeek(new Date(), { weekStartsOn: 0 }));

const getStartOfToday = () => startOfDay(new Date());
const getEndOfToday = () => endOfDay(new Date());
const getStartOfMonth = () => startOfMonth(new Date());
const getEndOfMonth = () => endOfMonth(new Date());

module.exports = {
  getStartOfWeek,
  getEndOfWeek,
  getStartOfToday,
  getEndOfToday,
  getStartOfMonth,
  getEndOfMonth,
};
