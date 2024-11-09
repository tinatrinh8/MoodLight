import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomePage from '../screens/HomePage';
import Calendar from '../screens/Calendar';
import Insights from '../screens/Insights';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

// Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#DC869A',
        borderRadius: 25,
        height: 60,
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 10,
        elevation: 5,
      },
      tabBarShowLabel: true,
      tabBarLabelStyle: {
        fontSize: 12,
        color: 'black',
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
                ? require('../assets/home-active.png')
                : require('../assets/home-default.png')
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
                ? require('../assets/insight-active.png')
                : require('../assets/insight-default.png')
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
                ? require('../assets/calendar-active.png')
                : require('../assets/calendar-default.png')
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
                ? require('../assets/settings-active.png')
                : require('../assets/settings-default.png')
            }
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
