import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

// Welcome Section Component
const WelcomeSection = () => (
  <View style={styles.welcomeContainer}>
    <Text style={styles.welcomeText}>Welcome</Text>
    <Text style={styles.descriptionText}>
      Track moods, reveal patterns, embrace balance.
    </Text>
  </View>
);

// Login Form Component
const LoginForm = ({ navigation }) => (
  <View style={styles.formContainer}>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Your Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="rgba(60, 90, 127, 0.5)"
        accessibilityLabel="Enter your email"
      />
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="rgba(60, 90, 127, 0.5)"
        secureTextEntry
        accessibilityLabel="Enter your password"
      />
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.loginButton}
        accessibilityRole="button"
        onPress={() => navigation.replace("AppNavigation")} // Navigate to AppNavigation
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Footer Component
const Footer = ({ navigation }) => (
  <View style={styles.footerContainer}>
    <Text style={styles.accountText}>Don't have an account?</Text>
    <TouchableOpacity
      accessibilityRole="button"
      onPress={() => navigation.navigate("SignUp")} // Navigate to Sign Up screen
    >
      <Text style={styles.signUpText}>Sign Up</Text>
    </TouchableOpacity>
  </View>
);

// Inside LoginScreen.jsx
const handleLogin = () => {
  navigation.replace("AppNavigation");
};


// Main Login Screen Component
const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.screenContainer}>
      <WelcomeSection />
      <LoginForm navigation={navigation} />
      <Footer navigation={navigation} />
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
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  welcomeText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 36,
    fontFamily: "Gentium BoldItalic",
    fontWeight: "700",
  },
  descriptionText: {
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
  label: {
    fontFamily: "Gentium Basic",
    fontSize: 16,
    color: "rgba(60, 90, 127, 1)",
    fontWeight: "400",
    marginBottom: 5,
  },
  input: {
    borderRadius: 20,
    minHeight: 60,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "rgba(60, 90, 127, 1)",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  loginButton: {
    backgroundColor: "rgba(60, 90, 127, 1)",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  loginButtonText: {
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
  accountText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 14,
    fontFamily: "Gentium Basic",
    fontWeight: "400",
    marginRight: 10,
  },
  signUpText: {
    color: "rgba(255, 140, 171, 1)",
    fontSize: 13,
    fontFamily: "Gentium Basic",
    fontWeight: "700",
  },
});

export default LoginScreen;
