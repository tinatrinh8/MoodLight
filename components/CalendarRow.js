import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { emotionColours } from "../utils/emotionColours";

const CalendarRow = ({ days, month, entryDates, onDayPress }) => {
  const today = new Date();

  return (
    <View style={styles.row}>
      {days.map((day, index) => {
        const cellDate = new Date(month.year, month.index, day.day || 0);
        const isFutureDate = day.day && cellDate > today;

        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayContainer,
              day.isJournalDate && styles.highlightedContainer, // Highlight if it's a journal date
              { backgroundColor: day.color }, // Apply emotion color as background color
            ]}
            onPress={() => {
              if (day.day && !isFutureDate) {
                const selectedDate = `${month.year}-${String(
                  month.index + 1
                ).padStart(2, "0")}-${String(day.day).padStart(2, "0")}`;
                onDayPress(selectedDate); // Pass the formatted date to the callback
              }
            }}
            disabled={!day.day || isFutureDate} // Disable clicks for empty days and future dates
          >
            <Text
              style={[
                styles.day,
                day.isJournalDate && styles.highlightedDay, // Apply black text style for highlighted days
                isFutureDate && styles.disabledDay, // Style for future dates
              ]}
            >
              {day.day || ""} {/* Display day number or empty */}
            </Text>
          </TouchableOpacity>
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
  disabledDay: {
    color: "#555", // Greyed-out text for future dates
  },
});

export default CalendarRow;
