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
  groupDataByMonthWithDetails,
  groupDataByYear,
} from "../utils/emotionUtils";
import { emotionColours } from "../utils/emotionColours";
import styles from "../styles/InsightsStyles";
import analysisStyles from "../styles/AnalysisStyles";

const LineChart = ({ labels, datasets, viewType }) => {
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
      x: labels.length === 1
        ? chartWidth / 2 // Center the point if only one label
        : padding + (index * (chartWidth - 2 * padding)) / (labels.length - 1),
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

    {/* Solid Y-axis Line */}
    <Line
      x1={padding}
      y1={padding}
      x2={padding}
      y2={chartHeight - padding}
      stroke="white"
      strokeWidth="2" // Thicker for emphasis
    />

    {/* Solid X-axis Line */}
    <Line
      x1={padding}
      y1={chartHeight - padding}
      x2={chartWidth - padding}
      y2={chartHeight - padding}
      stroke="white"
      strokeWidth="2" // Thicker for emphasis
    />

    {/* Horizontal dotted grid lines for Y-Axis */}
    {yAxisTicks.map((value, index) => (
      <Line
        key={`horizontal-${index}`}
        x1={padding}
        y1={
          chartHeight -
          padding -
          (value / yAxisMax) * (chartHeight - 2 * padding)
        }
        x2={chartWidth - padding}
        y2={
          chartHeight -
          padding -
          (value / yAxisMax) * (chartHeight - 2 * padding)
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
        x1={
          labels.length === 1
            ? chartWidth / 2
            : padding +
              (index * (chartWidth - 2 * padding)) / (labels.length - 1)
        }
        y1={chartHeight - padding}
        x2={
          labels.length === 1
            ? chartWidth / 2
            : padding +
              (index * (chartWidth - 2 * padding)) / (labels.length - 1)
        }
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
          (value / yAxisMax) * (chartHeight - 2 * padding)
        }
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
    x={
      padding +
      (index * (chartWidth - 2 * padding)) / (labels.length - 1) +
      (viewType === "Monthly" ? (index === 0 ? 10 : index === labels.length - 1 ? -10 : 0) : 0) // Add padding only for Monthly View
    }
    y={chartHeight - padding / 6} // Adjust position slightly above
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
  const [yearlyEmotions, setYearlyEmotions] = useState([]); // Top 10 emotions for Yearly
  const [monthlyEmotions, setMonthlyEmotions] = useState([]); // Dynamic emotions for Monthly

  const [viewType, setViewType] = useState("Yearly"); // Default to "Yearly"
  const [monthlyDetails, setMonthlyDetails] = useState([]); // Array of 12 arrays
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth()); // Default to current month
    const [pieChartData, setPieChartData] = useState([]); // State for PieChart data
    const handleViewTypeChange = (type) => {
      if (type === "Monthly") {
        setSelectedMonthIndex(new Date().getMonth()); // Set to current month when switching to Monthly view
      }
      setViewType(type);
    };

  const handleNextYear = () => setCurrentYear((prev) => prev + 1);
  const handlePreviousYear = () => setCurrentYear((prev) => prev - 1);
useEffect(() => {
  let pieData = [];

  // Filter entries by the current year
  const filteredEntries = journalEntries.filter((entry) => {
    const [year] = entry.journalDate.split("-"); // Extract year from journalDate
    return parseInt(year, 10) === currentYear; // Filter entries for the current year
  });

  // Group entries by month for the monthly view
  const groupedByMonth = groupDataByMonthWithDetails(
    journalEntries,
    getStartOfYear(new Date(currentYear, 0, 1)),
    getEndOfYear(new Date(currentYear, 11, 31)),
    getTopEmotions(journalEntries, 10)
  );
  setMonthlyDetails(groupedByMonth);


  // Get top emotions for the current year
  const topEmotionsList = getTopEmotions(filteredEntries, 10); // Top 5 emotions
  setTopEmotions(topEmotionsList);
    console.log("Top Emotions List:", topEmotionsList);
  // Group entries for the yearly view
  const groupedData = groupDataByYear(filteredEntries, currentYear, topEmotionsList);

  // Format the chart data for the yearly line chart
  const chartData = {
    labels: generateMonthLabels(),
    datasets: topEmotionsList.map((emotion) => ({
      data: groupedData.map((month) => month[emotion] || 0),
      color: () => emotionColours[emotion] || "#000", // Assign color to emotions
    })),
  };
  setChartData(chartData);

  // Prepare PieChart data based on viewType
  if (viewType === "Yearly" && chartData?.datasets) {
    // Aggregate yearly data for the PieChart
    pieData = chartData.datasets.map((dataset, index) => ({
      name: topEmotionsList[index],
      count: dataset.data.reduce((sum, value) => sum + value, 0), // Sum up counts for the year
      color: emotionColours[topEmotionsList[index]] || "#000", // Default to black if color is missing
    }));
  } else if (viewType === "Monthly" && groupedByMonth[selectedMonthIndex]?.length > 0) {
    // Aggregate monthly data for the PieChart
    const monthlyCounts = {};
    groupedByMonth[selectedMonthIndex].forEach((entry) => {
      entry.emotions.forEach((emotion) => {
        monthlyCounts[emotion] = (monthlyCounts[emotion] || 0) + 1;
      });
    });

    pieData = Object.keys(monthlyCounts).map((emotion) => ({
      name: emotion,
      count: monthlyCounts[emotion],
      color: emotionColours[emotion] || "#000", // Default to black if color is missing
    }));
  }

  setPieChartData(pieData); // Update PieChart data

  let legendEmotions = [];

if (viewType === "Yearly") {
    // Compute and set yearly emotions
    const topYearlyEmotions = getTopEmotions(filteredEntries, 10); // Top 10 emotions
    setYearlyEmotions(topYearlyEmotions);
    setTopEmotions(topYearlyEmotions); // Update the legend for Yearly
  } else if (viewType === "Monthly" && monthlyDetails[selectedMonthIndex]?.length > 0) {
    // Compute and set monthly emotions
    const monthlyEmotionSet = new Set();
    monthlyDetails[selectedMonthIndex].forEach((entry) => {
      entry.emotions.forEach((emotion) => monthlyEmotionSet.add(emotion));
    });
    const dynamicMonthlyEmotions = Array.from(monthlyEmotionSet);
    setMonthlyEmotions(dynamicMonthlyEmotions);
    setTopEmotions(dynamicMonthlyEmotions); // Update the legend for Monthly
  }

}, [journalEntries, currentYear, viewType, selectedMonthIndex]);


return (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
      <Header />
      <Text style={styles.insightsTitle}>Insights</Text>

      {/* Time Period Filter */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={viewType === "Yearly" ? styles.activeFilter : styles.filterButton}
          onPress={() => setViewType("Yearly")}
        >
          <Text style={styles.filterButtonText}>Yearly</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={viewType === "Monthly" ? styles.activeFilter : styles.filterButton}
          onPress={() => setViewType("Monthly")}
        >
          <Text style={styles.filterButtonText}>Monthly</Text>
        </TouchableOpacity>
      </View>

      {/* Yearly Navigation */}
        {viewType === "Yearly" && (
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={handlePreviousYear}
            >
              <Text style={styles.filterButtonText}>Previous Year</Text>
            </TouchableOpacity>
            {currentYear < new Date().getFullYear() && ( // Hide Next Year button if it's the current year
              <TouchableOpacity
                style={styles.filterButton}
                onPress={handleNextYear}
              >
                <Text style={styles.filterButtonText}>Next Year</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

    {/* Monthly Navigation */}
    {viewType === "Monthly" && (
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() =>
            setSelectedMonthIndex((prev) => (prev > 0 ? prev - 1 : 11))
          }
        >
          <Text style={styles.filterButtonText}>Previous Month</Text>
        </TouchableOpacity>
        {!(currentYear === new Date().getFullYear() && selectedMonthIndex === 11) && ( // Hide Next Month button if it's December of the current year
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() =>
              setSelectedMonthIndex((prev) => (prev < 11 ? prev + 1 : 0))
            }
          >
            <Text style={styles.filterButtonText}>Next Month</Text>
          </TouchableOpacity>
        )}
      </View>
    )}
      {/* Display Selected Time Period */}
      <View style={styles.weekDisplay}>
        <Text style={styles.weekText}>
          {viewType === "Yearly"
            ? `Showing Top 10 Emotions for Year: ${currentYear}`
            : `Showing Month: ${
                generateMonthLabels()[selectedMonthIndex]
              } ${currentYear}`}
        </Text>
      </View>
      {/* Chart Container */}
      <View style={styles.chartContainer}>
        {viewType === "Yearly" ? (
          chartData && chartData.datasets.some((dataset) => dataset.data.some((value) => value > 0)) ? (
            <>
              <LineChart
              viewType={viewType} // Pass viewType as a prop
              labels={generateMonthLabels()}
              datasets={chartData.datasets} />
              {/*  Legend */}
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
            <Text style={styles.noDataText}>No data available for this period.</Text>
          )
        ) : (
          monthlyDetails[selectedMonthIndex] &&
          monthlyDetails[selectedMonthIndex].length > 0 ? (
            <>
              <LineChart
                viewType={viewType} // Pass viewType as a prop
                labels={monthlyDetails[selectedMonthIndex]
                  .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort dates
                  .map((entry) => {
                    const [year, month, day] = entry.date.split("-");
                    return `${generateMonthLabels()[parseInt(month, 10) - 1]} ${day}`; // Format as "Month DD"
                  })}
                datasets={topEmotions.map((emotion) => ({
                  data: monthlyDetails[selectedMonthIndex]
                    .map((entry) => (entry.emotions.includes(emotion) ? 1 : 0)), // 1 if the emotion exists, otherwise 0
                  color: () => emotionColours[emotion] || "#000", // Assign color based on emotion
                }))}
              />
              {/* Monthly Legend */}
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
            <Text style={styles.noDataText}>No entries for this month.</Text>
          )
        )}
      </View>

{/* Pie Chart */}
<View style={styles.pieChartContainer}>
  {pieChartData.length > 0 ? (
    <>
      {/* Dynamic Title */}
      <Text style={styles.weekText}>
        {viewType === "Yearly"
          ? `Emotion Distribution for ${currentYear}`
          : `Emotion Distribution for ${generateMonthLabels()[selectedMonthIndex]} ${currentYear}`}
      </Text>

      {/* PieChart Component */}
      <PieChart
        data={pieChartData}
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
        backgroundColor="#E6C3CB" // ADD COLOUR HERE SHANNON
        paddingLeft="15"
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

    </>
  ) : (
    <Text style={styles.noDataText}>No data available for this period.</Text>
  )}
</View>


      </View>
    </ScrollView>
  );
};

export default InsightsScreen;
