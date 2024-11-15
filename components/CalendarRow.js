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
          <Text
            key={index}
            style={[
              styles.day,
              isHighlighted && styles.highlightedDay, // Apply pink style
            ]}
          >
            {day || ""}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between", // Maintain spacing
    marginBottom: 25,
  },
  day: {
    fontSize: 16,
    color: "#FFF", // Default white color
    textAlign: "center",
    width: "13%", // Keep consistent width for alignment
    marginTop: 10,
    marginBottom: 5,
  },
   highlightedDay: {
      backgroundColor: "#DC869A", // Circle background color
      color: "#000", // Black font color
      fontWeight: "bold", // Bold font
      borderRadius: 50, // Ensures a circular shape
      width: 30, // Fixed width for the circle
      height: 30, // Fixed height for the circle
      textAlign: "center", // Center the text horizontally
      lineHeight: 30, // Center the text vertically
      alignSelf: "center", // Center the circle within its container
   },
});

export default CalendarRow;
