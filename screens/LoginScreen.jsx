import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../components/firebase"; // Import Firebase auth and Firestore

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
    <View style={styles.screenContainer}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.descriptionText}>
          Track moods, reveal patterns, embrace balance.
        </Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#FFFFFF"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail} // Update email state
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#FFFFFF"
          secureTextEntry
          value={password}
          onChangeText={setPassword} // Update password state
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin} // Call the login handler
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.accountText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#282e45',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
  },
  descriptionText: {
    marginTop: 15,
    fontSize: 12,
    color: 'rgba(255, 140, 171, 1)',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 25,
  },
  input: {
    borderRadius: 20,
    minHeight: 60,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#000000',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'rgba(60, 90, 127, 1)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
  },
  accountText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginRight: 10,
  },

  signUpText: {
    color: 'rgba(255, 140, 171, 1)',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default LoginScreen;
