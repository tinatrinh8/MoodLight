import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../components/firebase"; // Import Firebase auth and Firestore
import { doc, setDoc } from "firebase/firestore"; // For Firestore
import SignUpScreenStyles from "../styles/SignUpScreenStyles"; // Import styles

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState(""); // State for the user's name (optional)
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming the password

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !name) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's displayName
      await updateProfile(user, {
        displayName: name,
      });

      // Optional: Store user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Account created successfully!");
      navigation.replace("MainTabs"); // Navigate to MainTabs
    } catch (error) {
      console.error("Sign Up Error:", error.message);
      Alert.alert("Sign Up Error", error.message); // Show error to the user
    }
  };

  return (
    <View style={SignUpScreenStyles.screenContainer}>
      {/* Header Section */}
      <View style={SignUpScreenStyles.headerContainer}>
        <Text style={SignUpScreenStyles.title}>Create Account</Text>
        <Text style={SignUpScreenStyles.subtitle}>
          Start your journey. Track your mood.
        </Text>
      </View>

      {/* Form Section */}
      <View style={SignUpScreenStyles.formContainer}>
        <View style={SignUpScreenStyles.inputContainer}>
          <TextInput
            style={SignUpScreenStyles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#FFFFFF"
            value={name}
            onChangeText={setName} // Update name state
          />
        </View>
        <View style={SignUpScreenStyles.inputContainer}>
          <TextInput
            style={SignUpScreenStyles.input}
            placeholder="Enter your email"
            placeholderTextColor="#FFFFFF"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail} // Update email state
          />
        </View>
        <View style={SignUpScreenStyles.inputContainer}>
          <TextInput
            style={SignUpScreenStyles.input}
            placeholder="Enter your password"
            placeholderTextColor="#FFFFFF"
            secureTextEntry
            value={password}
            onChangeText={setPassword} // Update password state
          />
        </View>
        <View style={SignUpScreenStyles.inputContainer}>
          <TextInput
            style={SignUpScreenStyles.input}
            placeholder="Confirm your password"
            placeholderTextColor="#FFFFFF"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword} // Update confirmPassword state
          />
        </View>
      </View>

      {/* Button Section */}
      <TouchableOpacity style={SignUpScreenStyles.signUpButton} onPress={handleSignUp}>
        <Text style={SignUpScreenStyles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Footer Section */}
      <View style={SignUpScreenStyles.footerContainer}>
        <Text style={SignUpScreenStyles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={SignUpScreenStyles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;
