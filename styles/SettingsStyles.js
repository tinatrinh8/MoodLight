import { StyleSheet } from "react-native";

const SettingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F0E8", // Light background color
  },
  headerContainer: {
    backgroundColor: "#F5F0E8", // Match header background to the screen
    paddingTop: 20, // Ensure consistent padding for the header
    zIndex: 1, // Keep the header on top
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center", // Center content horizontally
    flexGrow: 1, // Allows the ScrollView to expand
    paddingBottom: 50, // Add padding to account for navigation bar
  },
  settingsTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#DC869A", // Match accent color
    textAlign: "center",
    marginVertical: 15,
    fontFamily: "LexendDeca",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(220, 134, 154, 0.5)", // Light pink background
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000", // Black border
  },
  avatarText: {
    fontSize: 36,
    color: "#000000", // Black color for the avatar initial
    fontWeight: "bold",
    fontFamily: "LexendDeca",
  },
  fullName: {
    color: "#000000",
    fontSize: 16,
    marginTop: 10,
    fontWeight: "600",
    fontFamily: "LexendDeca",
  },
  email: {
    color: "rgba(0, 0, 0, 0.5)", // Grey text for email
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
  },
  settingOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF", // White background for options
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 2,
    borderColor: "#000000", // Black border
  },
  settingLabel: {
    fontSize: 16,
    color: "#000", // Black label
    fontWeight: "500",
    fontFamily: "LexendDeca",
  },
  settingValue: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.5)", // Grey text for values
    fontFamily: "LexendDeca",
  },
  arrow: {
    color: "rgba(0, 0, 0, 0.5)", // Grey arrow
    fontSize: 22,
    fontWeight: "700",
  },
  logoutButton: {
    marginTop: 15,
    marginBottom: 50,
    width: 223,
    borderRadius: 20,
    backgroundColor: "#FFFFFF", // White button
    borderWidth: 2,
    borderColor: "#000000", // Black border
    paddingVertical: 10,
    alignItems: "center", // Centers text horizontally
    justifyContent: "center", // Centers text verticall
    height: 60,
    weight: 40,
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#000", // Black text for logout
    textAlign: "center",
    fontFamily: "LexendDeca",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000", // Black border
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    fontFamily: "LexendDeca",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    color: "#000000",
    fontFamily: "LexendDeca",
  },
  saveButton: {
    backgroundColor: "#DC869A",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
    borderWidth: 2,
    borderColor: "#000000", // Black border
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "LexendDeca",
    transform: "skewX(-20deg)",
  },
  cancelButton: {
    backgroundColor: "#260101",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    borderWidth: 2,
    borderColor: "#000000", // Black border
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "LexendDeca",
    transform: "skewX(-20deg)",
  },
});

export default SettingsStyles;
