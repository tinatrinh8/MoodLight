import { StyleSheet, Dimensions } from "react-native";

const InsightsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F0E8", // Light pink background
    padding: 16,
  },
  insightsTitle: {
    fontSize: 32,
    color: "#260101",
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "LexendDeca",
    marginBottom: 15,
    fontFamily: "LexendDeca",
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
    fontFamily: "LexendDeca",
  },
  chartContainer: {
    marginBottom: 20,
  },
  pieChartContainer: {
    marginBottom: 50,
    paddingBottom: 40, // Space below the chart
    backgroundColor: "transparent", // Ensure it doesn't override the gradient
    borderRadius: 16, // Round corners
    overflow: "hidden", // Clip content to rounded edges
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#FFFF",
    borderRadius: 30,
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
    fontFamily: "LexendDeca",
    borderWidth: 1,
    borderColor: "black",
  },
  legendText: {
    fontSize: 12,
    color: "#000",
    fontFamily: "LexendDeca",
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
    borderWidth: 2,
  },
  activeFilter: {
    flex: 1,
    backgroundColor: "#954356",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 2,
  },
  activeFilterButton: {
    backgroundColor: "#9E4F61",
    borderWidth: 2,
  },
  filterButtonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    fontFamily: "LexendDeca",
  },
  periodText: {
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    fontFamily: "LexendDeca",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noDataText: {
    color: "#black",
    fontSize: 16,
    textAlign: "center",
  },
});

export default InsightsStyles;
