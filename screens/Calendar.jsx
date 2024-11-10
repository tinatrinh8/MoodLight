import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Header from "../components/Header"; // Import your Header component

const CalendarScreen = () => {
  const months = [
    { name: "January", days: 31, startDay: 0 },
    { name: "February", days: 28, startDay: 3 },
    { name: "March", days: 31, startDay: 3 },
    { name: "April", days: 30, startDay: 6 },
  ];

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Journal Entries</Text>
      <FlatList
        data={months}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.monthContainer}>
            <Text style={styles.monthTitle}>{item.name}, 2023</Text>
            <View style={styles.weekHeader}>
              {daysOfWeek.map((day, index) => (
                <Text key={index} style={styles.weekDay}>
                  {day}
                </Text>
              ))}
            </View>
            <View style={styles.grid}>
              {generateGrid(item.days, item.startDay).map((day, index) => (
                <Text key={index} style={[styles.day, day === "" && styles.emptyDay]}>
                  {day}
                </Text>
              ))}
            </View>
          </View>
        )}
      />
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
    marginBottom: 20,
  },
  monthTitle: {
    fontSize: 18,
    color: "#FFF", // White color
    textAlign: "left",
    marginBottom: 10,
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 40, // Adjust spacing between rows
  },
  day: {
    fontSize: 16,
    color: "#FFF", // White text
    textAlign: "center",
    width: "13%", // Consistent width for 7 columns
    marginBottom: 40, // Space between rows
  },
  emptyDay: {
    color: "transparent", // Hides empty slots
  },
});

export default CalendarScreen;
