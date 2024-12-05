import { StyleSheet } from "react-native";

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F0E8",
    padding: 20,
  },
  greetingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  greetingTextContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginRight: 10, // Space between text and profile picture
  },
  greetingText: {
    fontSize: 20,
    color: "#1D3557",
    fontFamily: "LexendDeca",
    fontWeight: "bold",
  },
  greetingSubtitleText: {
    fontSize: 15,
    color: "#1D3557",
    fontFamily: "LexendDeca",
    transform: [{ skewX: "-10deg" }],
    marginTop: 4, // Space between greeting text and subtitle
  },

  profileContainer: {
    width: 40, // Adjust the circle's width
    height: 40, // Adjust the circle's height
    borderRadius: 20, // Keeps it circular
    backgroundColor: "rgba(220, 134, 154, 0.5)", // Light pink background
    alignItems: "center", // Centers text horizontally
    justifyContent: "center", // Centers text vertically
    borderWidth: 2, // Adds a border
    borderColor: "#000", // Border color
  },

  profileText: {
    fontSize: 20, // Smaller font size
    fontWeight: "bold", // Ensures bold text
    color: "#000", // Text color
    textAlign: "center", // Ensures text is centered horizontally
  },

  emptyText: {
    fontSize: 16,
    marginBottom: 50,
    marginTop: 30,
    fontFamily: "LexendDeca",
  },

  searchContainer: {
    margin: 10,
    backgroundColor: "#F5F0E8", // Match the container background color
    borderRadius: 10,
    padding: 5,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F0E8", // Match the container background color
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#000", // Black border for the box
    paddingHorizontal: 15,
    paddingVertical: 8,
    shadowColor: "transparent", // Remove shadow for seamless integration
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0, // Remove elevation on Android
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333", // Dark gray text color
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: "LexendDeca",
  },

  searchIcon: {
    width: 20, // Adjust width for the search icon
    height: 20, // Adjust height for the search icon
    marginRight: 10, // Add spacing between the icon and input field
    tintColor: "#000", // Set the icon color to black
  },

  clearButton: {
    fontSize: 24, // Make the "×" larger
    color: "#000", // Set color to black
    marginLeft: 10, // Add spacing from the text input
  },

  // Styles for the dropdown container
  resultsContainer: {
    marginTop: 10,
    backgroundColor: "#F5F0E8", // Match the container background color
    borderRadius: 15, // Rounded corners for the dropdown
    maxHeight: 250, // Limit the height of the dropdown
    overflow: "hidden", // Prevent overflow of items
    paddingVertical: 10, // Add padding inside the dropdown
    flex: 1, // Allow the container to grow and fill available space
    padding: 10, // Optional: Add some padding
  },

  // Styles for each dropdown item
  resultItem: {
    padding: 12, // Padding inside each item
    marginHorizontal: 10, // Spacing on the sides
    marginVertical: 5, // Space between items
    borderRadius: 15, // Rounded corners for each item
    borderColor: "#000",
    backgroundColor: "#DC869A", // Light pink background for items
    shadowColor: "#000", // Shadow for items
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2, // Slight elevation for floating effect
    borderWidth: 2,
    borderColor: "#000", // Black border for the box
  },

  // Styles for text inside each dropdown item
  resultText: {
    fontSize: 16, // Font size for text
    color: "#FFF", // White text
    fontFamily: "LexendDeca", // Custom font for better aesthetics
    fontWeight: "600", // Slightly bold for emphasis
    textAlign: "left", // Center-align text
  },
  noResultsText: {
    padding: 15,
    textAlign: "center",
    color: "#999", // Light gray text for "No Results"
    fontSize: 14,
    fontFamily: "LexendDeca",
  },

  closeButton: {
    fontSize: 18,
    color: "#999",
    padding: 10,
    fontWeight: "bold",
  },

  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  titleText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#DB71AA",
    textAlign: "center",
    fontFamily: "Gentium Bold",
  },
  shelf: {
    width: 300,
    height: 200,
    resizeMode: "contain",
    marginVertical: 10,
  },
  quote: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#DB71AA",
    textAlign: "center",
    fontFamily: "GentiumPlus-Italic",
  },

  // Dos and Donts
  dosAndDontsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    width: "100%", // Full width
    alignSelf: "center", // Center the container
    paddingHorizontal: 10, // Add horizontal padding
  },

  dosColumn: {
    flex: 1,
    marginRight: 5,
    alignItems: "flex-start", // Align content to the left
  },

  dontsColumn: {
    flex: 1,
    marginLeft: 5,
    alignItems: "flex-start", // Align content to the left
  },

  dosHeader: {
    fontFamily: "LexendDeca",
    fontSize: 20,
    color: "#1FACF1",
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
    left: 20,
  },

  dontsHeader: {
    fontFamily: "LexendDeca",
    fontSize: 20,
    color: "#D25E21",
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
    right: -10,
  },

  dosItem: {
    flexDirection: "row", // Row layout for image and text
    alignItems: "center", // Vertically center image and text
    backgroundColor: "#9AD6F4", // Light blue background for Do's
    borderRadius: 30,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#000", // Black border
    width: "100%", // Full width
  },

  dontsItem: {
    flexDirection: "row", // Row layout for image and text
    alignItems: "center", // Vertically center image and text
    backgroundColor: "#EAA987", // Light orange background for Don'ts
    borderRadius: 30,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#000", // Black border
    width: "100%", // Full width
  },

  dosImage: {
    width: 30,
    height: 30,
    marginRight: 10, // Space between the image and text
    resizeMode: "contain", // Properly scale the image
  },

  dontsImage: {
    width: 30,
    height: 30,
    marginRight: 10, // Space between the image and text
    resizeMode: "contain", // Properly scale the image
  },

  dosText: {
    fontFamily: "LexendDeca",
    fontSize: 16,
    color: "#1FACF1",
    flexShrink: 1, // Prevent text overflow
  },

  dontsText: {
    fontFamily: "LexendDeca",
    fontSize: 16,
    color: "#D25E21",
    flexShrink: 1, // Prevent text overflow
  },

  pastEntries: {
    marginTop: 30,
  },
  pastEntriesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D3557",
    marginBottom: 10,
    fontFamily: "LexendDeca",
  },

  entryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 60,
    marginTop: 20,
  },

  entryButton: {
    backgroundColor: "#A4A4E0",
    borderRadius: 10, // Rounded corners
    padding: 20,
    marginBottom: 10,
    width: "48%", // Adjust width for two buttons per row
    alignItems: "center", // Center align text
    borderColor: "black", // Add black border color
    borderWidth: 2, // Ensure consistent border
  },

  entryText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    fontFamily: "LexendDeca",
    textAlign: "center",
  },

  dateText: {
    color: "#FFD700",
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: "LexendDeca",
    transform: "skewX(-20deg)",
  },

  cat: {
    position: "absolute",
    top: -120,
    left: 10,
    width: 200,
    height: 200,
    zIndex: 4,
    resizeMode: "contain",
  },

  createEntryContainer: {
    marginTop: 40,
    width: "100%", // Increase the width to make it wider
    backgroundColor: "#FFCA6E",
    borderRadius: 15,
    paddingVertical: 5, // Reduce padding to make it shorter
    marginBottom: 70,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Adds shadow for Android
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 2,
    flexDirection: "column", // Ensure items are stacked vertically
  },

  createEntryText: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 20,
    textAlign: "Left",
    fontFamily: "LexendDeca",
  },

  // New style for container holding the button and crane image
  buttonAndCraneContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "75%",
    marginTop: 10,
  },

  crane: {
    width: 50, // Adjusted width to fit within the container
    height: 100, // Adjusted height to fit within the container
    resizeMode: "contain",
    marginLeft: 10, // Adds space between the crane and button
  },

  addButton: {
    textAlign: "Left",
    backgroundColor: "#F8C100",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 50,
    marginRight: 5, // Space between the button and crane
    borderColor: "000000",
    borderWidth: 2,
  },

  addButtonText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    fontFamily: "LexendDeca",
  },

  crane: {
    width: 150, // Adjusted width to fit within the container
    height: 150, // Adjusted height to fit within the container
    resizeMode: "contain",
  },

  // Modal Overlay 1
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },

  modalContent: {
    flex: 1, // Allow it to grow to fill available space
    height: "90%", // Cover only about one-third of the screen
    backgroundColor: "rgba(1, 12, 75, 1)", // Darker background
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },

  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 30,
    color: "#FFF",
  },

  modalDateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
    alignSelf: "flex-start",
    marginBottom: 20,
    marginTop: 20,
    fontFamily: "LexendDeca",
    transform: "skewX(-20deg)",
  },

  modalDateWrapper: {
    width: "100%",
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#000000",
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    // Shadow properties for iOS
    shadowColor: "#00000",
    shadowOffset: { width: 6, height: 6 }, // Adjust for horizontal and vertical shadow offset
    shadowOpacity: 1, // Fully opaque shadow
    shadowRadius: 6,
    // Shadow for Android
    elevation: 10,
    marginBottom: 50,
  },

  modalDate: {
    height: "10",
    color: "#FFD700",
    borderRadius: 7, // Smaller border radius to stay within wrapper's rounded edges
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center", // Center text vertically
    paddingVertical: 0, // Minimize padding
    marginVertical: "auto", // Center content vertically within the wrapper
    backgroundColor: "transparent",
    fontFamily: "LexendDeca",
    transform: "skewX(-20deg)",
  },

  modalJournalName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    alignSelf: "flex-start",
    marginBottom: 30,
  },

  modalJournalNameDescription: {
    fontSize: 14,
    color: "#FFF",
    alignSelf: "flex-start",
    transform: [{ skewX: "-10deg" }],
    marginBottom: 25,
    fontFamily: "LexendDeca",
  },

  journalName: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    color: "#E8B72F",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 3,
    borderColor: "#000000",
    marginBottom: 20,
    height: 240,
    // Shadow properties for border effect
    textShadowColor: "#000", // Shadow color for border
    textShadowOffset: { width: -1, height: 1 }, // Adjust to position the shadow
    textShadowRadius: 2, // Adjust for thickness
  },

  continueButton: {
    backgroundColor: "rgba(0, 5, 34, 0.85)",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 30,
    width: "100%",
    alignItems: "center",
    shadowColor: "#00000",
    shadowOpacity: 0.5, // Fully opaque shadow
    shadowRadius: 4,
    marginTop: 20,
  },
  continueButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "LexendDeca",
  },

  saveChangesButton: {
    backgroundColor: "#DC869A",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 40,
    width: "100%",
    alignItems: "center",
    shadowColor: "#00000",
    shadowOpacity: 0.5, // Fully opaque shadow
    shadowRadius: 4,
  },

  // Second Modal Styles
  journalOptionsContainer: {
    flex: 1,
    paddingBottom: 40, // Added padding to bring options lower
  },

  modalSelectTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
    marginTop: 20,
    textAlign: "left",
    fontFamily: "LexendDeca",
  },
  modalSelectTitleDescription: {
    fontSize: 14,
    fontWeight: "300",
    color: "#FFF",
    marginBottom: 40,
    textAlign: "left",
    transform: [{ skewX: "-10deg" }],
    fontFamily: "LexendDeca",
  },

  journalOptionContainer: {
    flex: 1,
    width: "100%",
    height: 200, // Adjust height for the button
    marginBottom: 30,
    borderRadius: 30, // For rounded corners
    overflow: "hidden", // Ensures the image doesn't overflow the container
    borderWidth: 4,
    borderColor: "#F5F0E8",
    overflow: "hidden", // Ensures the image doesn't overflow the container
  },

  journalOptionImageBackground: {
    flex: 1, // Make the background fill the entire container
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },

  imageStyle: {
    borderRadius: 20, // Match container's border radius
  },

  optionTitle: {
    color: "#000",
    fontSize: 30,
    fontWeight: "500",
    fontFamily: "LexendDeca",
  },
  optionDescription: {
    color: "#000",
    fontSize: 14,
    fontWeight: "300",
    marginTop: 5,
    fontFamily: "LexendDeca",
  },

  // Modal Title and Subtitle
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    borderWeight: 2,
    color: "#FFFFFF", // White text for title
    marginTop: 20,
    marginBottom: 30,
    alignSelf: "flex-start",
    fontFamily: "LexendDeca",
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#00000", // Light gray subtitle
    marginTop: 5,
    marginBottom: 20,
    alignSelf: "flex-start",
    fontFamily: "LexendDeca",
  },

  imageBackground: {
    flex: 1, // Ensure the image covers the entire button area
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
    paddingVertical: 15, // Add vertical padding for the content
    paddingHorizontal: 25, // Add horizontal padding for the content
  },

  journalSubtitle: {
    fontSize: 18,
    color: "#E8B72F",
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "LexendDeca",
  },

  textBoxTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    marginTop: 5,
    marginBottom: 5,
    alignSelf: "flex-start",
    flexWrap: "wrap", // Ensures long text wraps
    width: "100%", // Takes full width of container
    lineHeight: 24, // Adjust for readability
    fontFamily: "LexendDeca",
    marginBottom: 20,
  },

  titleInputBox: {
    height: 50, // Smaller height for title input
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    color: "#000", // Black text color
    marginBottom: 20,
    fontSize: 18,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },

  // Suggested Prompts Container
  suggestedPromptsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  suggestedPromptsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    fontFamily: "LexendDeca",
    marginBottom: 10,
  },
  suggestedPromptText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
    fontFamily: "LexendDeca",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "left",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 10,
  },

  // Text Input Box
  textInputBox: {
    width: "100%",
    minHeight: 300, // Minimum height for the box
    maxHeight: 200, // Optional: Maximum height for scrolling
    backgroundColor: "#FFFFFF", // White background
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000000", // Black border
    padding: 10,
    fontSize: 16,
    color: "#000000",
    marginBottom: 20,
    textAlignVertical: "top", // Align text to the top-left
  },

  textInputBoxWriteFreely: {
    width: "100%",
    minHeight: 400, // Minimum height for the box
    maxHeight: 200, // Optional: Maximum height for scrolling
    backgroundColor: "#FFFFFF", // White background
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000000", // Black border
    padding: 10,
    fontSize: 16,
    color: "#000000",
    textAlignVertical: "top", // Align text to the top-left
    marginBottom: 20,
  },

  textBoxPlaceholder: {
    fontSize: 16,
    color: "black", // Black text
    textAlign: "center",
  },

  scrollContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  readOnlyText: {
    fontSize: 16,
    color: "#fff", // Match the modal's theme
    marginVertical: 10,
    lineHeight: 22,
  },
  modalViewText: {
    fontSize: 16, // Adjust font size for better readability
    color: "#FFFFFF", // Change color for better contrast
    lineHeight: 24, // Increase line height for readability
    textAlign: "left", // Align the text to the left
    marginBottom: 10, // Add some spacing below the text
    fontFamily: "LexendDeca", // Use a readable and consistent font
  },

  modalDateText: {
    fontSize: 16, // Adjust font size for better readability
    color: "#FFD700",
    lineHeight: 24, // Increase line height for readability
    textAlign: "left", // Align the text to the left
    marginBottom: 10, // Add some spacing below the text
    fontFamily: "LexendDeca", // Use a readable and consistent font
    transform: "skewX(-20deg)",
  },

  // Add this style for the button container
  buttonContainer: {
    flexDirection: "row", // Arrange buttons in a row
    justifyContent: "space-between", // Add spacing between buttons
    alignItems: "center", // Align buttons vertically
    marginTop: 30, // Adjust top margin for the whole container
    width: "100%",
    paddingHorizontal: 20, // Add horizontal padding
    marginBottom: 40,
  },

  editButton: {
    backgroundColor: "black",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "30%", // Reduce width to fit horizontally
    alignItems: "center",
    borderWidth: 3,
  },
  deleteButton: {
    backgroundColor: "black",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "30%", // Same width as the edit button
    alignItems: "center",
    borderWidth: 3,
  },
  analysisButton: {
    backgroundColor: "black",
    borderWidth: 3,
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "30%", // Same as edit and delete
    alignItems: "center",
  },
  scrollContentView: {
    flex: 1,
    marginTop: 30,
    marginBottom: 80, // Leave space for the fixed buttons
  },
  fixedButtonsContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 30,
  },

  promptResponseContainer: {
    marginBottom: 15, // Add spacing between prompt-response pairs
    backgroundColor: "#f9f9f9", // Background color for each pair
    padding: 10, // Add padding inside the container
    borderRadius: 8, // Rounded corners
    borderWidth: 1, // Optional: add a border
    borderColor: "#ddd", // Optional: border color
  },

  responseText: {
    fontSize: 16, // Font size for responses
    color: "#555", // Text color for responses
    lineHeight: 20, // Increase line spacing for better readability
  },
  promptContainer: {
    marginBottom: 20,
  },
  responseBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginTop: 5,
  },
});

export default styles;
