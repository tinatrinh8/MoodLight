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
      fontSize: 16,
      textAlign: "center",
    },
    journalEntryTitle: {
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 5,
    },
    journalEntryBox: {
      alignSelf: "center",
      width: "80%", // Adjust to your desired width
      backgroundColor: "#E6C3CB", // Light pink background
      borderRadius: 10,
      borderWidth: 2, // Add border width
      borderColor: "#000", // Black border
      padding: 15,
      marginVertical: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5, // For Android shadow
      alignItems: "center", // Center content inside the box
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
      justifyContent: "center", // Center the cards
      gap: 15, // Add space between the cards
    },
    emotionCard: {
      backgroundColor: "#F4E6EB", // Light pink background
      borderRadius: 15, // Rounded corners
      padding: 10,
      alignItems: "center",
      borderWidth: 2, // Add a border
      borderColor: "#000", // Black border
      shadowColor: "#000", // Optional: Shadow for lifted effect
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
      width: 90, // Set card width
    },
  rankText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "LexendDeca",
  },
  emotionIcon: {
    width: 50,
    height: 50,
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
emotionCard: {
  width: 100,
  height: 140,
  margin: 5,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 10,
  backgroundColor: "#ffe4e1", // Light pink for cards
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 2,
  elevation: 3,
},
firstPlaceCard: {
  backgroundColor: "#fce38a", // Gold for 1st place
},
otherPlaceCard: {
  backgroundColor: "#f7cac9", // Light pink for others
},
emotionIcon: {
  width: 50,
  height: 50,
  margin: 10,
},

});

export default AnalysisStyles;
