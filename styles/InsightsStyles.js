import { StyleSheet, Dimensions } from "react-native";

const InsightsStyles = StyleSheet.create({

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
  pieChartAndLegend: {
    flexDirection: 'row', // Align Pie Chart and Legend side by side
    justifyContent: 'flex-start', // Align items to the left
    alignItems: 'flex-start', // Align them at the top
    marginVertical: 20,
  },
  chartContainer: {
    marginBottom: 20, // Add spacing between the charts
  },
  pieChartContainer: {
    width: Dimensions.get("window").width * 0.4, // Set Pie Chart width to 40% of the screen width
    height: 200, // Set fixed height
    justifyContent: 'center', // Center the chart inside the container
    alignItems: 'center', // Align center horizontally
  },
  legendContainer: {
    marginLeft: 20, // Add space between Pie Chart and Legend
  },
  legendItem: {
    flexDirection: "row", // Side by side for each legend item
    alignItems: "center", // Align items vertically
    marginBottom: 8,
  },
  legendColorBox: {
    width: 20,
    height: 20,
    marginRight: 8, // Space between color box and text
  },
  legendText: {
    fontSize: 14,
    color: "#260101",
    marginRight: 8, // Space between text and emoji
  },
  legendEmoji: {
    width: 20,
    height: 20,
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
  periodText: {
    textAlign: "center",
    color: "#000",
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
});

export default InsightsStyles;
