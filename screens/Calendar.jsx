import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MonthCalendar from '../components/MonthCalendar'; // Updated import

const CalendarScreen = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June'];
  const year = 2023;

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Journal Entries</Text>
        {months.map((month, index) => (
          <MonthCalendar key={index} month={month} year={year} />
        ))}
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    paddingLeft: 14,
    paddingRight: 14,
  },

  content: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'LexendDeca',
    fontSize: 26,
    color: 'rgba(220, 134, 154, 1)',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default CalendarScreen;
