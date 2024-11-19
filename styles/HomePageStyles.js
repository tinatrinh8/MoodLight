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
    fontFamily: "LexendDeca",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  closeButton: {
    fontSize: 18,
    color: "#999",
    padding: 10,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1D3557",
    textAlign: "center",
    fontFamily: "LexendDeca",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    color: "#1D3557",
    marginBottom: 10,
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
    color: "#A8DADC",
    textAlign: "center",
    fontFamily: "GentiumPlus-Italic",
  },
  pastEntries: {
    marginTop: 20,
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
    backgroundColor: "#DC869A", // Pink button color
    borderRadius: 10, // Rounded corners
    padding: 15,
    marginBottom: 10,
    width: "48%", // Adjust width for two buttons per row
    alignItems: "center", // Center align text
  },

  entryText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    fontFamily: "LexendDeca",
  },

  dateText: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 5,
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
    width: "90%",
    backgroundColor: "#FFCA6E",
    borderRadius: 15,
    paddingVertical: 5, // Reduce padding to make it shorter
    marginBottom: 70,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.99,
    shadowRadius: 6,
    elevation: 10,
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
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginRight: 5, // Space between the button and crane
    borderColor: "000000",
    borderWidth: 2,
  },

  addButtonText: {
    fontSize: 18,
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
    height: "90%", // Cover only about one-third of the screen
    backgroundColor: "rgba(1, 12, 75, 1)", // Darker background
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },

  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
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
    marginTop: 50,
    width: "100%",
    alignItems: "center",
    shadowColor: "#00000",
    shadowOpacity: 0.5, // Fully opaque shadow
    shadowRadius: 4,
  },
  continueButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },

    saveChangesButton: {
      backgroundColor: "#DC869A",
      borderRadius: 50,
      paddingVertical: 15,
      paddingHorizontal: 30,
      marginTop: 50,
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
  },
  modalSelectTitleDescription: {
    fontSize: 14,
    fontWeight: "300",
    color: "#FFF",
    marginBottom: 40,
    textAlign: "left",
    transform: [{ skewX: "-10deg" }],
  },
  journalOption: {
    width: "100%",
    borderRadius: 30, // Increased border radius for a more rounded button
    borderColor: "#000",
    borderWidth: 4,
    backgroundColor: "#E8B72F", // Gold background for option
    paddingVertical: 60, // Increased vertical padding for larger button height
    paddingHorizontal: 25, // Increased horizontal padding for larger button width
    marginBottom: 70, // Added extra margin for spacing between buttons
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionTitle: {
    color: "#000",
    fontSize: 24,
    fontWeight: "500",
  },
  optionDescription: {
    color: "#000",
    fontSize: 14,
    fontWeight: "300",
    marginTop: 5,
  },
  // Modal Title and Subtitle
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF", // White text for title
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#787392", // Light gray subtitle
    marginTop: 5,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  journalSubtitle: {
    fontSize: 18,
    color: "#E8B72F",
    marginTop: 10,
    marginBottom: 10,
  },

  textBoxTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    marginTop: 5,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  titleInputBox: {
    height: 40, // Smaller height for title input
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    color: "#000", // Black text color
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },

  // Text Input Box
  textInputBox: {
    width: "100%",
    height: 150, // Adjust height as needed
    backgroundColor: "#FFFFFF", // White background
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000000", // Black border
    padding: 10, // Add padding for user input
    fontSize: 16, // Font size for user text
    color: "#000000", // Black text
    marginBottom: 20,
    textAlignVertical: "top", // Align text to the top-left
  },
  textBoxPlaceholder: {
    fontSize: 16,
    color: "#000000", // Black text
    textAlign: "center",
  },

  scrollContent: {
    paddingBottom: 20, // Adjust padding to prevent content from getting cut off
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
    },
// Add this style for the button container
buttonContainer: {
  flexDirection: "row", // Arrange buttons in a row
  justifyContent: "space-between", // Add spacing between buttons
  alignItems: "center", // Align buttons vertically
  marginTop: 20, // Adjust top margin for the whole container
  width: "100%",
  paddingHorizontal: 20, // Add horizontal padding
},

editButton: {
  backgroundColor: "#DC869A",
  borderRadius: 50,
  paddingVertical: 15,
  paddingHorizontal: 10,
  width: "30%", // Reduce width to fit horizontally
  alignItems: "center",
  shadowColor: "#00000",
  shadowOpacity: 0.5,
  shadowRadius: 4,
},
deleteButton: {
  backgroundColor: "rgba(0, 5, 34, 0.85)",
  borderRadius: 50,
  paddingVertical: 15,
  paddingHorizontal: 10,
  width: "30%", // Same width as the edit button
  alignItems: "center",
  shadowColor: "#00000",
  shadowOpacity: 0.5,
  shadowRadius: 4,
},
analysisButton: {
  backgroundColor: "#8FCACA",
  borderRadius: 50,
  paddingVertical: 15,
  paddingHorizontal: 10,
  width: "30%", // Same as edit and delete
  alignItems: "center",
  shadowColor: "#00000",
  shadowOpacity: 0.5,
  shadowRadius: 4,
},
scrollContentView: {
  flex: 1,
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
