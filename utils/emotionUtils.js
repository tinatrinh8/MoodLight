import {
  format,
  isWithinInterval,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  addDays,
} from "date-fns";

/**
 * Get the top N emotions across all journal entries.
 * @param {Array} entries - Array of journal entries.
 * @param {number} count - Number of top emotions to return.
 * @returns {Array} - Array of top N emotions.
 */
export const getTopEmotions = (entries, count) => {
  const emotionCounts = {};

  entries.forEach((entry) => {
    if (entry.topEmotions) {
      entry.topEmotions.forEach((emotion) => {
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
      });
    }
  });

  return Object.entries(emotionCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by count (descending)
    .slice(0, count) // Take top `count` emotions
    .map(([emotion]) => emotion);
};

/**
 * Get the start date of the week.
 * @param {Date} referenceDate - A reference date.
 * @returns {Date} - Start date of the week.
 */
export const getStartOfWeek = (referenceDate) =>
  startOfWeek(referenceDate, { weekStartsOn: 1 });

/**
 * Get the end date of the week.
 * @param {Date} referenceDate - A reference date.
 * @returns {Date} - End date of the week.
 */
export const getEndOfWeek = (referenceDate) =>
  endOfWeek(referenceDate, { weekStartsOn: 1 });

/**
 * Get the start date of the year.
 * @param {Date} referenceDate - A reference date.
 * @returns {Date} - Start date of the year (January 1st).
 */
export const getStartOfYear = (referenceDate) => startOfYear(referenceDate);

/**
 * Get the end date of the year.
 * @param {Date} referenceDate - A reference date.
 * @returns {Date} - End date of the year (December 31st).
 */
export const getEndOfYear = (referenceDate) => endOfYear(referenceDate);

/**
 * Generate labels for months.
 * @returns {Array<string>} - Array of month labels.
 */
export const generateMonthLabels = () => [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Group data by month for a specific year.
 * @param {Array} entries - Array of journal entries.
 * @param {Date} startOfYear - Start date of the year.
 * @param {Date} endOfYear - End date of the year.
 * @param {Array<string>} emotions - List of emotions to track.
 * @returns {Array<Object>} - Monthly emotion counts.
 */
export const groupDataByMonth = (entries, startOfYear, endOfYear, emotions) => {
  if (!entries || !Array.isArray(entries)) {
    console.error("Entries are undefined or not an array:", entries);
    return [];
  }

  if (!emotions || !Array.isArray(emotions)) {
    console.error("Emotions are undefined or not an array:", emotions);
    return [];
  }

  const monthlyCounts = Array.from({ length: 12 }, () =>
    emotions.reduce((acc, emotion) => ({ ...acc, [emotion]: 0 }), {})
  );

  entries.forEach((entry) => {
    const entryDate = new Date(entry.journalDate);
    if (entryDate >= startOfYear && entryDate <= endOfYear) {
      const monthIndex = entryDate.getMonth(); // 0 = Jan, 11 = Dec
      if (entry.topEmotions) {
        entry.topEmotions.forEach((emotion) => {
          if (emotions.includes(emotion)) {
            monthlyCounts[monthIndex][emotion] += 1;
          }
        });
      }
    }
  });

  return monthlyCounts;
};

/**
 * Filter entries within a specific date range.
 * @param {Array} entries - Array of journal entries.
 * @param {string} period - Time period to filter (Weekly, Monthly, Yearly).
 * @returns {Array} - Filtered journal entries within the specified time range.
 */
export const filterEntriesByPeriod = (entries, period) => {
  const now = new Date();

  const start = {
    Weekly: getStartOfWeek(now),
    Monthly: startOfMonth(now),
    Yearly: startOfYear(now),
  }[period];

  const end = {
    Weekly: getEndOfWeek(now),
    Monthly: endOfMonth(now),
    Yearly: endOfYear(now),
  }[period];

  return entries.filter((entry) => {
    const entryDate = new Date(entry.journalDate);
    return isWithinInterval(entryDate, { start, end });
  });
};

/**
 * Generate weekday labels for a specific week.
 * @param {Date} startDate - Start date of the week.
 * @returns {Array<string>} - Array of weekday labels (e.g., ["Mon", "Tue", "Wed", ...]).
 */
export const generateWeekDays = (startDate) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = addDays(startDate, i);
    days.push(format(day, "EEE")); // Short weekday format (e.g., "Mon")
  }
  return days;
};

/**
 * Group journal entries by day for a specific week.
 * @param {Array} entries - Array of journal entries.
 * @param {Date} startDate - Start date of the week.
 * @param {Date} endDate - End date of the week.
 * @param {Array<string>} emotions - List of emotions to track.
 * @returns {Array<Object>} - Array of objects with daily emotion counts.
 */
export const groupDataByDay = (entries, startDate, endDate, emotions) => {
  const groupedData = {};

  // Initialize groupedData with all days of the week
  for (let i = 0; i < 7; i++) {
    const day = format(addDays(startDate, i), "yyyy-MM-dd");
    groupedData[day] = {};
    emotions.forEach((emotion) => {
      groupedData[day][emotion] = 0; // Initialize all emotions to 0
    });
  }

  // Populate groupedData with actual entry data
  entries.forEach((entry) => {
    const entryDate = format(new Date(entry.journalDate), "yyyy-MM-dd");
    if (groupedData[entryDate]) {
      entry.topEmotions.forEach((emotion) => {
        if (groupedData[entryDate][emotion] !== undefined) {
          groupedData[entryDate][emotion]++;
        }
      });
    }
  });

  // Convert groupedData to array format suitable for charting
  return Object.entries(groupedData).map(([date, emotionData]) => ({
    date,
    ...emotionData,
  }));
};
