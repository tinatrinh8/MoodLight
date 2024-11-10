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
    <View style={styles.containerWithHalo}>
      <Text style={styles.text}>MoodLight</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWithHalo: {
    height: 90, // Set to the desired height
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 0, // Ensure there's no padding at the bottom
    overflow: "visible",
    shadowColor: "rgba(217, 105, 159, 0.9)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },

  text: {
    fontFamily: "Belgan Aesthetic",
    fontSize: 22,
    color: "#FFF",
  },
});


export default Header;
