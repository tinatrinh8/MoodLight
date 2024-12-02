import {
  format,
  isWithinInterval,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  startOfDay,
  addDays,
} from "date-fns";

import nlp from "compromise";

// Function to extract emotion tags from a given text
export const getEmotionTags = (emotions, text) => {
  if (!text || typeof text !== "string") {
    throw new Error("Text input is invalid or empty.");
  }

  const doc = nlp(text);
  const emotionTags = {};

  emotions.forEach((emotion) => {
    const emotionLabel = emotion.toLowerCase();
    emotionTags[emotionLabel] = [];

    // Find nouns, verbs, and adjectives in the text that match the emotion label
    doc.nouns().json().forEach((word) => {
      if (word.text.includes(emotionLabel.slice(0, 3))) {
        emotionTags[emotionLabel].push(word.text);
      }
    });
    doc.verbs().json().forEach((word) => {
      if (word.text.includes(emotionLabel.slice(0, 3))) {
        emotionTags[emotionLabel].push(word.text);
      }
    });
    doc.adjectives().json().forEach((word) => {
      if (word.text.includes(emotionLabel.slice(0, 3))) {
        emotionTags[emotionLabel].push(word.text);
      }
    });

    emotionTags[emotionLabel] = [...new Set(emotionTags[emotionLabel])]; // Remove duplicates
  });

  return emotionTags;
};

// Get the top N emotions across all journal entries
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

export const getEmotionCounts = (entries) => {
  const emotionCounts = {};

  entries.forEach((entry) => {
    if (entry.topEmotions) {
      entry.topEmotions.forEach((emotion) => {
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
      });
    }
  });

  return emotionCounts;
};

// Get the start date of the week
export const getStartOfWeek = (referenceDate) =>
  startOfWeek(referenceDate, { weekStartsOn: 1 });

// Get the end date of the week
export const getEndOfWeek = (referenceDate) =>
  endOfWeek(referenceDate, { weekStartsOn: 1 });

// Get the start date of the year
export const getStartOfYear = (referenceDate) => startOfYear(referenceDate);

// Get the end date of the year
export const getEndOfYear = (referenceDate) => endOfYear(referenceDate);

// Generate labels for months
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

// Group data by month for a specific year
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
    const entryDate = entry.journalDate; // journalDate is a string in YYYY-MM-DD format
    const entryDateObj = new Date(entryDate); // Convert to Date object for checking range
    if (entryDateObj >= startOfYear && entryDateObj <= endOfYear) {
      const monthIndex = entryDateObj.getMonth(); // 0 = Jan, 11 = Dec
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

// Filter entries within a specific date range
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
    const entryDate = entry.journalDate; // journalDate is a string in YYYY-MM-DD format
    return entryDate >= format(start, "yyyy-MM-dd") && entryDate <= format(end, "yyyy-MM-dd");
  });
};


// Generate weekday labels for a specific week (Starting from Monday)
export const generateWeekDays = (startDate) => {
  const days = [];
  const normalizedStartDate = startOfWeek(startDate, { weekStartsOn: 1 });
  for (let i = 0; i < 7; i++) {
    const day = addDays(normalizedStartDate, i);
    days.push(format(day, "EEE")); // Short weekday names
  }
  return days;
};



// Group data by day using journalDate as strings for comparison
export const groupDataByDay = (entries, startDate, endDate, emotions) => {
  const groupedData = [];

  // Normalize the start date to Monday
  const mondayStart = startOfWeek(startDate, { weekStartsOn: 1 }); // Explicitly start from Monday
  console.log("Normalized Start of Week (Monday):", mondayStart);

  // Generate days for the week, starting on Monday
  for (let i = 0; i < 7; i++) {
    const currentDate = format(addDays(mondayStart, i), "yyyy-MM-dd");
    const dailyData = { date: currentDate };

    // Initialize emotion counts
    emotions.forEach((emotion) => {
      dailyData[emotion] = 0;
    });

    groupedData.push(dailyData);
  }

  // Map entries to the correct day
  entries.forEach((entry) => {
    const entryDate = entry.journalDate; // journalDate is in "YYYY-MM-DD" format
    const matchingDay = groupedData.find((day) => day.date === entryDate);

    if (matchingDay && entry.topEmotions) {
      entry.topEmotions.forEach((emotion) => {
        if (emotions.includes(emotion)) {
          matchingDay[emotion] += 1; // Increment the count for that emotion
        }
      });
    }
  });

  console.log("Grouped Data Days:", groupedData.map((day) => day.date));
  return groupedData;
};
