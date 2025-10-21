import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import CalendarRow from "../components/CalendarRow";
import { useEntryDates } from "../components/EntryDatesContext";
import { useNavigation } from "@react-navigation/native";
import { emotionColours } from "../utils/emotionColours";

const CalendarScreen = () => {
  const scrollViewRef = useRef(null); // Reference to the ScrollView
  const { entryDates, journalEntries } = useEntryDates(); // Access global state
  const navigation = useNavigation(); // For navigating to the homepage

  const months = [
    // 2024 was a leap year (February has 29 days)
    { name: "January", days: 31, startDay: 1, year: 2024, index: 0 }, // Jan 1 is a Monday (1)
    { name: "February", days: 29, startDay: 4, year: 2024, index: 1 }, // Feb 1 is a Thursday (4)
    { name: "March", days: 31, startDay: 5, year: 2024, index: 2 }, // Mar 1 is a Friday (5)
    { name: "April", days: 30, startDay: 1, year: 2024, index: 3 }, // Apr 1 is a Monday (1)
    { name: "May", days: 31, startDay: 3, year: 2024, index: 4 }, // May 1 is a Wednesday (3)
    { name: "June", days: 30, startDay: 6, year: 2024, index: 5 }, // Jun 1 is a Saturday (6)
    { name: "July", days: 31, startDay: 1, year: 2024, index: 6 }, // Jul 1 is a Monday (1)
    { name: "August", days: 31, startDay: 4, year: 2024, index: 7 }, // Aug 1 is a Thursday (4)
    { name: "September", days: 30, startDay: 0, year: 2024, index: 8 }, // Sep 1 is a Sunday (0)
    { name: "October", days: 31, startDay: 2, year: 2024, index: 9 }, // Oct 1 is a Tuesday (2)
    { name: "November", days: 30, startDay: 5, year: 2024, index: 10 }, // Nov 1 is a Friday (5)
    { name: "December", days: 31, startDay: 0, year: 2024, index: 11 }, // Dec 1 is a Sunday (0)

    // 2025
    { name: "January", days: 31, startDay: 3, year: 2025, index: 12 }, // Jan 1 is a Wednesday (3)
    { name: "February", days: 28, startDay: 6, year: 2025, index: 13 }, // Feb 1 is a Saturday (6)
    { name: "March", days: 31, startDay: 6, year: 2025, index: 14 }, // Mar 1 is a Saturday (6)
    { name: "April", days: 30, startDay: 2, year: 2025, index: 15 }, // Apr 1 is a Tuesday (2)
    { name: "May", days: 31, startDay: 4, year: 2025, index: 16 }, // May 1 is a Thursday (4)
    { name: "June", days: 30, startDay: 0, year: 2025, index: 17 }, // Jun 1 is a Sunday (0)
    { name: "July", days: 31, startDay: 2, year: 2025, index: 18 }, // Jul 1 is a Tuesday (2)
    { name: "August", days: 31, startDay: 5, year: 2025, index: 19 }, // Aug 1 is a Friday (5)
    { name: "September", days: 30, startDay: 1, year: 2025, index: 20 }, // Sep 1 is a Monday (1)
    { name: "October", days: 31, startDay: 3, year: 2025, index: 21 }, // Oct 1 is a Wednesday (3)
    { name: "November", days: 30, startDay: 6, year: 2025, index: 22 }, // Nov 1 is a Saturday (6)
    { name: "December", days: 31, startDay: 1, year: 2025, index: 23 }, // Dec 1 is a Monday (1)
  ];

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Scroll to current month when the page is opened
  useEffect(() => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        // Scroll to the end (most recent year/month)
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  }, []);

  // Define getEmotionColor function
  const getEmotionColor = (emotion) => {
    const normalizedEmotion = emotion.trim().toLowerCase();

    // Check if the emotion exists in the emotionColours object
    if (!emotionColours.hasOwnProperty(normalizedEmotion)) {
      console.warn(`Emotion not found in emotionColours: ${normalizedEmotion}`);
      return "#AAAAAA"; // Default gray for unknown emotions
    }

    return emotionColours[normalizedEmotion]; // Return the corresponding color
  };

  const generateGrid = (month) => {
    const totalSlots = Math.ceil((month.days + month.startDay) / 7) * 7;
    const grid = [];

    const highlightedDays = journalEntries
      .filter((entry) => {
        const [year, monthIndex, day] = entry.journalDate
          .split("-")
          .map(Number);
        return year === month.year && monthIndex - 1 === month.index;
      })
      .map((entry) => {
        const day = parseInt(entry.journalDate.split("-")[2], 10);
        const emotion =
          entry.topEmotions && entry.topEmotions.length > 0
            ? entry.topEmotions[0]
            : "neutral"; // Default to "neutral" if no emotion
        const color = getEmotionColor(emotion); // Get color based on the emotion
        return { day, color };
      });

    for (let i = 0; i < totalSlots; i++) {
      if (i < month.startDay || i >= month.days + month.startDay) {
        grid.push(""); // Empty slot
      } else {
        const day = i - month.startDay + 1;
        const highlightedDay = highlightedDays.find((d) => d.day === day);
        grid.push({
          day,
          isJournalDate: !!highlightedDay,
          color: highlightedDay ? highlightedDay.color : null, // Set color only for journal dates
        });
      }
    }
    return grid;
  };

  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const handleDayPress = (selectedDate) => {
    if (!selectedDate) {
      console.log("Empty slot clicked");
      return; // Ignore empty slots
    }

    console.log("Selected Date:", selectedDate);

    const journalEntry = journalEntries.find(
      (entry) => entry.journalDate === selectedDate
    );

    if (journalEntry) {
      console.log("Navigating to existing journal entry:", journalEntry);
      navigation.navigate("Home", { viewJournalEntry: journalEntry });
    } else {
      console.log("Creating new journal entry for date:", selectedDate);
      navigation.navigate("Home", { selectedDate });
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Journal Entries</Text>
      <ScrollView ref={scrollViewRef}>
        {months.map((month) => {
          const grid = generateGrid(month);
          const rows = chunkArray(grid, 7);

          return (
            <View key={month.name + month.year} style={styles.monthContainer}>
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
                  entryDates={entryDates}
                  onDayPress={handleDayPress}
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
    paddingBottom: 50,
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
