import { format, isWithinInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";

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
 * Calculate emotion counts over time for the given time period and emotions.
 * @param {Array} entries - Array of journal entries.
 * @param {string} period - Time period (Weekly, Monthly, Yearly).
 * @param {Array} emotions - Array of emotions to calculate counts for.
 * @returns {Array} - Array of objects with date and emotion counts.
 */
export const calculateEmotionCounts = (entries, period, emotions) => {
  const counts = {}; // Store counts by dateKey

  const getDateKey = (date) => {
    if (period === "Weekly") {
      return format(startOfWeek(date), "yyyy-MM-dd"); // Use start of the week for the key
    } else if (period === "Monthly") {
      return format(date, "yyyy-MM"); // Use month for the key
    } else if (period === "Yearly") {
      return format(date, "yyyy"); // Use year for the key
    }
    return format(date, "yyyy-MM-dd"); // Default to daily key
  };

  entries.forEach((entry) => {
    const entryDate = new Date(entry.journalDate);
    const dateKey = getDateKey(entryDate); // Get date key for current entry's time period

    if (!counts[dateKey]) {
      counts[dateKey] = {}; // Initialize if not already present
    }

    if (entry.topEmotions) {
      entry.topEmotions.forEach((emotion) => {
        if (emotions.includes(emotion)) {
          counts[dateKey][emotion] = (counts[dateKey][emotion] || 0) + 1; // Count occurrences of emotions
        }
      });
    }
  });

  // Return the counts in a format suitable for charting
  return Object.entries(counts).map(([date, emotionData]) => {
    const entry = { date };
    emotions.forEach((emotion) => {
      entry[emotion] = emotionData[emotion] || 0; // Set emotion count or 0 if emotion doesn't exist
    });
    return entry;
  });
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
    Weekly: startOfWeek(now),
    Monthly: startOfMonth(now),
    Yearly: startOfYear(now),
  }[period];

  const end = {
    Weekly: endOfWeek(now),
    Monthly: endOfMonth(now),
    Yearly: endOfYear(now),
  }[period];

  return entries.filter((entry) => {
    const entryDate = new Date(entry.journalDate);
    return isWithinInterval(entryDate, { start, end });
  });
};
