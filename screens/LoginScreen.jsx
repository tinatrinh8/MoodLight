import React, { useState, useRef, useEffect } from "react"; // Added useEffect
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase"; // Import Firebase auth
import LoginScreenStyles from "../styles/LoginScreenStyles"; // Import styles
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
      style={[LoginScreenStyles.backgroundContainer, { opacity: fadeAnim }]}
    >
      {children}
    </Animated.View>
  );
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(""); // State to hold email input
  const [password, setPassword] = useState(""); // State to hold password input
  const backgroundAnim = useRef(new Animated.Value(0)).current; // Animation value for button

  const handlePressIn = () => {
    Animated.timing(backgroundAnim, {
      toValue: 1, // Filled color state
      duration: 300,
      useNativeDriver: false, // Needed for backgroundColor
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(backgroundAnim, {
      toValue: 0, // Reset to border state
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

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
      Alert.alert("Login Error", "Incorrect username or password"); // Show error message to the user
    }
  };

  const animatedBackgroundColor = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", "rgb(214, 73, 60)"], // Border color to filled color
  });

  const animatedTextColor = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(214, 73, 60)", "#FFFFFF"], // Text changes from border color to white
  });

  return (
    <FadingBackground>
      <ImageBackground
        source={require("../assets/loginaura.jpg")} // Ensure the correct path
        style={LoginScreenStyles.backgroundImage}
      >
        <View style={LoginScreenStyles.screenContainer}>
          {/* Welcome and Login Form */}
          <View style={LoginScreenStyles.welcomeContainer}>
            <Text style={LoginScreenStyles.welcomeText}>Welcome</Text>
            <Text style={LoginScreenStyles.descriptionText}>
              Track moods, reveal patterns, embrace balance.
            </Text>
          </View>

          <KeyboardAvoidingView
            style={LoginScreenStyles.formContainer}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <TextInput
                  style={LoginScreenStyles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="rgb(0, 96, 161)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail} // Update email state
                />
                <TextInput
                  style={LoginScreenStyles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="rgb(0, 96, 161)"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword} // Update password state
                />
                <TouchableOpacity
                  activeOpacity={1} // Prevent fading on press
                  onPress={handleLogin} // Call the login handler
                  onPressIn={handlePressIn} // Start fill animation
                  onPressOut={handlePressOut} // Reset fill animation
                >
                  <Animated.View
                    style={[
                      LoginScreenStyles.loginButton,
                      { backgroundColor: animatedBackgroundColor }, // Animate background
                    ]}
                  >
                    <Animated.Text
                      style={[
                        LoginScreenStyles.loginButtonText,
                        { color: animatedTextColor }, // Animate text color
                      ]}
                    >
                      Login
                    </Animated.Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          <View style={LoginScreenStyles.footerContainer}>
            <Text style={LoginScreenStyles.accountText}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={LoginScreenStyles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </FadingBackground>
  );
};

export default LoginScreen;
