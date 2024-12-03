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

export const getTopEmotions = (entries, count) => {
  if (!entries || entries.length === 0) {
    console.log("No entries provided to getTopEmotions.");
    return [];
  }

  const emotionCounts = {};

  entries.forEach((entry) => {
    if (entry.topEmotions) {
      entry.topEmotions.forEach((emotion) => {
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
      });
    }
  });

  console.log("Emotion Counts:", emotionCounts); // Debug the aggregated emotion counts

  const topEmotions = Object.entries(emotionCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by count (descending)
    .slice(0, count) // Take top `count` emotions
    .map(([emotion]) => emotion);

  console.log("Top Emotions Computed:", topEmotions); // Debug the final top emotions list

  return topEmotions;
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
export const groupDataByMonth = (entries, currentYear, emotions) => {
  if (!entries || !Array.isArray(entries)) {
    console.error("Entries are undefined or not an array:", entries);
    return [];
  }

  if (!emotions || !Array.isArray(emotions)) {
    console.error("Emotions are undefined or not an array:", emotions);
    return [];
  }

  // Initialize counts for 12 months
  const monthlyCounts = Array.from({ length: 12 }, () =>
    emotions.reduce((acc, emotion) => ({ ...acc, [emotion]: 0 }), {})
  );

  entries.forEach((entry) => {
    const [year, month] = entry.journalDate.split("-"); // Extract year and month as strings

    if (parseInt(year, 10) === currentYear) {
      const monthIndex = parseInt(month, 10) - 1; // Convert month string ("01") to zero-based index (0 = Jan)
      if (monthIndex >= 0 && monthIndex <= 11 && entry.topEmotions) {
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


export const groupDataByMonthWithDetails = (entries, startOfYear, endOfYear, emotions) => {
  if (!entries || !Array.isArray(entries)) {
    console.error("Entries are undefined or not an array:", entries);
    return [];
  }

  if (!emotions || !Array.isArray(emotions)) {
    console.error("Emotions are undefined or not an array:", emotions);
    return [];
  }

  // Create an array of 12 empty arrays for each month
  const monthlyDetails = Array.from({ length: 12 }, () => []);

  entries.forEach((entry) => {
    const entryDate = entry.journalDate; // journalDate is a string in YYYY-MM-DD format
    const [year, month, day] = entryDate.split("-"); // Extract year, month, day as strings

    if (
      parseInt(year, 10) >= startOfYear.getFullYear() &&
      parseInt(year, 10) <= endOfYear.getFullYear()
    ) {
      const monthIndex = parseInt(month, 10) - 1; // Convert month string ("01", "02", etc.) to index (0-11)
      if (monthIndex >= 0 && monthIndex <= 11) { // Ensure valid month range
        if (entry.topEmotions) {
          const top3Emotions = entry.topEmotions.slice(0, 3); // Take top 3 emotions
          monthlyDetails[monthIndex].push({ date: entryDate, emotions: top3Emotions });
        }
      }
    }
  });

  // Log the grouped data for each month
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  monthlyDetails.forEach((month, index) => {
    console.log(`Month: ${monthNames[index]}`);
    month.forEach((entry) => {
      console.log(`  Date: ${entry.date}, Top Emotions: ${entry.emotions.join(", ")}`);
    });
  });

  return monthlyDetails;
};

// Group data by year for yearly view
export const groupDataByYear = (entries, currentYear, emotions) => {
  if (!entries || !Array.isArray(entries)) {
    console.error("Entries are undefined or not an array:", entries);
    return [];
  }

  if (!emotions || !Array.isArray(emotions)) {
    console.error("Emotions are undefined or not an array:", emotions);
    return [];
  }

  // Initialize counts for 12 months
  const monthlyCounts = Array.from({ length: 12 }, () =>
    emotions.reduce((acc, emotion) => ({ ...acc, [emotion]: 0 }), {})
  );

  entries.forEach((entry) => {
    const [year, month] = entry.journalDate.split("-"); // Extract year and month from journalDate

    if (parseInt(year, 10) === currentYear) {
      const monthIndex = parseInt(month, 10) - 1; // Convert month string ("01") to zero-based index
      if (monthIndex >= 0 && monthIndex <= 11 && entry.topEmotions) {
        entry.topEmotions.forEach((emotion) => {
          if (emotions.includes(emotion)) {
            monthlyCounts[monthIndex][emotion] += 1;
          }
        });
      }
    }
  });

  return monthlyCounts; // Return counts for each month
};

