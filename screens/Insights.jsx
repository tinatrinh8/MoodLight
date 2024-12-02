import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Svg, { Polyline, Circle, Text as SvgText, Line, Rect, Defs, LinearGradient, Stop } from "react-native-svg";

import { PieChart } from "react-native-chart-kit";
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

const LineChart = ({ labels, datasets, isWeekly }) => {
  const chartWidth = Dimensions.get("window").width - 32;
  const chartHeight = 250;
  const padding = 20;

  // Determine the max value for scaling
  const maxValue = isWeekly ? 1 : Math.max(...datasets.flatMap((dataset) => dataset.data));

  // Calculate points for the chart
  const points = datasets.map((dataset) => ({
    points: dataset.data.map((value, index) => ({
      x: padding + (index * (chartWidth - 2 * padding)) / (labels.length - 1),
      y:
        chartHeight -
        padding -
        (value / maxValue) * (chartHeight - 2 * padding),
    })),
    color: dataset.color(),
  }));

  // Limit Y-axis ticks to 0 and maxValue for weekly, or more for monthly
  const yAxisTicks = isWeekly ? [0, 1] : [0, maxValue / 2, maxValue];

  return (
    <Svg width={chartWidth} height={chartHeight}>
      {/* Background Gradient */}
      <Defs>
        <LinearGradient id="backgroundGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#9E4F61" stopOpacity="1" />
          <Stop offset="1" stopColor="#260101" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Rect
        x="0"
        y="0"
        rx="16" // Rounded corners
        ry="16"
        width={chartWidth}
        height={chartHeight}
        fill="url(#backgroundGradient)"
      />

      {/* Horizontal dotted grid lines for Y-Axis */}
      {yAxisTicks.map((value, index) => (
        <Line
          key={`horizontal-${index}`}
          x1={padding}
          y1={
            chartHeight -
            padding -
            (value / maxValue) * (chartHeight - 2 * padding)
          }
          x2={chartWidth - padding}
          y2={
            chartHeight -
            padding -
            (value / maxValue) * (chartHeight - 2 * padding)
          }
          stroke="white"
          strokeWidth="0.5"
          strokeDasharray="4 2" // Dotted line
        />
      ))}

      {/* Vertical dotted grid lines for X-Axis */}
      {labels.map((_, index) => (
        <Line
          key={`vertical-${index}`}
          x1={padding + (index * (chartWidth - 2 * padding)) / (labels.length - 1)}
          y1={chartHeight - padding}
          x2={padding + (index * (chartWidth - 2 * padding)) / (labels.length - 1)}
          y2={padding}
          stroke="white"
          strokeWidth="0.5"
          strokeDasharray="4 2" // Dotted line
        />
      ))}

      {/* Y-Axis labels */}
      {yAxisTicks.map((value, index) => (
        <SvgText
          key={`y-label-${index}`}
          x={padding / 2}
          y={
            chartHeight -
            padding -
            (value / maxValue) * (chartHeight - 2 * padding)
          }
          fontSize={10}
          fill="white"
          textAnchor="middle"
        >
          {Math.round(value)}
        </SvgText>
      ))}

    {/* X-axis labels */}
    {labels.map((label, index) => (
      <SvgText
        key={`x-label-${label}`}
        x={
          padding + (index * (chartWidth - 2 * padding)) / (labels.length - 1)
        }
        y={chartHeight - padding / 6} // Increased space for labels
        fontSize={12} // Ensure labels are large enough
        fontWeight="bold" // Make labels bold
        fill="white"
        textAnchor="middle"
      >
        {label}
      </SvgText>
    ))}

      {/* Draw lines */}
      {points.map((dataset, datasetIndex) => (
        <Polyline
          key={`line-${datasetIndex}`}
          points={dataset.points.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke={dataset.color}
          strokeWidth={2}
        />
      ))}

      {/* Draw circles (data points) */}
      {points.map((dataset) =>
        dataset.points.map((point, index) => (
          <Circle
            key={`circle-${index}`}
            cx={point.x}
            cy={point.y}
            r={4}
            fill={dataset.color}
          />
        ))
      )}
    </Svg>
  );
};



const InsightsScreen = () => {
  const { journalEntries = [] } = useEntryDates() || {};
  const [timePeriod, setTimePeriod] = useState("Weekly");
  const [currentWeekStart, setCurrentWeekStart] = useState(
    getStartOfWeek(new Date())
  );
  const [currentWeekEnd, setCurrentWeekEnd] = useState(
    getEndOfWeek(new Date())
  );
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState(null);
  const [topEmotions, setTopEmotions] = useState([]);
  const [emotionCounts, setEmotionCounts] = useState([]);

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

  const formatChartDataForPeriod = (entries, emotions) => {
    if (timePeriod === "Weekly") {
      const weeklyData = groupDataByDay(
        entries,
        currentWeekStart,
        currentWeekEnd,
        emotions
      );
      return {
        labels: generateWeekDays(currentWeekStart),
        datasets: emotions.map((emotion) => ({
          data: weeklyData.map((day) => day[emotion] || 0),
          color: () => emotionColours[emotion] || "#000",
        })),
      };
    } else if (timePeriod === "Monthly") {
      const startOfYear = getStartOfYear(new Date(currentYear, 0, 1));
      const endOfYear = getEndOfYear(new Date(currentYear, 11, 31));
      const monthlyData = groupDataByMonth(
        entries,
        startOfYear,
        endOfYear,
        emotions
      );
      return {
        labels: generateMonthLabels(),
        datasets: emotions.map((emotion) => ({
          data: monthlyData.map((month) => month[emotion] || 0),
          color: () => emotionColours[emotion] || "#000",
        })),
      };
    }
    return { labels: [], datasets: [] };
  };

  useEffect(() => {
    let filteredEntries;

    if (timePeriod === "Weekly") {
      filteredEntries = journalEntries.filter((entry) => {
        const entryDate = new Date(entry.journalDate);
        return entryDate >= currentWeekStart && entryDate <= currentWeekEnd;
      });
    } else if (timePeriod === "Monthly") {
      const startOfYear = getStartOfYear(new Date(currentYear, 0, 1));
      const endOfYear = getEndOfYear(new Date(currentYear, 11, 31));
      filteredEntries = journalEntries.filter((entry) => {
        const entryDate = new Date(entry.journalDate);
        return entryDate >= startOfYear && entryDate <= endOfYear;
      });
    }

    const topEmotionsList = getTopEmotions(filteredEntries, 5);
    const newChartData = formatChartDataForPeriod(filteredEntries, topEmotionsList);
    const initialCounts = getEmotionCounts(filteredEntries);

    setTopEmotions(topEmotionsList);
    setChartData(newChartData);
    setEmotionCounts(
      Object.keys(initialCounts).map((emotionName) => ({
        name: emotionName,
        count: initialCounts[emotionName],
        color: emotionColours[emotionName],
      }))
    );
  }, [journalEntries, timePeriod, currentWeekStart, currentWeekEnd, currentYear]);

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

        {/* Weekly/Monthly Navigation */}
        {timePeriod === "Weekly" && (
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={handlePreviousWeek}
            >
              <Text style={styles.filterButtonText}>&larr; Previous Week</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={handleNextWeek}
            >
              <Text style={styles.filterButtonText}>Next Week &rarr;</Text>
            </TouchableOpacity>
          </View>
        )}
        {timePeriod === "Monthly" && (
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={handlePreviousYear}
            >
              <Text style={styles.filterButtonText}>Previous Year</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={handleNextYear}
            >
              <Text style={styles.filterButtonText}>Next Year</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Line Chart */}
        <View style={styles.chartContainer}>
          {chartData ? (
            <LineChart
              labels={chartData.labels}
              datasets={chartData.datasets}
              isWeekly={timePeriod === "Weekly"} // Pass this to fix max Y-axis to 1 for weekly
            />
          ) : (
            <Text style={styles.noDataText}>
              No data available for this period.
            </Text>
          )}
        </View>

        {/* Pie Chart */}
        <View style={styles.pieChartContainer}>
          {emotionCounts.length > 0 ? (
            <PieChart
              data={emotionCounts}
              accessor={"count"}
              width={Dimensions.get("window").width - 20}
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
