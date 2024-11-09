import React from "react";
import { View, StyleSheet } from "react-native";
import DayCell from "./DayCell";

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
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default CalendarRow;
