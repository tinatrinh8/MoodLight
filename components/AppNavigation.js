import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";

// Import Screens
import HomePage from "../screens/HomePage";
import Calendar from "../screens/Calendar";
import Insights from "../screens/Insights";
import Settings from "../screens/Settings";

// Create Navigators
const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: "#DC869A",
        borderRadius: 40,
        height: 60, // Keep the height as 70
        position: "absolute",
        marginHorizontal: 15,
        bottom: 30, // Increased value to move the bar higher
        elevation: 5,
        borderColor: "black", // Add black border color
        borderWidth: 2,
      },
      tabBarItemStyle: {
        justifyContent: "center", // Center items vertically
        alignItems: "center", // Center items horizontally
      },
      tabBarShowLabel: true,
      tabBarLabelStyle: {
        fontSize: 12,
        color: "black",
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomePage}
      options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require("../assets/home-active.png")
                : require("../assets/home-default.png")
            }
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        ),
      }}
    />
    <Tab.Screen
      name="Insights"
      component={Insights}
      options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require("../assets/insight-active.png")
                : require("../assets/insight-default.png")
            }
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        ),
      }}
    />
    <Tab.Screen
      name="Calendar"
      component={Calendar}
      options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require("../assets/calendar-active.png")
                : require("../assets/calendar-default.png")
            }
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require("../assets/settings-active.png")
                : require("../assets/settings-default.png")
            }
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        ),
      }}
    />
  </Tab.Navigator>
);

// Root Stack Navigator
// const AppNavigation = () => {
// return TabNavigator
// return (
//   <Tab.Navigator screenOptions={{ headerShown: false }}>
//     <Tab.Screen name="Tabs" component={TabNavigator} />
//   </Tab.Navigator>
// );
// };

export default TabNavigator;
