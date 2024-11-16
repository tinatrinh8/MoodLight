import React from 'react';
import { View, StyleSheet } from 'react-native';
import Lottie from 'lottie-react-native';

const LoadingFlower = () => {
  return (
    <View style={styles.container}>
    <View style={styles.circle}>
      <Lottie
        source={require('../assets/spinning-flower.json')} // Adjust path if necessary
        autoPlay
        loop
        style={styles.animation}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 90, // Match size of animation + padding
    height: 90,
    borderRadius: 45, // Half of width/height for perfect circle
    backgroundColor: '#DC869A', // Solid pink background
    justifyContent: 'center',
    alignItems: 'center', // Center the animation inside the circle
    marginBottom: 30,
  },
  animation: {
    width: 100, // Adjust size of the animation
    height: 100,
  },
});

export default LoadingFlower;
