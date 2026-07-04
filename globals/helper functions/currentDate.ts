type DateInput = Date | string | number | null | undefined;

export function getDateFormatted(rawDate?: DateInput) {
  const date = rawDate ? new Date(rawDate) : new Date();

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  } as const;

  const formattedDate = date.toLocaleDateString("en-GB", options);

  return formattedDate;
}
