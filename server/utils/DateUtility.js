const {
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
} = require("date-fns");

const getStartOfWeek = () => startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday
const getEndOfWeek = () => endOfWeek(new Date(), { weekStartsOn: 0 }); // Saturday
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
