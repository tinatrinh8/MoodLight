import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const DayCell = ({ day, month, entryDates, onDayPress }) => {
  const isJournalDate = day
    ? entryDates.includes(`${month.year}-${month.index + 1}-${day}`)
    : false;

  // Handle empty day slots (like leading/trailing spaces in a month grid)
  if (day === "") {
    return <Text style={[styles.day, styles.emptyDay]} />;
  }

  return (
    <TouchableOpacity
      onPress={() => onDayPress(`${month.year}-${month.index + 1}-${day}`)}
      style={styles.dayContainer}
    >
      <Text
        style={[
          styles.day,
          isJournalDate && styles.journalDay, // Apply pink styling
        ]}
      >
        {day}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    width: "13%", // Consistent sizing for calendar cells
    alignItems: "center",
    marginBottom: 10,
  },
  day: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
  },
  emptyDay: {
    color: "transparent",
  },
  journalDay: {
    color: "#FFC0CB", // Pink color for journal entry dates
    fontWeight: "bold",
  },
});

export default DayCell;
