import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const SignUpScreen = ({ navigation }) => {
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
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="rgba(60, 90, 127, 0.5)"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="rgba(60, 90, 127, 0.5)"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="rgba(60, 90, 127, 0.5)"
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor="rgba(60, 90, 127, 0.5)"
            secureTextEntry
          />
        </View>
      </View>

      {/* Button Section */}
      <TouchableOpacity style={styles.signUpButton}>
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
