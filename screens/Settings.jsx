import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signOut, onAuthStateChanged } from "firebase/auth"; // Import signOut and onAuthStateChanged
import { auth } from "../components/firebase"; // Import Firebase auth instance
import Header from "../components/Header"; // Import the reusable Header component
import SettingsStyles from "../styles/SettingsStyles"; // Import styles

const Settings = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  // Fetch user details from Firebase Authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state with the authenticated user
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      Alert.alert("Logged out", "You have been successfully logged out.");
      navigation.replace("Login"); // Navigate back to the login screen
    } catch (error) {
      console.error("Logout Error:", error.message);
      Alert.alert("Logout Failed", "An error occurred while logging out.");
    }
  };

  return (
    <View style={SettingsStyles.container}>
      {/* Header */}
      <View style={SettingsStyles.headerContainer}>
        <Header />
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={SettingsStyles.scrollView}>
        {/* Title */}
        <Text style={SettingsStyles.settingsTitle}>Settings</Text>

        {/* Profile Info */}
        <View style={SettingsStyles.profileContainer}>
          <View style={SettingsStyles.avatarContainer}>
            <Text style={SettingsStyles.avatarText}>
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "N"}
            </Text>
          </View>
          <Text style={SettingsStyles.fullName}>
            {user?.displayName || "Full Name"}
          </Text>
          <Text style={SettingsStyles.email}>{user?.email || "useremail@gmail.com"}</Text>
        </View>

        {/* Settings Options */}
        <View style={SettingsStyles.settingOption}>
          <Text style={SettingsStyles.settingLabel}>Name</Text>
          <Text style={SettingsStyles.settingValue}>{user?.displayName || "Full Name"}</Text>
        </View>
        <View style={SettingsStyles.settingOption}>
          <Text style={SettingsStyles.settingLabel}>Email</Text>
          <Text style={SettingsStyles.settingValue}>{user?.email || "useremail@gmail.com"}</Text>
        </View>
        <View style={SettingsStyles.settingOption}>
          <Text style={SettingsStyles.settingLabel}>Password</Text>
          <Text style={SettingsStyles.arrow}>&gt;</Text>
        </View>

        {/* Plant Image */}
        <Image source={require("../assets/plant.png")} style={SettingsStyles.plantImage} />


        {/* Logout Button */}
        <TouchableOpacity style={SettingsStyles.logoutButton} onPress={handleLogout}>
          <Text style={SettingsStyles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Settings;
