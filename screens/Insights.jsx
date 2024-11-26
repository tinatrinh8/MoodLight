import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
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
import { emotionColours } from "../utils/emotionColours"; // Updated import to match changes
import styles from "../styles/InsightsStyles"; // Main styles for the Insights page
import analysisStyles from "../styles/AnalysisStyles"; // Legend styles
import { addDays } from "date-fns";

const InsightsScreen = () => {
  const { journalEntries = [] } = useEntryDates() || {}; // Ensure fallback to empty object
  const [timePeriod, setTimePeriod] = useState("Weekly"); // Default filter
  const [chartData, setChartData] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));
  const [currentWeekEnd, setCurrentWeekEnd] = useState(getEndOfWeek(new Date()));
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [topEmotions, setTopEmotions] = useState([]);

  const today = new Date();

  // Weekly navigation handlers
  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => addDays(prev, 7));
    setCurrentWeekEnd((prev) => addDays(prev, 7));
  };

  const handlePreviousWeek = () => {
    setCurrentWeekStart((prev) => addDays(prev, -7));
    setCurrentWeekEnd((prev) => addDays(prev, -7));
  };

  // Yearly navigation handlers
  const handleNextYear = () => setCurrentYear((prev) => prev + 1);
  const handlePreviousYear = () => setCurrentYear((prev) => prev - 1);

  const isCurrentWeek = currentWeekStart <= today && currentWeekEnd >= today;

  // Format chart data for weekly view
  const formatChartDataForWeek = (entries, emotions) => {
    const weeklyData = groupDataByDay(entries, currentWeekStart, currentWeekEnd, emotions);
    const labels = generateWeekDays(currentWeekStart);
    const datasets = emotions.map((emotion) => ({
      data: weeklyData.map((day) => day[emotion] || 0),
      color: () => emotionColours[emotion] || "#808080", // Use updated emotionColours
      strokeWidth: 2,
    }));

    const maxCount = Math.max(...datasets.flatMap((dataset) => dataset.data));
    return { labels, datasets, maxCount };
  };

  // Format chart data for yearly view
  const formatChartDataForYear = (entries, emotions) => {
    const startOfYear = getStartOfYear(new Date(currentYear, 0, 1));
    const endOfYear = getEndOfYear(new Date(currentYear, 11, 31));
    const monthlyData = groupDataByMonth(entries, startOfYear, endOfYear, emotions);
    const labels = generateMonthLabels();
    const datasets = emotions.map((emotion) => ({
      data: monthlyData.map((month) => month[emotion] || 0),
      color: () => emotionColours[emotion] || "#808080",
      strokeWidth: 2,
    }));

    const maxCount = Math.max(...datasets.flatMap((dataset) => dataset.data));
    return { labels, datasets, maxCount };
  };

  // Update chart data based on time period and navigation
  useEffect(() => {
    if (journalEntries?.length) {
      let filteredEntries, newChartData, topEmotionsList;

      if (timePeriod === "Weekly") {
        filteredEntries = journalEntries.filter((entry) => {
          const entryDate = new Date(entry.journalDate);
          return entryDate >= currentWeekStart && entryDate <= currentWeekEnd;
        });
        topEmotionsList = getTopEmotions(filteredEntries, 5);
        newChartData =
          topEmotionsList.length > 0
            ? formatChartDataForWeek(filteredEntries, topEmotionsList)
            : null;
      } else if (timePeriod === "Monthly") {
        const startOfYear = getStartOfYear(new Date(currentYear, 0, 1));
        const endOfYear = getEndOfYear(new Date(currentYear, 11, 31));
        filteredEntries = journalEntries.filter((entry) => {
          const entryDate = new Date(entry.journalDate);
          return entryDate >= startOfYear && entryDate <= endOfYear;
        });
        topEmotionsList = getTopEmotions(filteredEntries, 5);
        newChartData =
          topEmotionsList.length > 0
            ? formatChartDataForYear(filteredEntries, topEmotionsList)
            : null;
      }

      setTopEmotions(topEmotionsList || []);
      setChartData(newChartData);
    } else {
      setChartData(null);
      setTopEmotions([]);
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
          <TouchableOpacity style={styles.filterButton} onPress={handlePreviousWeek}>
            <Text style={styles.filterButtonText}>&larr; Previous Week</Text>
          </TouchableOpacity>
          {!isCurrentWeek && (
            <TouchableOpacity style={styles.filterButton} onPress={handleNextWeek}>
              <Text style={styles.filterButtonText}>Next Week &rarr;</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Monthly Navigation */}
      {timePeriod === "Monthly" && (
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton} onPress={handlePreviousYear}>
            <Text style={styles.filterButtonText}>Previous Year</Text>
          </TouchableOpacity>
          {currentYear < today.getFullYear() && (
            <TouchableOpacity style={styles.filterButton} onPress={handleNextYear}>
              <Text style={styles.filterButtonText}>Next Year</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Line Chart */}
      <View style={styles.chartContainer}>
        {chartData ? (
          <LineChart
            data={{
              labels: chartData.labels || [],
              datasets: chartData.datasets || [],
            }}
            width={Dimensions.get("window").width - 32}
            height={220}
            chartConfig={{
              backgroundColor: "#260101",
              backgroundGradientFrom: "#9E4F61",
              backgroundGradientTo: "#260101",
              decimalPlaces: 0,
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
            fromZero
            style={styles.chart}
          />
        ) : (
          <Text style={styles.noDataText}>No data available for this period.</Text>
        )}
      </View>

      {/* Legend */}
      <View style={analysisStyles.legendContainer}>
        {topEmotions.map((emotion) => (
          <View key={emotion} style={analysisStyles.legendItem}>
            <View
              style={[
                analysisStyles.colorBox,
                { backgroundColor: emotionColours[emotion] || "#808080" },
              ]}
            />
            <Text style={analysisStyles.legendText}>{emotion}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default InsightsScreen;
