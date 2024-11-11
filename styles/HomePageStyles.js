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
    width: 40,
    height: 40,
    borderRadius: 45,
    backgroundColor: "rgba(220, 134, 154, 0.5)", // Light pink background
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000", // Black border
  },
  profileText: {
    fontSize: 30,
    color: "#000000", // Black color for the avatar initial
    fontWeight: "bold",
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
    width: "48%",
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.75,
    shadowRadius: 6,
    elevation: 10,
  },

  entryText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    fontFamily: "LexendDeca",
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
    width: "100%",
    backgroundColor: "#FFCA6E",
    borderRadius: 15,
    paddingVertical: 10, // Reduced padding to make it shorter
    marginBottom: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.99,
    shadowRadius: 6,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  createEntryText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFF",
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

  addButton: {
    backgroundColor: "#F8C100",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginRight: 10, // Space between the button and crane
  },

  addButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    fontFamily: "LexendDeca",
  },

  crane: {
    width: 130,
    height: 130,
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
    color: '#E8B72F',
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
});

export default styles;
