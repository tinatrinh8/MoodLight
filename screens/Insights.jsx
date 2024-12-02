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
  getStartOfYear,
  getEndOfYear,
  generateMonthLabels,
  groupDataByMonth,
} from "../utils/emotionUtils";
import { emotionColours } from "../utils/emotionColours";
import styles from "../styles/InsightsStyles";
import analysisStyles from "../styles/AnalysisStyles";

const LineChart = ({ labels, datasets }) => {
  const chartWidth = Dimensions.get("window").width - 32;
  const chartHeight = 250;
  const padding = 20;

  // Find max value in datasets for scaling
  const maxValue = Math.max(...datasets.flatMap((dataset) => dataset.data));

  // Ensure the max value for Y-axis doesn't show decimals
  const yAxisMax = Math.ceil(maxValue);

  // Calculate points for the chart
  const points = datasets.map((dataset) => ({
    points: dataset.data.map((value, index) => ({
      x: padding + (index * (chartWidth - 2 * padding)) / (labels.length - 1),
      y:
        chartHeight - padding - (value / yAxisMax) * (chartHeight - 2 * padding),
    })),
    color: dataset.color(),
  }));

  // Set Y-axis ticks (1, 2, 3, ...)
  const yAxisTicks = Array.from({ length: yAxisMax }, (_, i) => i + 1);

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
          y1={chartHeight - padding - (value / yAxisMax) * (chartHeight - 2 * padding)}
          x2={chartWidth - padding}
          y2={chartHeight - padding - (value / yAxisMax) * (chartHeight - 2 * padding)}
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
          y={chartHeight - padding - (value / yAxisMax) * (chartHeight - 2 * padding)}
          fontSize={10}
          fill="white"
          textAnchor="middle"
        >
          {value}
        </SvgText>
      ))}

      {/* X-axis labels */}
      {labels.map((label, index) => (
        <SvgText
          key={`x-label-${label}`}
          x={padding + (index * (chartWidth - 2 * padding)) / (labels.length - 1)}
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
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState(null);
  const [topEmotions, setTopEmotions] = useState([]);
  const [emotionCounts, setEmotionCounts] = useState([]);

  const handleNextYear = () => setCurrentYear((prev) => prev + 1);
  const handlePreviousYear = () => setCurrentYear((prev) => prev - 1);

  useEffect(() => {
    let filteredEntries;

    const startOfYear = getStartOfYear(new Date(currentYear, 0, 1));
    const endOfYear = getEndOfYear(new Date(currentYear, 11, 31));
    filteredEntries = journalEntries.filter((entry) => {
      const entryDate = new Date(entry.journalDate);
      return entryDate >= startOfYear && entryDate <= endOfYear;
    });

    // Get top emotions and format chart data
    const topEmotionsList = getTopEmotions(filteredEntries, 5); // Top 5 emotions
    const groupedData = groupDataByMonth(
      filteredEntries,
      startOfYear,
      endOfYear,
      topEmotionsList
    );

    const chartData = {
      labels: generateMonthLabels(),
      datasets: topEmotionsList.map((emotion) => ({
        data: groupedData.map((month) => month[emotion] || 0),
        color: () => emotionColours[emotion] || "#000", // Default to black if no color found
      })),
    };

    setTopEmotions(topEmotionsList);
    setChartData(chartData);

    // Set emotion counts for PieChart
    setEmotionCounts(
      Object.keys(getEmotionCounts(filteredEntries)).map((emotionName) => ({
        name: emotionName,
        count: getEmotionCounts(filteredEntries)[emotionName],
        color: emotionColours[emotionName],
      }))
    );
  }, [journalEntries, currentYear]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Header />
        <Text style={styles.insightsTitle}>Insights</Text>

        {/* Monthly Navigation */}
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
        <View style={styles.weekDisplay}>
          <Text style={styles.weekText}>{`Showing Year: ${currentYear}`}</Text>
        </View>

        {/* Line Chart */}
        <View style={styles.chartContainer}>
          {chartData && chartData.datasets.some(dataset => dataset.data.some(value => value > 0)) ? (
            <>
              <LineChart labels={chartData.labels} datasets={chartData.datasets} />

              {/* Legend */}
              <View style={styles.legendContainer}>
                {topEmotions.map((emotion, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View
                      style={[
                        styles.legendColorBox,
                        { backgroundColor: emotionColours[emotion] || "#000" },
                      ]}
                    />
                    <Text style={styles.legendText}>{emotion}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <Text style={styles.noDataText}>
              No data available for this period.
            </Text>
          )}
        </View>

    {/* Pie Chart */}
    <View style={styles.pieChartContainer}>
      {emotionCounts.length > 0 && (
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
      )}
    </View>
      </View>
    </ScrollView>
  );
};

export default InsightsScreen;
