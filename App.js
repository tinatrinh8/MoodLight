import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MoodLightComponent from './screens/MoodLightComponent';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AppNavigation from './components/AppNavigation';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Gentium Book Plus': require('./assets/fonts/GentiumPlus-Regular.ttf'),
      'Gentium Basic': require('./assets/fonts/GentiumPlus-Regular.ttf'),
      'Gentium Plus': require('./assets/fonts/GentiumPlus-Regular.ttf'),
      'Gentium Bold': require('./assets/fonts/GentiumPlus-Bold.ttf'),
      'Gentium Italic': require('./assets/fonts/GentiumPlus-Italic.ttf'),
      'Gentium BoldItalic': require('./assets/fonts/GentiumPlus-BoldItalic.ttf'),
      'Belgan Aesthetic': require('./assets/fonts/Belgan Aesthetic.ttf'),
      'Gilda Display': require('./assets/fonts/GildaDisplay-Regular.ttf'),
      'LexendDeca': require('./assets/fonts/LexendDeca-VariableFont_wght.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
    const splashTimer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(splashTimer);
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (showSplash) {
    return <MoodLightComponent />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="AppNavigation" component={AppNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
