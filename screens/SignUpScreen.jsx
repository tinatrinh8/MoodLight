import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../components/firebase"; // Import Firebase auth and Firestore


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

    // Update the user's displayName in Firebase Authentication
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
    <View style={styles.screenContainer}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Start your journey. Track your mood.
        </Text>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#FFFFFF"
            value={name}
            onChangeText={setName} // Update name state
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#FFFFFF"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail} // Update email state
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#FFFFFF"
            secureTextEntry
            value={password}
            onChangeText={setPassword} // Update password state
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor="#FFFFFF"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword} // Update confirmPassword state
          />
        </View>
      </View>

      {/* Button Section */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Footer Section */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#282e45", // Solid background color
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    fontFamily: "Gentium BoldItalic",
    fontSize: 36,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 15,
    fontFamily: "Gilda Display",
    fontSize: 12,
    color: "rgba(243, 192, 24, 1)",
    fontWeight: "400",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderRadius: 20,
    minHeight: 60,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#000000",
    color: "#FFFFFF",
  },
  signUpButton: {
    backgroundColor: "rgba(60, 90, 127, 1)",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: "center",
    marginBottom: 25,
  },
  signUpButtonText: {
    fontFamily: "Gentium Basic",
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
  },
  footerText: {
    fontFamily: "Gentium Basic",
    fontSize: 14,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "400",
    marginRight: 10,
  },
  loginLink: {
    fontFamily: "Gentium Basic",
    fontSize: 13,
    color: "rgba(243, 192, 24, 1)",
    fontWeight: "700",
  },
});

export default SignUpScreen;
