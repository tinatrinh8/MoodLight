import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./screens/Splash";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import TabNavigator from "./components/AppNavigation";
import { EntryDatesProvider } from "./components/EntryDatesContext"; // Import EntryDatesProvider
import HomePage from "./screens/HomePage";
import Analysis from "./screens/Analysis";
import { auth } from "./components/firebase";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        LexendDeca: require("./assets/fonts/LexendDeca-VariableFont_wght.ttf"),
        "Gentium Basic": require("./assets/fonts/GentiumPlus-Regular.ttf"),
        "Gentium Book Plus": require("./assets/fonts/GentiumPlus-Regular.ttf"),
        "Gentium Bold": require("./assets/fonts/GentiumPlus-Bold.ttf"),
        "GentiumPlus-Italic": require("./assets/fonts/GentiumPlus-Italic.ttf"),
        "Gentium BoldItalic": require("./assets/fonts/GentiumPlus-BoldItalic.ttf"),
        "Belgan Aesthetic": require("./assets/fonts/Belgan Aesthetic.ttf"),
        "Gilda Display": require("./assets/fonts/GildaDisplay-Regular.ttf"),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error("Error loading fonts:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    loadFonts();
    const splashTimer = setTimeout(() => setShowSplash(false), 2000);
    return () => {
      clearTimeout(splashTimer);
      unsubscribe();
    };
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (showSplash) {
    return <Splash />;
  }

  return (
    <EntryDatesProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={user ? "MainTabs" : "Login"}
          screenOptions={{ headerShown: false }}
        >
          {!user ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          ) : (
            <>
              {/* MainTabs is now properly treated as a nested navigator */}
              <Stack.Screen name="MainTabs" component={TabNavigator} />
              {/* <Stack.Screen name="HomePage" component={HomePage} /> */}
              <Stack.Screen name="Analysis" component={Analysis} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </EntryDatesProvider>
  );
}
