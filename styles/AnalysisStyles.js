import { StyleSheet } from "react-native";

const AnalysisStyles = StyleSheet.create({
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: "#260101",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFF", // Pink background for the entire screen
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#DC869A", // Same background for scrollable content
  },
  scrollContent: {
    paddingBottom: 20, // Add bottom padding for scrolling experience
  },

  scrollWrapper: {
    position: "relative", // Ensure scroll indicator is positioned relative to container
    flex: 1,
  },
  scrollIndicator: {
    position: "absolute",
    right: 2, // Align it close to the scrollable edge
    width: 3, // Set a clear and visible width
    backgroundColor: "#000000", // Black scrollbar
    borderRadius: 2, // Slight rounding for aesthetic
    zIndex: 5, // Ensure it appears on top of the content
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

  loadingContainer: {
    flex: 1, // Take up available space
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    marginVertical: 20,
  },

  loadingText: {
    fontSize: 18, // Adjust font size for readability
    color: "#DC869A", // Match the spinner color
    textAlign: "center", // Center the text
    marginTop: 10, // Add spacing below the spinner
    fontFamily: "LexendDeca", // Optional: Custom font for consistency
  },

  // Styles specifically for the emotions loading screen
  emotionsLoadingContainer: {
    flex: 1, // Take up the full screen
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
    backgroundColor: "#DC869A", // Match the app's background theme
    padding: 20, // Add some padding for spacing
  },
  emotionsLoadingText: {
    fontSize: 18, // Readable font size
    fontWeight: "600", // Semi-bold for emphasis
    color: "#FFFFF", // Neutral text color
    textAlign: "center", // Center-align the text
    marginTop: 10, // Spacing between the spinner (if used) and text
    fontFamily: "LexendDeca", // Optional: Ensure consistent font
  },
  emotionsLoadingSpinner: {
    marginBottom: 20, // Add spacing below the spinner
  },

  resultsContainer: {
    marginTop: 30, // Reduce the top margin for less space
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

  emotionsSection: {
    marginTop: 20,
    fontWeight: "bold",
  },

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
    marginTop: 30,
  },

  // Summary Container
  summaryContainer: {
    marginVertical: 10,
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

  summaryScrollContainer: {
    maxHeight: 200, // Set a maximum height to ensure the box is scrollable
    padding: 5, // Add padding for better readability
  },

  feedbackContainer: {
    marginVertical: 10,
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
  feedbackContent: {
    fontSize: 16,
    color: "#4B4B4B", // Dark gray text
    textAlign: "left", // Align text to the left
  },
  feedbackBox: {
    backgroundColor: "#F5F0E8",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#000000",
    padding: 15,
  },

  feedbackScrollContainer: {
    maxHeight: 200, // Set a maximum height to ensure scrollability
    padding: 5, // Add padding for better readability
  },

  viewPromptButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  viewPromptText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    fontFamily: "LexendDeca",
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
  tagsContainer: {
    marginTop: 20, // Add spacing above the tag container
    paddingHorizontal: 15, // Add horizontal padding for the container
    overflow: "visible",
    marginLeft: 10, // Add spacing above the tag container
  },
  tagTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10, // Space between title and tags
    color: "#00000", // Dark text color
    fontFamily: "LexendDeca",
  },
  tagScrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Allow wrapping
    justifyContent: "flex-start", // Align tags to the left
    overflow: "visible", // Allow shadows to render properly
  },

  tag: {
    backgroundColor: "#E6E6E6", // Default background color
    borderRadius: 20, // Rounded corners for tags
    paddingVertical: 10, // Vertical padding inside the tag
    paddingHorizontal: 18, // Horizontal padding inside the tag
    margin: 10, // Uniform margin around each tag
    elevation: 3, // Increased shadow depth for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 3 }, // Deeper shadow for better visibility
    shadowOpacity: 0.3, // Enhanced shadow opacity
    shadowRadius: 5, // Increased shadow blur
  },

  tagText: {
    fontSize: 16, // Font size for tag text
    color: "#FFFFFF", // Dark text color
    textAlign: "center", // Center align text
    fontFamily: "LexendDeca",
  },
  noTagsText: {
    fontSize: 14,
    color: "#888", // Grey color for "No related words" text
    fontStyle: "italic",
  },
});
export default AnalysisStyles;
