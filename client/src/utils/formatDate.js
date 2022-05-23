const monthNames = [
  "jan.",
  "feb.",
  "mar.",
  "apr.",
  "may",
  "june",
  "july",
  "aug.",
  "sept.",
  "oct.",
  "nov.",
  "dec.",
];

function formatDate(dateFromServer) {
  const date = new Date(dateFromServer);
  const now = new Date();

  if (
    date.getDate() === now.getDate() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return `${date.getHours()}:${date.getMinutes()}, today`;
  }

  return `${date.getHours()}:${date.getMinutes()}, ${date.getDate()} ${
    monthNames[date.getMonth()]
  }`;
}

export default formatDate;
