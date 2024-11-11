import { StyleSheet } from "react-native";

const AnalysisStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0", // Light background color for a pleasant visual
    padding: 20,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  analysisHeader: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "#DC869A", // A soft pink color for consistency with the MoodLight theme
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moodLightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  moodLightText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  exitIcon: {
    padding: 10,
  },
  closeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  resultsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  sofa: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  journalEntryContainer: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    paddingHorizontal: 15,
  },
  journalEntryFrame: {
    width: "100%",
    height: 2,
    backgroundColor: "#DC869A",
    marginBottom: 10,
  },
  journalEntryContent: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  journalEntryDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B4B4B",
  },
  journalEntryTitle: {
    fontSize: 14,
    color: "#787392",
    marginTop: 5,
  },
  analysisContent: {
    marginTop: 20,
    padding: 20,
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    alignItems: "flex-start",
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B4B4B",
    marginBottom: 10,
  },
  resultDescription: {
    fontSize: 14,
    color: "#787392",
    marginBottom: 15,
  },
  analysisResultsContainer: {
    marginTop: 15,
  },
  analysisText: {
    fontSize: 16,
    color: "#4B4B4B",
    marginBottom: 10,
  },
});

export default AnalysisStyles;
