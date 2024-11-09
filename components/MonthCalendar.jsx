import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DayOfWeek from './DayOfWeek';
import Day from './Day';

const MonthCalendar = ({ month, year }) => {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1); // Simulates 31 days for now

  return (
    <View style={styles.container}>
      <Text style={styles.monthYear}>{`${month}, ${year}`}</Text>
      <View style={styles.daysOfWeek}>
        {daysOfWeek.map((day, index) => (
          <DayOfWeek key={index} day={day} />
        ))}
      </View>
      <View style={styles.days}>
        {days.map((day) => (
          <Day key={day} day={day} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  monthYear: {
    fontFamily: 'LexendDeca',
    fontSize: 14,
    color: '#FFF',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  daysOfWeek: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  days: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default MonthCalendar;
