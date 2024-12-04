import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Animated,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../components/firebase"; // Import Firebase auth and Firestore
import { doc, setDoc } from "firebase/firestore"; // For Firestore
import SignUpScreenStyles from "../styles/SignUpScreenStyles"; // Import styles
import LinearGradient from "react-native-linear-gradient";

const FadingBackground = ({ children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, // 2-second fade-in
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[SignUpScreenStyles.backgroundContainer, { opacity: fadeAnim }]}
    >
      {children}
    </Animated.View>
  );
};

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState(""); // State for the user's name (optional)
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming the password

  const backgroundAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(backgroundAnim, {
      toValue: 1, // Filled state
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(backgroundAnim, {
      toValue: 0, // Reset to border state
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const animatedBackgroundColor = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", "rgb(224, 188, 114)"], // Border color to filled color
  });

  const animatedTextColor = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(224, 188, 114)", "#FFFFFF"], // Text changes from border color to white
  });

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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
    <FadingBackground>
      <ImageBackground
        source={require("../assets/signupaura.png")}
        style={SignUpScreenStyles.backgroundImage}
      >
        <View style={SignUpScreenStyles.screenContainer}>
          {/* Header Section */}
          <View style={SignUpScreenStyles.headerContainer}>
            <Text style={SignUpScreenStyles.title}>Create Account</Text>
            <Text style={SignUpScreenStyles.subtitle}>
              Start your journey. Track your mood.
            </Text>
          </View>

          {/* Form Section */}
          <KeyboardAvoidingView
            style={SignUpScreenStyles.formContainer}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={SignUpScreenStyles.formContainer}>
              <View style={SignUpScreenStyles.inputContainer}>
                <TextInput
                  style={SignUpScreenStyles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="rgb(156, 31, 17)"
                  value={name}
                  onChangeText={setName} // Update name state
                />
              </View>
              <View style={SignUpScreenStyles.inputContainer}>
                <TextInput
                  style={SignUpScreenStyles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="rgb(156, 31, 17)"
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
                  placeholderTextColor="rgb(156, 31, 17)"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword} // Update password state
                />
              </View>
              <View style={SignUpScreenStyles.inputContainer}>
                <TextInput
                  style={SignUpScreenStyles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor="rgb(156, 31, 17)"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword} // Update confirmPassword state
                />
              </View>
            </View>
          </KeyboardAvoidingView>

          {/* Sign-Up Button */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleSignUp}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Animated.View
              style={[
                SignUpScreenStyles.signUpButton,
                { backgroundColor: animatedBackgroundColor },
              ]}
            >
              <Animated.Text
                style={[
                  SignUpScreenStyles.signUpButtonText,
                  { color: animatedTextColor },
                ]}
              >
                Sign Up
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>

          {/* Footer Section */}
          <View style={SignUpScreenStyles.footerContainer}>
            <Text style={SignUpScreenStyles.footerText}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={SignUpScreenStyles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </FadingBackground>
  );
};

export default SignUpScreen;
