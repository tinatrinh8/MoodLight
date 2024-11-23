export const calculateStreaks = (journalEntries) => {
  if (!journalEntries || !journalEntries.length) {
    return { longestStreak: 0, currentStreak: 0, journalDays: 0 };
  }

  // Step 1: Extract and sort dates
  const dates = journalEntries
    .map((entry) => entry.journalDate) // Get journalDate
    .map((date) => new Date(date)) // Convert to Date objects
    .sort((a, b) => a - b); // Sort ascending

  let longestStreak = 0;
  let currentStreak = 1;
  let journalDays = new Set(journalEntries.map((entry) => entry.journalDate)).size; // Count unique days

  // Step 2: Calculate streaks
  for (let i = 1; i < dates.length; i++) {
    const prevDate = dates[i - 1];
    const currentDate = dates[i];
    const diffDays = (currentDate - prevDate) / (1000 * 3600 * 24); // Difference in days

    if (diffDays === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1; // Reset streak if not consecutive
    }
  }

  // Step 3: Check if the current streak is still active
  const today = new Date();
  const lastEntryDate = dates[dates.length - 1];
  const daysSinceLastEntry = Math.floor((today - lastEntryDate) / (1000 * 3600 * 24));

  if (daysSinceLastEntry > 1) {
    currentStreak = 0; // Reset streak if the last entry was more than a day ago
  }

  return { longestStreak, currentStreak, journalDays };
};
