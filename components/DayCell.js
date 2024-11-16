import React from "react";
import { Text, StyleSheet } from "react-native";

const DayCell = ({ day, month, entryDates }) => {
  const isJournalDate = day
    ? entryDates.includes(`${month.year}-${month.index + 1}-${day}`)
    : false;

  return (
    <Text
      style={[
        styles.day,
        day === "" && styles.emptyDay,
        isJournalDate && styles.journalDay, // Apply pink styling
      ]}
    >
      {day}
    </Text>
  );
};

const styles = StyleSheet.create({
  day: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
    width: "13%",
    marginBottom: 10,
  },
  emptyDay: {
    color: "transparent",
  },
  journalDay: {
    color: "#FFC0CB", // Pink color for journal entry dates
    fontWeight: "bold",
  },
});