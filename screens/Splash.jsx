import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Animated,
} from "react-native";

function Splash() {
  // Animated opacity for fade-in effect
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Chain animations: fade in for 3 seconds, then hold for 2 seconds
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000, // 3 seconds for fade-in
        useNativeDriver: true,
      }),
      Animated.delay(2000), // Hold for 2 seconds
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/splashOmbre.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.loadingPageContainer}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.moodLightContainer}>
            <Text style={styles.moodLightText}>MoodLight</Text>
          </View>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DC869A", // Fallback color if image doesn’t load
  },
  loadingPageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  moodLightContainer: {
    alignSelf: "stretch",
    gap: 10,
  },
  moodLightText: {
    fontFamily: "LexendDeca",
    fontSize: 64,
    color: "#FFF",
    fontWeight: "400",
    textAlign: "center",
    letterSpacing: 0.25,
    lineHeight: 64,
  },
});

export default Splash;
