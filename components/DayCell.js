import React from "react";
import { Text, StyleSheet } from "react-native";

const DayCell = ({ day }) => {
  return <Text style={[styles.day, day === "" && styles.emptyDay]}>{day}</Text>;
};

const styles = StyleSheet.create({
  day: {
    fontSize: 16,
    color: "#FFF", // White text
    textAlign: "center",
    width: "13%", // Ensures consistent width for 7 columns
    marginBottom: 10, // Adds space between rows
  },
  emptyDay: {
    color: "transparent", // Hides empty slots
  },
});

export default DayCell;