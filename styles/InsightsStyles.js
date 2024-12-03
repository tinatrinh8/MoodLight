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
    color: "#260101",
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 5,
  },
  legendColorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#000",
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
    activeFilter: {
      flex: 1,
      backgroundColor: "#954356",
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
pieChartTitle: {
  textAlign: "center",
  fontSize: 16,
  fontWeight: "bold",
  color: "#6B0F1A",
},
});


export default InsightsStyles;
