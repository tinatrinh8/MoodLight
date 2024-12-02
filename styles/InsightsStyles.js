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
  weekDisplay: {
    marginVertical: 10,
    alignItems: "center", // Centers the text horizontally
    justifyContent: "center", // Centers the content vertically
  },
  weekText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#260101", // Matches your theme
    textAlign: "center", // Centers the text
  },
  chartContainer: {
    marginBottom: 20,
  },
  pieChartContainer: {
    marginBottom: 20,
    paddingBottom: 40,    // Add extra padding at the bottom
  },
  legendContainer: {
    flexDirection: "column",
    alignItems: "flex-start", // Align items in the container to the start
    position: "absolute", // Position the legend absolutely
    right: 16, // Move the legend to the right with padding
    top: 300, // Adjust the vertical positioning
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
    textAlign: "center",
  },
});

export default InsightsStyles;
