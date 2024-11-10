import React from "react";
import { View, StyleSheet } from "react-native";
import DayCell from "./DayCell"; // Import DayCell component

const CalendarRow = ({ days }) => {
  return (
    <View style={styles.row}>
      {days.map((day, index) => (
        <DayCell key={index} day={day} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row", // Align items in a row
    justifyContent: "space-between", // Distribute cells evenly
    marginBottom: 20, // Space between rows
  },
});

export default CalendarRow;
