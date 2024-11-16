import { format, utcToZonedTime } from "date-fns-tz";

export const formatDateToTimezone = (firebaseTimestamp, timeZone) => {
  const utcDate = new Date(firebaseTimestamp.seconds * 1000);

  try {
    const zonedDate = utcToZonedTime(utcDate, timeZone);
    return format(zonedDate, "yyyy-MM-dd HH:mm:ss", { timeZone });
  } catch (error) {
    console.warn("utcToZonedTime failed, using fallback:", error.message);
    const fallbackDate = new Date(utcDate.toLocaleString("en-US", { timeZone }));
    return `${fallbackDate.getFullYear()}-${String(fallbackDate.getMonth() + 1).padStart(2, "0")}-${String(fallbackDate.getDate()).padStart(2, "0")}`;
  }
};