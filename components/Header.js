import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as Font from "expo-font";

const Header = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Belgan Aesthetic": require("../assets/fonts/Belgan Aesthetic.ttf"),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="small" color="#000" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>MoodLight</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Belgan Aesthetic",
    fontSize: 24,
    color: "#FFF",
  },
});


export default Header;
