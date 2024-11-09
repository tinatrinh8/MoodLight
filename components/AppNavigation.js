import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import HomePage from '../screens/HomePage';
import Calendar from '../screens/Calendar';
import Insights from '../screens/Insights';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, activeIcon, defaultIcon }) => (
  <Image
    source={focused ? activeIcon : defaultIcon}
    style={{
      width: 30, // Icon size
      height: 30,
      marginBottom: 3, // Space between icon and label
    }}
    resizeMode="contain"
  />
);

const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false, // Disable transition animation
        tabBarStyle: {
          backgroundColor: '#DC869A',
          borderRadius: 25,
          height: 60,
          borderColor: 'black',
          borderWidth: 2,
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
            <TabBarIcon
              focused={focused}
              activeIcon={require('../assets/home-active.png')}
              defaultIcon={require('../assets/home-default.png')}
            />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Insights"
        component={Insights}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon={require('../assets/insight-active.png')}
              defaultIcon={require('../assets/insight-default.png')}
            />
          ),
          tabBarLabel: 'Insight',
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon={require('../assets/calendar-active.png')}
              defaultIcon={require('../assets/calendar-default.png')}
            />
          ),
          tabBarLabel: 'Calendar',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon={require('../assets/settings-active.png')}
              defaultIcon={require('../assets/settings-default.png')}
            />
          ),
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
