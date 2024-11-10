import React from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import Header from "../components/Header"; // Import Header component
import CalendarRow from "../components/CalendarRow"; // Import CalendarRow component

const CalendarScreen = () => {
  const months = [
    { name: "September", days: 30, startDay: 0 }, // September starts on Sunday
    { name: "October", days: 31, startDay: 2 },  // October starts on Tuesday
    { name: "November", days: 30, startDay: 5 }, // November starts on Friday
    { name: "December", days: 31, startDay: 0 }, // December starts on Sunday
  ];

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Generate the grid of days for a month
  const generateGrid = (days, startDay) => {
    const totalSlots = Math.ceil((days + startDay) / 7) * 7; // Ensure full weeks
    const grid = [];

    for (let i = 0; i < totalSlots; i++) {
      if (i < startDay || i >= days + startDay) {
        grid.push(""); // Empty slots
      } else {
        grid.push(i - startDay + 1); // Actual days
      }
    }
    return grid;
  };

  // Helper function to chunk an array into rows of a specific size
  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Journal Entries</Text>
      <ScrollView>
        {months.map((month) => {
          const grid = generateGrid(month.days, month.startDay);
          const rows = chunkArray(grid, 7); // Split into weeks (7 days per row)

          return (
            <View key={month.name} style={styles.monthContainer}>
              <Text style={styles.monthTitle}>{month.name}, 2024</Text>
              <View style={styles.weekHeader}>
                {daysOfWeek.map((day, index) => (
                  <Text key={index} style={styles.weekDay}>
                    {day}
                  </Text>
                ))}
              </View>
              {rows.map((week, index) => (
                <CalendarRow key={index} days={week} />
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
    backgroundColor: "#000", // Black background
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: "#FFC0CB", // Pink color
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
    color: "#FFF", // White color
    textAlign: "left",
    marginBottom: 20,
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between", // Spread evenly
    marginBottom: 10,
  },
  weekDay: {
    fontSize: 14,
    color: "#FFF", // White text
    textAlign: "center",
    width: "13%", // Consistent width
  },
});

export default CalendarScreen;
