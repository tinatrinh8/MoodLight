import React from "react";
import { View, StyleSheet, Text } from "react-native";

function MoodLightComponent() {
  return (
    <View style={styles.loadingPageContainer}>
      <View style={styles.moodLightContainer}>
        <Text style={styles.moodLightText}>MoodLight</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingPageContainer: {
    flex: 1, // Ensure the container takes up the entire screen
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DC869A", // Add background color
  },
  moodLightContainer: {
    alignSelf: "stretch",
    gap: 10,
  },
  moodLightText: {
    fontFamily: "Belgan Aesthetic", // Default Android font
    fontSize: 64,
    color: "#FFF", // White color for visibility
    fontWeight: "400",
    textAlign: "center",
    letterSpacing: 0.25,
    lineHeight: 64,
  },
});

export default MoodLightComponent;
