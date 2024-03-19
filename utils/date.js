export function getFormattedDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getDateMinusDays(dateString, days) {
  const date = new Date(dateString);

  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
