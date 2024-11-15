import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CalendarRow = ({ days, entryDates, month }) => {
  const monthIndex = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].indexOf(month.name);

  return (
    <View style={styles.row}>
      {days.map((day, index) => {
        const isHighlighted =
          day &&
          entryDates.includes(
            `2024-${String(monthIndex + 1).padStart(2, "0")}-${String(
              day
            ).padStart(2, "0")}`
          );

        return (
          <View
            key={index}
            style={[styles.dayContainer, isHighlighted && styles.highlightedContainer]}
          >
            <Text
              style={[
                styles.day,
                isHighlighted && styles.highlightedDay, // Apply black text style
              ]}
            >
              {day || ""}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dayContainer: {
    width: 40, // Fixed width for consistency
    height: 40, // Fixed height for consistency
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  highlightedContainer: {
    backgroundColor: "#DC869A", // Circle background color
    borderRadius: 20, // Ensures circular shape
  },
  day: {
    fontSize: 16,
    color: "#FFF", // Default white text color
    textAlign: "center",
  },
  highlightedDay: {
    color: "#000", // Black font for highlighted days
    fontWeight: "bold",
  },
});

export default CalendarRow;
