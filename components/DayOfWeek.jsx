import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DayOfWeek = ({ day }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{day}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'LexendDeca',
    fontSize: 12,
    color: '#FFF',
    fontWeight: '700',
  },
});

export default DayOfWeek;
