import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import Header from "../components/Header";
import { useEntryDates } from "../components/EntryDatesContext";
import { calculateEmotionCounts } from "../utils/emotionUtils";
import { getTopEmotions } from "../utils/emotionUtils";
import { emotionData } from "../components/emotionData";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, isWithinInterval } from "date-fns";
import { emotionColors } from "../utils/emotionColours"; // Correct path

const InsightsScreen = () => {
  const { journalEntries } = useEntryDates(); // Get journal entries from context
  const [timePeriod, setTimePeriod] = useState("Weekly"); // Default filter
  const [filteredData, setFilteredData] = useState([]);
  const [topEmotions, setTopEmotions] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);

  // Filter entries by selected time period
  const filterEntriesByPeriod = (entries, period) => {
    const now = new Date();

    const start = {
      Weekly: startOfWeek(now),
      Monthly: startOfMonth(now),
      Yearly: startOfYear(now),
    }[period];

    const end = {
      Weekly: endOfWeek(now),
      Monthly: endOfMonth(now),
      Yearly: endOfYear(now),
    }[period];

    return entries.filter((entry) => {
      const entryDate = new Date(entry.journalDate);
      return isWithinInterval(entryDate, { start, end });
    });
  };

  // Fetch top emotions and calculate chart data whenever journal entries or timePeriod changes
  useEffect(() => {
    if (journalEntries?.length) {
      const filteredEntries = filterEntriesByPeriod(journalEntries, timePeriod);  // Filter based on time period
      const top5 = getTopEmotions(filteredEntries, 5); // Get top 5 emotions

      if (top5.length) {
        setTopEmotions(top5);
        const counts = calculateEmotionCounts(filteredEntries, timePeriod, top5);
        setFilteredData(counts);

        setChartData(formatChartData(counts, top5)); // Format data for line chart
        setPieChartData(calculatePieChartData(filteredEntries, timePeriod)); // Calculate data for pie chart based on filtered data
      } else {
        // Handle the case where no emotions are found
        setTopEmotions([]);
        setChartData(null);
        setPieChartData([]);
      }
    } else {
      // Handle case where journalEntries is empty
      setTopEmotions([]);
      setChartData(null);
      setPieChartData([]);
    }
  }, [journalEntries, timePeriod]);

  // Format data for the line chart
  const formatChartData = (data, emotions) => {
    const labels = data.map((entry) => entry.date); // X-axis labels (dates)
    const datasets = emotions.map((emotion) => {
      const emoji = emotionData[emotion] || {}; // Safeguard for undefined emoji
      return {
        data: data.map((entry) => entry[emotion] || 0), // Y-axis counts for each emotion
        color: () => `rgba(255, 255, 255, 1)`, // White lines
        strokeWidth: 2, // Line thickness
        emoji: emoji, // Emoji for each emotion
      };
    });

    // Calculate the Y-axis dynamically based on max count
    const maxCount = Math.max(...datasets.flatMap(dataset => dataset.data));
    const yAxisLabels = Array.from({ length: maxCount + 1 }, (_, i) => i); // Create labels 0 to maxCount

    return { labels, datasets, yAxisLabels };
  };

  // Calculate pie chart data (total occurrences of each emotion) based on selected time period
  const calculatePieChartData = (entries, period) => {
    const emotionCounts = {};

    // Count the occurrences of each emotion
    entries.forEach((entry) => {
      if (entry.topEmotions) {
        entry.topEmotions.forEach((emotion) => {
          if (!emotionCounts[emotion]) {
            emotionCounts[emotion] = 0;
          }
          emotionCounts[emotion] += 1; // Increment emotion count
        });
      }
    });

    // Format the data for the pie chart with the colors from emotionColours
    return Object.entries(emotionCounts).map(([emotion, count]) => ({
      name: emotion,
      population: count,
      color: emotionColors[emotion] || "#ccc", // Fallback to a default color if not found
      emoji: emotionData[emotion] || { uri: "" }, // Fallback for undefined emoji
    }));
  };

  // Helper function to generate date keys (Weekly, Monthly, Yearly)
  const getDateKey = (date, period) => {
    if (period === "Weekly") {
      return format(startOfWeek(date), "yyyy-MM-dd"); // Use start of the week for the key
    } else if (period === "Monthly") {
      return format(date, "yyyy-MM"); // Use month for the key
    } else if (period === "Yearly") {
      return format(date, "yyyy"); // Use year for the key
    }
    return format(date, "yyyy-MM-dd"); // Default to daily key
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.insightsTitle}>Insights</Text>

      {/* Time Period Filter */}
      <View style={styles.filterContainer}>
        {["Weekly", "Monthly", "Yearly"].map((period) => (
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

      {/* Line Chart */}
      <View style={styles.chartContainer}>
        {chartData ? (
          <LineChart
            data={{
              labels: chartData.labels,
              datasets: chartData.datasets,
            }}
            width={Dimensions.get("window").width - 32} // Full screen width
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
                fill: "#FFFFFF", // White dots
              },
            }}
            bezier
            style={styles.chart}
          />
        ) : (
          <Text style={styles.noDataText}>No data available for this period.</Text>
        )}
      </View>

      {/* Pie Chart */}
      <View style={styles.pieChartAndLegend}>
        {pieChartData.length > 0 ? (
        <PieChart
          data={pieChartData}
          width={Dimensions.get("window").width * 0.5} // Shrink the width (50% of the screen width)
          height={200} // Shrink the height to make it smaller
          chartConfig={{
            backgroundColor: "#260101",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            hasLegend={false} // Disable the default PieChart legend
          />
        ) : (
          <Text style={styles.noDataText}>No data available for this period.</Text>
        )}
      </View>

      {/* Custom Pie Chart Legend */}
    <View style={styles.legendContainer}>
      {pieChartData.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <Text style={styles.legendText}>
            <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
            {item.name}
          </Text>
          <Image source={item.emoji} style={styles.legendEmoji} />
        </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6C3CB", // Light pink background
    padding: 16,
  },
  insightsTitle: {
    fontSize: 32,
    color: "#260101",
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    backgroundColor: "#DC869A",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  activeFilterButton: {
    backgroundColor: "#9E4F61",
  },
  filterButtonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
  },

  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },

  noDataText: {
    color: "#FFF",
    fontSize: 16,
  },
  legendContainer: {
    marginVertical: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendColorBox: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: "#260101",
    marginRight: 8,
  },
  legendEmoji: {
    width: 20,
    height: 20,
  },
});

export default InsightsScreen;
