import { StyleSheet } from "react-native";

const AnalysisStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DC869A", // Pink background for the entire screen
  },
    scrollContainer: {
      flex: 1,
      backgroundColor: "#DC869A", // Same background for scrollable content
    },
    scrollContent: {
      paddingBottom: 20, // Add bottom padding for scrolling experience
    },
  // Header
  analysisHeader: {
    width: "100%",
    paddingVertical: 0,
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
      marginTop: 0, // Reduce the top margin for less space
      flexDirection: "row", // Keep text and sofa in a row
      alignItems: "center", // Vertically align the text and sofa
      justifyContent: "flex-start", // Align items to the left
    },
    resultsText: {
      fontSize: 32,
      fontWeight: "600",
      color: "#000000",
      fontFamily: "LexendDeca",
    },
    sofa: {
      width: 70, // Increase width for a bigger sofa
      height: 70, // Increase height for a bigger sofa
      resizeMode: "contain",
      marginLeft: 10, // Add space between text and sofa
    },

    journalEntryContainer: {
      marginTop: 20,
      padding: 10,
      backgroundColor: "#E6C3CB", // Set the background color to the pink shade
      borderRadius: 15, // Keep the rounded corners
      borderWidth: 2, // Add a border
      borderColor: "#000000", // Set the border color to black
      shadowColor: "#000", // Optional: Keep shadow for a lifted effect
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
    },

  journalEntryContent: {
    padding: 10,
  },
  journalEntryDate: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "LexendDeca",
  },
  journalEntryTitle: {
    fontSize: 14,
    color: "#000000",
  },
  title: {
    fontSize: 20, // Keep or adjust the font size
    fontWeight: "bold", // Make the text bold
    color: "#000000", // Black text
    textAlign: "center", // Center the text horizontally
    marginBottom: 10, // Add space below the title
    marginTop: 10, // Add space below the title
    fontFamily: "LexendDeca",
  },

  // Emotions Section
  emotionsContainer: {
    marginTop: 20,
    flexDirection: "row", // Arrange cards in a row
    justifyContent: "center", // Center all cards horizontally
    alignItems: "flex-end", // Align cards to the bottom
  },
  emotionCard: {
    borderRadius: 15, // Rounded corners
    padding: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000", // Black border
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    width: 100, // Uniform width for all cards
    justifyContent: "flex-end", // Align content to the bottom for different heights
  },
   emotionCardRank1: {
     backgroundColor: "#E6C3CB",
     height: 180, // Tallest for rank 1
   },
   emotionCardRank2: {
     backgroundColor: "#954356",
     height: 140, // Medium for rank 2
   },
   emotionCardRank3: {
     backgroundColor: "#BA677B",
     height: 120, // Shortest for rank 3
   },
  rankText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "LexendDeca",
    position: "absolute",
    top: 5, // Position rank number at the very top of the card
  },
  emotionIcon: {
    width: 34,
    height: 34, // Smaller emoji size
    marginVertical: 8,
  },
  emotionName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "LexendDeca",
    textAlign: "center",
  },
  // Centered Title for Summary and Suggestions
    sectionTitleCentered: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#000", // Black text
      textAlign: "center", // Center the title
      marginBottom: 10, // Add spacing between title and box
      marginTop: 10,
    },

    // Summary Container
    summaryContainer: {
      marginVertical: 20,
      padding: 15,
      backgroundColor: "#F5F0E8", // Light beige background
      borderRadius: 15, // Rounded corners
      borderWidth: 2, // Black border
      borderColor: "#000000", // Border color
      shadowColor: "#000", // Optional shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
      width: "90%", // Box width
      alignSelf: "center",
    },
    summaryContent: {
      fontSize: 16,
      color: "#4B4B4B", // Dark gray text
      textAlign: "left", // Align text to the left
    },

  feedbackContainer: {
    marginVertical: 20,
    width: "90%",
    alignSelf: "center",
  },
  feedbackBox: {
    backgroundColor: "#F5F0E8",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#000000",
    padding: 15,
  },
  feedbackContent: {
    fontSize: 16,
    color: "#4B4B4B", // Text color
  },
  viewPromptButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  viewPromptText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  // Suggestions Container
  suggestionsContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#F5F0E8", // Light beige background
    borderRadius: 15, // Rounded corners
    borderWidth: 2, // Black border
    borderColor: "#000000", // Border color
    shadowColor: "#000", // Optional shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    width: "90%", // Box width
    alignSelf: "center",
  },
  suggestionsContent: {
    fontSize: 16,
    color: "#4B4B4B", // Dark gray text
    textAlign: "left", // Align text to the left
  },
  exitButton: {
    position: "absolute", // Ensure it floats
    top: 20, // Adjust as needed to align with the header
    right: 20, // Push it to the right
    padding: 15, // Increase padding for a larger touch area
    zIndex: 10, // Ensure it is above other elements
  },
  exitButtonText: {
    fontSize: 36, // Make the font size larger
    color: "#FFF", // Keep it white for visibility
    fontWeight: "bold",
  },
});

export default AnalysisStyles;
