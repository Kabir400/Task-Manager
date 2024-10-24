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

const formatymd = (dateStr) => {
  const date = new Date(dateStr);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export { formatDate, checkDueDatePassed, DateFormat, formatymd };
