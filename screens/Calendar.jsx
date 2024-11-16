import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import CalendarRow from "../components/CalendarRow";
import { useEntryDates } from "../components/EntryDatesContext";
import { useNavigation } from "@react-navigation/native";

const CalendarScreen = () => {
  const { entryDates, journalEntries } = useEntryDates(); // Access global state
  const navigation = useNavigation(); // For navigating to the homepage

  const months = [
    { name: "September", days: 30, startDay: 0, year: 2024, index: 8 },
    { name: "October", days: 31, startDay: 2, year: 2024, index: 9 },
    { name: "November", days: 30, startDay: 5, year: 2024, index: 10 },
    { name: "December", days: 31, startDay: 0, year: 2024, index: 11 },
  ];

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const generateGrid = (month) => {
    const totalSlots = Math.ceil((month.days + month.startDay) / 7) * 7;
    const grid = [];

    // Extract all days from journalEntries that match this month and year
    const highlightedDays = journalEntries
      .filter((entry) => {
        const [year, monthIndex, day] = entry.journalDate.split("-").map(Number); // Split journalDate into parts
        return year === month.year && monthIndex - 1 === month.index; // Match year and month
      })
      .map((entry) => parseInt(entry.journalDate.split("-")[2], 10)); // Extract the day part as a number

    for (let i = 0; i < totalSlots; i++) {
      if (i < month.startDay || i >= month.days + month.startDay) {
        grid.push(""); // Empty slot
      } else {
        const day = i - month.startDay + 1;
        grid.push({ day, isJournalDate: highlightedDays.includes(day) });
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
      const today = new Date();
      const selectedDateObj = new Date(selectedDate);

      if (selectedDateObj > today) {
        alert("You cannot select a future date.");
        return; // Prevent navigation
      }

      navigation.navigate("Home", { selectedDate });
    };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Journal Entries</Text>
      <ScrollView>
        {months.map((month) => {
          const grid = generateGrid(month); // Pass the whole month object
          const rows = chunkArray(grid, 7);

          return (
            <View key={month.name} style={styles.monthContainer}>
              <Text style={styles.monthTitle}>{month.name}, {month.year}</Text>
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
