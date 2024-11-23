import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { useEntryDates } from '../components/EntryDatesContext'; // Access global state
import { calculateStreaks } from '../utils/streaks'; // Utility to calculate streaks

const InsightsScreen = () => {
  const { journalEntries } = useEntryDates(); // Get journal entries from context
  const [stats, setStats] = useState({
    longestStreak: 0,
    currentStreak: 0,
    journalDays: 0,
  });

  const emotions = ['Worry', 'Joy', 'Happiness'];

  // Calculate streaks whenever journal entries are updated
  useEffect(() => {
    if (journalEntries?.length) {
      const streakStats = calculateStreaks(journalEntries);
      setStats({
        ...streakStats,
        journalDays: streakStats.journalDays,
      });
    }
  }, [journalEntries]);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.insightsTitle}>Insights</Text>
      <View style={styles.statsContainer}>
        {/* Streaks */}
        <View style={styles.statItem}>
          <View style={styles.iconValueContainer}>
            <Image
              source={require('../assets/lightning-bolt-icon.png')}
              style={styles.statIcon}
              resizeMode="contain"
            />
            <Text style={styles.statValue}>{stats.longestStreak}</Text>
          </View>
          <Text style={styles.statTitle}>Longest Streak</Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.iconValueContainer}>
            <Image
              source={require('../assets/fire-icon.png')}
              style={styles.statIcon}
              resizeMode="contain"
            />
            <Text style={styles.statValue}>{stats.currentStreak}</Text>
          </View>
          <Text style={styles.statTitle}>Current Streak</Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.iconValueContainer}>
            <Image
              source={require('../assets/calendar-icon.png')}
              style={styles.statIcon}
              resizeMode="contain"
            />
            <Text style={styles.statValue}>{stats.journalDays}</Text>
          </View>
          <Text style={styles.statTitle}>Journal Days</Text>
        </View>
      </View>
      {/* Mood Chart Section */}
      <View style={styles.moodChart}>
        <Text style={styles.title}>Mood Chart</Text>
        <View style={styles.filterContainer}>
          {['Weekly', 'Monthly', 'Yearly'].map((period, index) => (
            <TouchableOpacity key={index} style={styles.filterButton}>
              <Text style={styles.filterButtonText}>{period}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.dateDisplay}>
          <TouchableOpacity style={styles.arrowButton}>
            <Text style={styles.arrowText}>&lt;</Text>
          </TouchableOpacity>
          <Text style={styles.dateText}>Sept 2 - Sept 7, 2024</Text>
          <TouchableOpacity style={styles.arrowButton}>
            <Text style={styles.arrowText}>&gt;</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartText}>[Chart Placeholder]</Text>
        </View>
        <View style={styles.emotionFilterContainer}>
          {emotions.map((emotion, index) => (
            <TouchableOpacity key={index} style={styles.emotionButton}>
              <Text style={styles.emotionButtonText}>{emotion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6C3CB', // Light pink background
    padding: 16,
  },
  insightsTitle: {
    fontSize: 32,
    color: '#260101',
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'LexendDeca',
    marginVertical: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  statItem: {
    backgroundColor: '#9E4F61', // Dark pink background
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  statIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  statValue: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  statTitle: {
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
  },
  moodChart: {
    backgroundColor: '#260101', // Dark red background for the chart
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#FFF',
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#DC869A',
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 5,
  },
  filterButtonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
  },
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  arrowButton: {
    paddingHorizontal: 10,
  },
  arrowText: {
    color: '#FFF',
    fontSize: 18,
  },
  dateText: {
    color: '#FFF',
    fontSize: 14,
  },
  chartPlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#9E4F61',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  chartText: {
    color: '#FFF',
    fontSize: 16,
  },
  emotionFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  emotionButton: {
    flex: 1,
    backgroundColor: '#DC869A',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  emotionButtonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default InsightsScreen;
