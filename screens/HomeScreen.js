import { View, Text, Alert } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { jwtDecode } from "jwt-decode";

const HomeScreen = () => {
  useEffect(() => {
    const checkLoginStatus = async () => {
        try{
            const token = await AsyncStorage.getItem('authToken');
            console.log(token);

            const decoded = jwtDecode(token);
            console.log(decoded);
            Alert.alert(decoded);
        } catch(error){
            console.log("error", error);
        }
    }
    checkLoginStatus();
  }, []);
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen