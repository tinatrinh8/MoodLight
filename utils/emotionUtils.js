import {
  format,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
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
    Monthly: startOfMonth(now),
    Yearly: startOfYear(now),
  }[period];

  const end = {
    Monthly: endOfMonth(now),
    Yearly: endOfYear(now),
  }[period];

  return entries.filter((entry) => {
    const entryDate = entry.journalDate; // journalDate is a string in YYYY-MM-DD format
    return entryDate >= format(start, "yyyy-MM-dd") && entryDate <= format(end, "yyyy-MM-dd");
  });
};
