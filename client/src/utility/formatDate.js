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


const today=()=>{

    const date = new Date();
    const day = date.getDate();
    const suffix = (day % 10 === 1 && day !== 11) ? "st" :
                   (day % 10 === 2 && day !== 12) ? "nd" :
                   (day % 10 === 3 && day !== 13) ? "rd" : "th";
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day}${suffix} ${month}, ${year}`;

}

export { formatDate, checkDueDatePassed, DateFormat, formatymd,today };
