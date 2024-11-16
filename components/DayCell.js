import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const DayCell = ({ day, month, entryDates, onDayPress }) => {
  const today = new Date();
  const cellDate = new Date(
    `${month.year}-${String(month.index + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  );

  const isJournalDate = day
    ? entryDates.includes(`${month.year}-${String(month.index + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`)
    : false;

  const isFutureDate =
    day && cellDate > new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Handle empty day slots (like leading/trailing spaces in a month grid)
  if (day === "") {
    return <Text style={[styles.day, styles.emptyDay]} />;
  }

  const isDisabled = isFutureDate || isJournalDate;

  return (
    <TouchableOpacity
      onPress={() => {
        if (!isDisabled) {
          onDayPress(`${month.year}-${String(month.index + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`);
        }
      }} // Do nothing if disabled
      style={[styles.dayContainer, isDisabled && styles.disabledDayContainer]} // Style for disabled days
      disabled={isDisabled} // Disable interaction for future dates and highlighted dates
    >
      <Text
        style={[
          styles.day,
          isJournalDate && styles.journalDay, // Apply pink styling for journal entries
          isFutureDate && styles.disabledDay, // Apply disabled styling for future dates
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
  disabledDay: {
    color: "#555", // Gray color for future dates
  },
  disabledDayContainer: {
    opacity: 0.5, // Make the day less visible
  },
});

export default DayCell;
