import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Header from "../components/Header";
import { useEntryDates } from "../components/EntryDatesContext";
import {
  getTopEmotions,
  getStartOfWeek,
  getEndOfWeek,
  generateWeekDays,
  groupDataByDay,
  getStartOfYear,
  getEndOfYear,
  generateMonthLabels,
  groupDataByMonth,
} from "../utils/emotionUtils";
import { emotionColors } from "../utils/emotionColours";
import styles from "../styles/InsightsStyles";
import { addDays } from "date-fns";

const InsightsScreen = () => {
  const { journalEntries } = useEntryDates(); // Get journal entries from context
  const [timePeriod, setTimePeriod] = useState("Weekly"); // Default filter
  const [chartData, setChartData] = useState(null);

  // State for Weekly View
  const [currentWeekStart, setCurrentWeekStart] = useState(
    getStartOfWeek(new Date())
  );
  const [currentWeekEnd, setCurrentWeekEnd] = useState(getEndOfWeek(new Date()));

  // State for Monthly View
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [topEmotions, setTopEmotions] = useState([]); // Top emotions for the legend

  const today = new Date(); // Today's date
  const currentYearNumber = today.getFullYear(); // Current year

  // Handle navigation to the next week
  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => addDays(prev, 7));
    setCurrentWeekEnd((prev) => addDays(prev, 7));
  };

  // Handle navigation to the previous week
  const handlePreviousWeek = () => {
    setCurrentWeekStart((prev) => addDays(prev, -7));
    setCurrentWeekEnd((prev) => addDays(prev, -7));
  };

  // Handle navigation to the next year
  const handleNextYear = () => setCurrentYear((prev) => prev + 1);

  // Handle navigation to the previous year
  const handlePreviousYear = () => setCurrentYear((prev) => prev - 1);

  // Check if viewing the current week
  const isCurrentWeek = currentWeekStart <= today && currentWeekEnd >= today;

  // Format data for the weekly line chart
  const formatChartDataForWeek = (entries, emotions) => {
    const weeklyData = groupDataByDay(
      entries,
      currentWeekStart,
      currentWeekEnd,
      emotions
    );
    const labels = generateWeekDays(currentWeekStart); // X-axis labels (weekdays)
    const datasets = emotions.map((emotion) => ({
      data: weeklyData.map((day) => day[emotion] || 0), // Y-axis values for each day
      color: () => emotionColors[emotion] || "#808080", // Use emotion color or fallback to gray
      strokeWidth: 2, // Line thickness
    }));

    const maxCount = Math.max(...datasets.flatMap((dataset) => dataset.data));

    return { labels, datasets, maxCount };
  };

  // Format data for the yearly line chart
  const formatChartDataForYear = (entries, emotions) => {
    const startOfYear = getStartOfYear(new Date(currentYear, 0, 1));
    const endOfYear = getEndOfYear(new Date(currentYear, 11, 31));

    // Group data by month and emotion
    const monthlyData = groupDataByMonth(entries, startOfYear, endOfYear, emotions);

    const labels = generateMonthLabels();

    const datasets = emotions.map((emotion) => ({
      data: monthlyData.map((month) => month[emotion] || 0),
      color: () => emotionColors[emotion] || "#808080",
      strokeWidth: 2,
    }));

    const maxCount = Math.max(...datasets.flatMap((dataset) => dataset.data));

    return { labels, datasets, maxCount };
  };

  // Update chart data whenever journalEntries, timePeriod, or navigation state changes
  useEffect(() => {
    if (journalEntries?.length) {
      if (timePeriod === "Weekly") {
        const filteredEntries = journalEntries.filter((entry) => {
          const entryDate = new Date(entry.journalDate);
          return entryDate >= currentWeekStart && entryDate <= currentWeekEnd;
        });

        const topEmotionsList = getTopEmotions(filteredEntries, 5);
        setTopEmotions(topEmotionsList);

        if (topEmotionsList.length > 0) {
          const chartData = formatChartDataForWeek(filteredEntries, topEmotionsList);
          setChartData(chartData);
        } else {
          setChartData(null);
        }
      } else if (timePeriod === "Monthly") {
        const startOfYear = getStartOfYear(new Date(currentYear, 0, 1));
        const endOfYear = getEndOfYear(new Date(currentYear, 11, 31));

        const filteredEntries = journalEntries.filter((entry) => {
          const entryDate = new Date(entry.journalDate);
          return entryDate >= startOfYear && entryDate <= endOfYear;
        });

        const topEmotionsList = getTopEmotions(filteredEntries, 5);
        setTopEmotions(topEmotionsList);

        if (topEmotionsList.length > 0) {
          const chartData = formatChartDataForYear(filteredEntries, topEmotionsList);
          setChartData(chartData);
        } else {
          setChartData(null);
        }
      }
    } else {
      setChartData(null);
    }
  }, [journalEntries, timePeriod, currentWeekStart, currentWeekEnd, currentYear]);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.insightsTitle}>Insights</Text>

      {/* Time Period Filter */}
      <View style={styles.filterContainer}>
        {["Weekly", "Monthly"].map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.filterButton,
              timePeriod === period && styles.activeFilterButton,
            ]}
            onPress={() => setTimePeriod(period)}
          >
            <Text style={styles.filterButtonText}>{period}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Weekly Navigation */}
      {timePeriod === "Weekly" && (
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={handlePreviousWeek}
          >
            <Text style={styles.filterButtonText}>&larr; Previous Week</Text>
          </TouchableOpacity>
          {!isCurrentWeek && (
            <TouchableOpacity
              style={styles.filterButton}
              onPress={handleNextWeek}
            >
              <Text style={styles.filterButtonText}>Next Week &rarr;</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Monthly Navigation */}
      {timePeriod === "Monthly" && (
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={handlePreviousYear}
          >
            <Text style={styles.filterButtonText}>Previous Year</Text>
          </TouchableOpacity>
          {currentYear < currentYearNumber && ( // Only show "Next Year" if not viewing the current year
            <TouchableOpacity
              style={styles.filterButton}
              onPress={handleNextYear}
            >
              <Text style={styles.filterButtonText}>Next Year</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Line Chart */}
      <View style={styles.chartContainer}>
        {chartData ? (
          (() => {
            const maxYValue = Math.max(chartData.maxCount || 0, 1); // Ensure at least 1
            const segments = Math.min(5, Math.ceil(maxYValue)); // Max 5 segments, rounded up

            return (
              <LineChart
                data={{
                  labels: chartData.labels,
                  datasets: chartData.datasets,
                }}
                width={Dimensions.get("window").width - 32} // Adjust for padding
                height={220}
                chartConfig={{
                  backgroundColor: "#260101",
                  backgroundGradientFrom: "#9E4F61",
                  backgroundGradientTo: "#260101",
                  decimalPlaces: 0, // No decimal points
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: { borderRadius: 16 },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#9E4F61",
                    fill: "#FFFFFF",
                  },
                }}
                bezier
                fromZero={true} // Ensure Y-axis starts at 0
                segments={segments} // Dynamically set segments
                style={styles.chart}
              />
            );
          })()
        ) : (
          <Text style={styles.noDataText}>
            No data available for this period.
          </Text>
        )}
      </View>

      {/* Legend */}
      <View style={legendStyles.legendContainer}>
        {topEmotions.map((emotion) => (
          <View key={emotion} style={legendStyles.legendItem}>
            <View
              style={[
                legendStyles.colorBox,
                { backgroundColor: emotionColors[emotion] || "#808080" },
              ]}
            />
            <Text style={legendStyles.legendText}>{emotion}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const legendStyles = StyleSheet.create({
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: "#260101",
  },
});

export default InsightsScreen;
