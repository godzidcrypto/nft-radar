import { utcToZonedTime, format } from "date-fns-tz";

export default function DateComponent({ dateString }) {
  const timeZone = "Iceland";
  const zonedDate = utcToZonedTime(dateString, timeZone);
  const pattern = "LLLL d, yyyy";
  const date = format(zonedDate, pattern, { timeZone: timeZone });

  return <time dateTime={dateString}>{date}</time>;
}
