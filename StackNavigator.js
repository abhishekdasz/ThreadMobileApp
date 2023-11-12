import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Login';
import Register from './screens/Register';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import ThreadScreen from './screens/ThreadScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const StackNavigator = () => {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    function BottomTabs() {
        return (
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: "Home",
                tabBarLabelStyle: { color: 'black' },
                tabBarIcon: ({ focused }) => (
                  focused ? (
                    <Entypo name="home" size={24} color="black" />
                  ) : (
                    <AntDesign name="home" size={24} color="black" />
                  )
                ),
              }}
            />
            <Tab.Screen
              name="ThreadScreen"
              component={ThreadScreen}
              options={{
                tabBarLabel: "Threads",
                tabBarLabelStyle: { color: 'black' },
                tabBarIcon: ({ focused }) => (
                  focused ? (
                    <Ionicons name="create" size={24} color="black" />
                  ) : (
                    <Ionicons name="create-outline" size={24} color="black" />
                  )
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                tabBarLabel: "Profile",
                tabBarLabelStyle: { color: 'black' },
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  focused ? (
                    <Ionicons name="person" size={24} color="black" />
                  ) : (
                    <Ionicons name="person-outline" size={24} color="black" />
                  )
                ),
              }}
            />

          </Tab.Navigator>
        );
      }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator