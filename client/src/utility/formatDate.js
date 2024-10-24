const formatDate = (date) => {
  const DateObj = new Date(date);

  const options = { month: "short", day: "numeric" };
  const formattedDate = DateObj.toLocaleDateString("en-US", options); //FEB 10

  return formattedDate;
};

const checkDueDatePassed = (date) => {
  const today = new Date();
  const dueDate = new Date(date);

  return dueDate < today;
};
function DateFormat(dateStr) {
  const [year, month, day] = dateStr.split("-");

  return `${month}/${day}/${year}`;
}

export { formatDate, checkDueDatePassed, DateFormat };
