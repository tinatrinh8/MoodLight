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
  },
  settingsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#DC869A", // Match accent color
    textAlign: "center",
    marginVertical: 15,
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
  },
  fullName: {
    color: "#000000",
    fontSize: 16,
    marginTop: 10,
    fontWeight: "600",
  },
  email: {
    color: "rgba(0, 0, 0, 0.5)", // Grey text for email
    fontSize: 14,
    marginTop: 5,
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
  },
  settingValue: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.5)", // Grey text for values
  },
  arrow: {
    color: "rgba(0, 0, 0, 0.5)", // Grey arrow
    fontSize: 22,
  },
  plantImage: {
    width: 180,
    height: 180,
  },
  logoutButton: {
    marginTop: 10,
    width: 223,
    borderRadius: 20,
    backgroundColor: "#FFFFFF", // White button
    borderWidth: 2,
    borderColor: "#000000", // Black border
    paddingVertical: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#000", // Black text for logout
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
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#DC869A",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#260101",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SettingsStyles;
