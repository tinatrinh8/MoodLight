import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import CalendarRow from "../components/CalendarRow";
import { useEntryDates } from "../components/EntryDatesContext";

const CalendarScreen = () => {
  const { entryDates } = useEntryDates(); // Access global entryDates

  const months = [
    { name: "September", days: 30, startDay: 0 },
    { name: "October", days: 31, startDay: 2 },
    { name: "November", days: 30, startDay: 5 },
    { name: "December", days: 31, startDay: 0 },
  ];

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const generateGrid = (days, startDay) => {
    const totalSlots = Math.ceil((days + startDay) / 7) * 7;
    const grid = [];

    for (let i = 0; i < totalSlots; i++) {
      if (i < startDay || i >= days + startDay) {
        grid.push("");
      } else {
        grid.push(i - startDay + 1);
      }
    }
    return grid;
  };

  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Journal Entries</Text>
      <ScrollView>
        {months.map((month) => {
          const grid = generateGrid(month.days, month.startDay);
          const rows = chunkArray(grid, 7);

          return (
            <View key={month.name} style={styles.monthContainer}>
              <Text style={styles.monthTitle}>{month.name}, 2024</Text>
              <View style={styles.weekHeader}>
                {daysOfWeek.map((day, index) => (
                  <Text key={index} style={styles.weekDay}>
                    {day}
                  </Text>
                ))}
              </View>
              {rows.map((week, index) => (
                <CalendarRow
                  key={index}
                  days={week}
                  entryDates={entryDates}
                  month={month}
                />
              ))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: "#FFC0CB",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 30,
    fontFamily: "LexendDeca",
  },
  monthContainer: {
    marginBottom: 35,
  },
  monthTitle: {
    fontSize: 18,
    color: "#FFF",
    textAlign: "left",
    marginBottom: 20,
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  weekDay: {
    fontSize: 14,
    color: "#FFF",
    textAlign: "center",
    width: "13%",
  },
});

export default CalendarScreen;
