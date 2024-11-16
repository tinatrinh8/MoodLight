import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const CalendarRow = ({ days, month, entryDates, onDayPress }) => {
  return (
    <View style={styles.row}>
      {days.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dayContainer,
            day.isJournalDate && styles.highlightedContainer, // Highlight if it's a journal date
          ]}
          onPress={() => {
            if (day.day) {
              const selectedDate = `${month.year}-${String(month.index + 1).padStart(2, "0")}-${String(day.day).padStart(2, "0")}`;
              onDayPress(selectedDate); // Pass the formatted date to the callback
            }
          }}
          disabled={!day.day} // Disable clicks for empty days
        >
          <Text
            style={[
              styles.day,
              day.isJournalDate && styles.highlightedDay, // Apply black text style for highlighted days
            ]}
          >
            {day.day || ""} {/* Display day number or empty */}
          </Text>
        </TouchableOpacity>
      ))}
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
    backgroundColor: "#DC869A", // Circle background color for highlighted dates
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
