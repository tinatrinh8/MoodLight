import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import CalendarRow from "../components/CalendarRow";
import { useEntryDates } from "../components/EntryDatesContext";
import { useNavigation } from "@react-navigation/native";
import { emotionColours } from "../utils/emotionColours"; // Ensure the path is correct

const CalendarScreen = () => {
  const { entryDates = [], journalEntries = [] } = useEntryDates() || {}; // Ensure fallback to empty object if undefined
  const navigation = useNavigation(); // For navigating to the homepage

  const months = [
    { name: "September", days: 30, startDay: 0, year: 2024, index: 8 },
    { name: "October", days: 31, startDay: 2, year: 2024, index: 9 },
    { name: "November", days: 30, startDay: 5, year: 2024, index: 10 },
    { name: "December", days: 31, startDay: 0, year: 2024, index: 11 },
  ];

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const getEmotionColor = (emotion) => {
    try {
      if (!emotion || typeof emotion !== "string") {
        console.warn("Invalid emotion value; using fallback color:", emotion);
        return "#FFC0CB"; // Default pink
      }

      const normalizedEmotion = emotion.trim().toLowerCase(); // Trim and convert to lowercase

      // Check if the emotion exists in the emotionColours object
      if (!emotionColours.hasOwnProperty(normalizedEmotion)) {
        console.warn(
          `Emotion not found in emotionColours: ${normalizedEmotion}`
        );
        emotionColours[normalizedEmotion] = "#AAAAAA"; // Default grey for missing emotions
      }

      return emotionColours[normalizedEmotion]; // Return the corresponding color
    } catch (error) {
      console.error("Error in getEmotionColor:", error);
      return "#FFC0CB"; // Fallback pink for unexpected errors
    }
  };

  const generateGrid = (month) => {
    if (!month) {
      console.error("Invalid month object provided to generateGrid:", month);
      return [];
    }

    const totalSlots = Math.ceil((month.days + month.startDay) / 7) * 7;
    const grid = [];
    const uniqueDays = new Map();

    journalEntries.forEach((entry) => {
      if (!entry?.journalDate) {
        console.warn("Skipping entry due to missing journalDate:", entry);
        return;
      }

      const [year, monthIndex, day] = entry.journalDate.split("-").map(Number);

      if (year === month.year && monthIndex === month.index + 1) {
        // Assign a default emotion ("neutral") if topEmotions is empty or missing
        const emotion =
          entry.topEmotions && entry.topEmotions.length > 0
            ? entry.topEmotions[0]
            : "neutral";

        // Get the color associated with the emotion
        const emotionColour = getEmotionColor(emotion);

        if (!uniqueDays.has(day)) {
          uniqueDays.set(day, { day, emotionColour });
        }
      }
    });

    const highlightedDays = Array.from(uniqueDays.values());

    for (let i = 0; i < totalSlots; i++) {
      if (i < month.startDay || i >= month.days + month.startDay) {
        grid.push(""); // Empty slot
      } else {
        const day = i - month.startDay + 1;
        const highlightedDay = highlightedDays.find((d) => d.day === day);
        grid.push({
          day,
          isJournalDate: !!highlightedDay,
          color: highlightedDay ? highlightedDay.emotionColour : "#AAAAAA", // Default grey
        });
      }
    }

    return grid;
  };

  // Function to chunk an array into smaller arrays of a given size
  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  // Handle the click of a day on the calendar
  const handleDayPress = (selectedDate) => {
    if (!selectedDate) return; // Ignore empty slots

    const journalEntry = journalEntries.find(
      (entry) => entry.journalDate === selectedDate
    );

    if (journalEntry) {
      navigation.navigate("Home", { viewJournalEntry: journalEntry });
    } else {
      navigation.navigate("Home", { selectedDate });
    }
  };

  // Log invalid or missing data for debugging
  if (!Array.isArray(months) || months.length === 0) {
    console.error("Invalid months data provided:", months);
  }
  if (!Array.isArray(journalEntries)) {
    console.error("Invalid journalEntries data provided:", journalEntries);
  }

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Journal Entries</Text>
      <ScrollView>
        {months.map((month) => {
          if (!month) {
            console.error("Skipping invalid month:", month);
            return null;
          }

          const grid = generateGrid(month); // Pass the whole month object
          const rows = chunkArray(grid, 7);

          return (
            <View key={month.name} style={styles.monthContainer}>
              <Text style={styles.monthTitle}>
                {month.name}, {month.year}
              </Text>
              <View style={styles.weekHeader}>
                {daysOfWeek.map((day, index) => (
                  <Text key={index} style={styles.weekDay}>
                    {day}
                  </Text>
                ))}
              </View>
              {rows.map((week, index) => (
                <CalendarRow
                  key={index}
                  days={week}
                  month={month}
                  entryDates={entryDates || []} // Ensure fallback to empty array
                  onDayPress={handleDayPress} // Pass the click handler
                />
              ))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: "#FFC0CB",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 30,
    fontFamily: "LexendDeca",
  },
  monthContainer: {
    marginBottom: 35,
  },
  monthTitle: {
    fontSize: 18,
    color: "#FFF",
    textAlign: "left",
    marginBottom: 20,
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  weekDay: {
    fontSize: 14,
    color: "#FFF",
    textAlign: "center",
    width: "13%",
  },
});

export default CalendarScreen;
