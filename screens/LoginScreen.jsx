import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../components/firebase"; // Import Firebase auth and Firestore
import LoginScreenStyles from "../styles/LoginScreenStyles"; // Import styles

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(""); // State to hold email input
  const [password, setPassword] = useState(""); // State to hold password input

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      navigation.navigate("MainTabs"); // Navigate to the main app screen
    } catch (error) {
      console.error("Login failed:", error.message);
      Alert.alert("Login Error", error.message); // Show error message to the user
    }
  };

  return (
    <View style={LoginScreenStyles.screenContainer}>
      <View style={LoginScreenStyles.welcomeContainer}>
        <Text style={LoginScreenStyles.welcomeText}>Welcome</Text>
        <Text style={LoginScreenStyles.descriptionText}>
          Track moods, reveal patterns, embrace balance.
        </Text>
      </View>
      <View style={LoginScreenStyles.formContainer}>
        <TextInput
          style={LoginScreenStyles.input}
          placeholder="Enter your email"
          placeholderTextColor="#FFFFFF"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail} // Update email state
        />
        <TextInput
          style={LoginScreenStyles.input}
          placeholder="Enter your password"
          placeholderTextColor="#FFFFFF"
          secureTextEntry
          value={password}
          onChangeText={setPassword} // Update password state
        />
        <TouchableOpacity
          style={LoginScreenStyles.loginButton}
          onPress={handleLogin} // Call the login handler
        >
          <Text style={LoginScreenStyles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={LoginScreenStyles.footerContainer}>
        <Text style={LoginScreenStyles.accountText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={LoginScreenStyles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
