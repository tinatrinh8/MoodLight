import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Day = ({ day }) => (
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
    fontSize: 14,
    color: '#FFF',
    fontWeight: '400',
  },
});

export default Day;
