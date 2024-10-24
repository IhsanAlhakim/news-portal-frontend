const getDate = (inputDate: string) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const inputedDate = new Date(inputDate);

  const day = days[inputedDate.getDay()];
  const date = inputedDate.getDate();
  const month = months[inputedDate.getMonth()];
  const year = inputedDate.getFullYear();
  const hour = inputedDate.getHours();
  const minute = inputedDate.getMinutes();
  const second = inputedDate.getSeconds();

  return `${day}, ${date} ${month} ${year} ${hour}:${minute}:${second}`;
};

export default getDate;
