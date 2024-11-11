import { StyleSheet } from "react-native";

const AnalysisStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  // Header
  analysisHeader: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "#DC869A", // Match pink shade
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moodLightText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  resultsContainer: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  resultsText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  sofa: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginLeft: 5,
  },
  journalEntryContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  journalEntryContent: {
    padding: 10,
  },
  journalEntryDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B4B4B",
  },
  journalEntryTitle: {
    fontSize: 14,
    color: "#787392",
  },
  // Emotions Section
  emotionsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  emotionCard: {
    backgroundColor: "#F4E6EB",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    width: 90,
  },
  rankText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B4B4B",
  },
  emotionIcon: {
    width: 50,
    height: 50,
    marginVertical: 8,
  },
  emotionName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4B4B4B",
    textAlign: "center",
  },
  // Summary and Feedback
  summaryContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    width: "90%",
    alignSelf: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B4B4B",
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
    color: "#4B4B4B",
  },
  viewPromptButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  viewPromptText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  // Suggestions Section
  suggestionsContainer: {
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
});

export default AnalysisStyles;
