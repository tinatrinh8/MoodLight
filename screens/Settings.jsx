import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  signOut,
  onAuthStateChanged,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../components/firebase"; // Import Firebase auth instance
import Header from "../components/Header"; // Import the reusable Header component
import SettingsStyles from "../styles/SettingsStyles"; // Import styles
import { CommonActions } from "@react-navigation/native";
import FastImage from "react-native-fast-image";

const Settings = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(true); // New loading state

  // Fetch user details from Firebase Authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user only if authenticated
    });

    return () => unsubscribe();
  }, []);

  // Redirect to Login if user is not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigation.navigate("Login");
    }
  }, [loading, user]);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      Alert.alert("Logged out", "You have been successfully logged out.");
      // Reset navigation stack to Login screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } catch (error) {
      // Suppress the error silently without showing or logging it
      if (error.message.includes("User is not authenticated")) {
        console.log("Silent error during logout: User already logged out.");
      } else {
        console.error("Logout Error:", error.message);
        Alert.alert("Error", "An unexpected error occurred while logging out.");
      }
    }
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      // Reauthenticate the user
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update password
      await updatePassword(auth.currentUser, newPassword);
      Alert.alert("Success", "Your password has been updated.");
      setModalVisible(false);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Password Change Error:", error.message);
      Alert.alert(
        "Error",
        "Failed to update password. Check your credentials."
      );
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
        <Text style={SettingsStyles.settingsTitle}>Settings</Text>

        <View style={SettingsStyles.profileContainer}>
          <View style={SettingsStyles.avatarContainer}>
            <Text style={SettingsStyles.avatarText}>
              {user?.displayName
                ? user.displayName.charAt(0).toUpperCase()
                : "N"}
            </Text>
          </View>
          <Text style={SettingsStyles.fullName}>
            {user?.displayName || "Full Name"}
          </Text>
          <Text style={SettingsStyles.email}>
            {user?.email || "useremail@gmail.com"}
          </Text>
        </View>

        <View style={SettingsStyles.settingOption}>
          <Text style={SettingsStyles.settingLabel}>Name</Text>
          <Text style={SettingsStyles.settingValue}>
            {user?.displayName || "Full Name"}
          </Text>
        </View>
        <View style={SettingsStyles.settingOption}>
          <Text style={SettingsStyles.settingLabel}>Email</Text>
          <Text style={SettingsStyles.settingValue}>
            {user?.email || "useremail@gmail.com"}
          </Text>
        </View>
        <TouchableOpacity
          style={SettingsStyles.settingOption}
          onPress={() => setModalVisible(true)}
        >
          <Text style={SettingsStyles.settingLabel}>Password</Text>
          <Text style={SettingsStyles.arrow}>&gt;</Text>
        </TouchableOpacity>

        <Image
          source={require("../assets/cute.gif")} // Replace with GIF
          style={SettingsStyles.cute}
          resizeMode={FastImage.resizeMode.contain}
        />

        <TouchableOpacity
          style={SettingsStyles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={SettingsStyles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal for Changing Password */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={SettingsStyles.modalContainer}>
          <View style={SettingsStyles.modalContent}>
            <Text style={SettingsStyles.modalTitle}>Change Password</Text>
            <TextInput
              style={SettingsStyles.input}
              placeholder="Old Password"
              secureTextEntry
              value={oldPassword}
              placeholderTextColor="grey"
              onChangeText={setOldPassword}
            />
            <TextInput
              style={SettingsStyles.input}
              placeholder="New Password"
              placeholderTextColor="grey"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity
              style={SettingsStyles.saveButton}
              onPress={handlePasswordChange}
            >
              <Text style={SettingsStyles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={SettingsStyles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={SettingsStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Settings;
