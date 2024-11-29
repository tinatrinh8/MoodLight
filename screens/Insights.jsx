import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import Header from "../components/Header";
import { useEntryDates } from "../components/EntryDatesContext";
import {
  getTopEmotions,
  getEmotionCounts,
  getStartOfWeek,
  getEndOfWeek,
  generateWeekDays,
  groupDataByDay,
  getStartOfYear,
  getEndOfYear,
  generateMonthLabels,
  groupDataByMonth,
} from "../utils/emotionUtils";
import { emotionColours } from "../utils/emotionColours";
import styles from "../styles/InsightsStyles";
import analysisStyles from "../styles/AnalysisStyles";
import { addDays } from "date-fns";

const InsightsScreen = () => {
  const { journalEntries = [] } = useEntryDates() || {};
  const [timePeriod, setTimePeriod] = useState("Weekly");
  const [chartData, setChartData] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    getStartOfWeek(new Date())
  );
  const [currentWeekEnd, setCurrentWeekEnd] = useState(
    getEndOfWeek(new Date())
  );
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [emotionCounts, setEmotionCounts] = useState([]);
  const [topEmotions, setTopEmotions] = useState([]);

  const today = new Date();

  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => addDays(prev, 7));
    setCurrentWeekEnd((prev) => addDays(prev, 7));
  };

  const handlePreviousWeek = () => {
    setCurrentWeekStart((prev) => addDays(prev, -7));
    setCurrentWeekEnd((prev) => addDays(prev, -7));
  };

  const handleNextYear = () => setCurrentYear((prev) => prev + 1);
  const handlePreviousYear = () => setCurrentYear((prev) => prev - 1);

  const isCurrentWeek = currentWeekStart <= today && currentWeekEnd >= today;

  const formatChartDataForWeek = (entries, emotions) => {
    const weeklyData = groupDataByDay(
      entries,
      currentWeekStart,
      currentWeekEnd,
      emotions
    );
    const labels = generateWeekDays(currentWeekStart);
    const datasets = emotions.map((emotion) => ({
      data: weeklyData.map((day) => day[emotion] || 0),
      color: () => emotionColours[emotion] || "#808080",
      strokeWidth: 2,
    }));

    // **Force maxCount for weekly view to be 1**
    const maxCount =
      timePeriod === "Weekly"
        ? 1
        : Math.max(...datasets.flatMap((dataset) => dataset.data), 1);

    console.log(
      "Weekly Data Points:",
      datasets.flatMap((dataset) => dataset.data)
    ); // Debugging
    console.log("Hardcoded Max Count for Weekly:", maxCount); // Debugging

    return { labels, datasets, maxCount };
  };

  const formatChartDataForYear = (entries, emotions) => {
    const startOfYear = getStartOfYear(new Date(currentYear, 0, 1));
    const endOfYear = getEndOfYear(new Date(currentYear, 11, 31));
    const monthlyData = groupDataByMonth(
      entries,
      startOfYear,
      endOfYear,
      emotions
    );
    const labels = generateMonthLabels();
    const datasets = emotions.map((emotion) => ({
      data: monthlyData.map((month) => month[emotion] || 0),
      color: () => emotionColours[emotion] || "#808080",
      strokeWidth: 2,
    }));

    // Dynamically adjust Y-axis for monthly data
    const maxCount = Math.max(
      1,
      ...datasets.flatMap((dataset) => dataset.data)
    );

    return { labels, datasets, maxCount };
  };

  useEffect(() => {
    let filteredEntries, newChartData, initialCounts, topEmotionsList;

    if (timePeriod === "Weekly") {
      filteredEntries = journalEntries.filter((entry) => {
        const entryDate = new Date(entry.journalDate);
        return entryDate >= currentWeekStart && entryDate <= currentWeekEnd;
      });

      topEmotionsList = getTopEmotions(filteredEntries, 5);
      initialCounts = getEmotionCounts(filteredEntries);
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
      initialCounts = getEmotionCounts(filteredEntries);
      topEmotionsList = getTopEmotions(filteredEntries, 5);
      newChartData =
        topEmotionsList.length > 0
          ? formatChartDataForYear(filteredEntries, topEmotionsList)
          : null;
    }

    setEmotionCounts(
      Object.keys(initialCounts).map((emotionName) => {
        return {
          name: emotionName,
          count: initialCounts[emotionName],
          color: emotionColours[emotionName],
        };
      }) || []
    );
    setTopEmotions(topEmotionsList || []);
    setChartData(newChartData);
  }, [
    journalEntries,
    timePeriod,
    currentWeekStart,
    currentWeekEnd,
    currentYear,
  ]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            {currentYear < today.getFullYear() && (
              <TouchableOpacity
                style={styles.filterButton}
                onPress={handleNextYear}
              >
                <Text style={styles.filterButtonText}>Next Year</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Filter Label */}
        <View style={styles.filterContainer}>
          {timePeriod === "Monthly" && (
            <Text style={styles.periodText}>Showing year of {currentYear}</Text>
          )}
          {timePeriod === "Weekly" && (
            <Text style={styles.periodText}>
              Showing week of {currentWeekStart.toDateString()} to{" "}
              {currentWeekEnd.toDateString()}
            </Text>
          )}
        </View>

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
              segments={timePeriod === "Weekly" ? 1 : chartData.maxCount} // Weekly fixed to 1, others dynamic
              style={styles.chart}
            />
          ) : (
            <Text style={styles.noDataText}>
              No data available for this period.
            </Text>
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

        {/* Pie Chart */}
        <View style={styles.chartContainer}>
          {emotionCounts.length > 0 ? (
            <PieChart
              data={emotionCounts}
              accessor={"count"}
              width={Dimensions.get("window").width - 20} // from react-native
              height={250}
              absolute={false}
              chartConfig={{
                color: (opacity = 1) => `white`,
                labelColor: (opacity = 1) => `white`,
                style: {
                  borderRadius: 16,
                },
              }}
              backgroundColor="#E6C3CB"
              paddingLeft="15"
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          ) : (
            <Text style={styles.noDataText}>
              No data available for this period.
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default InsightsScreen;
