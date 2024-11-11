import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header"; // Import the reusable Header component

const Settings = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate("LoginScreen"); // Navigate to LoginScreen
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Header />
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Title */}
        <Text style={styles.settingsTitle}>Settings</Text>

        {/* Profile Info */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>N</Text>
          </View>
          <Text style={styles.fullName}>Full Name</Text>
          <Text style={styles.email}>useremail@gmail.com</Text>
        </View>

        {/* Settings Options */}
        <View style={styles.settingOption}>
          <Text style={styles.settingLabel}>Name</Text>
          <Text style={styles.settingValue}>Full Name</Text>
        </View>
        <View style={styles.settingOption}>
          <Text style={styles.settingLabel}>Email</Text>
          <Text style={styles.settingValue}>useremail@gmail.com</Text>
        </View>
        <View style={styles.settingOption}>
          <Text style={styles.settingLabel}>Password</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </View>

        {/* Plant Image */}
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/f6d899c5e33ea9e640e83f383a62395abea11f257580d443551e26ee043fc0ee?placeholderIfAbsent=true&apiKey=9b7049a43e3e43878b092197a2e985ba",
          }}
          style={styles.plantImage}
          resizeMode="contain"
        />

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderColor: "#000000", // White border
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
    borderColor: "#000", // Black border
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#000", // Black text for logout
  },
});

export default Settings;
