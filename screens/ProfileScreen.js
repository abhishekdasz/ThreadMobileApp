import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserType } from '../UserContext'

const ProfileScreen = () => {
    const [ user, setUser ] = useState("");
    const { userId, setUserId } = useContext(UserType);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://192.168.29.195:3000/profile/$(userId)`);
                const { user } = response.data;
                setUser(user);
            } catch(error) {
                console.log("error", error);
            }
        };

        fetchProfile();
    });
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  )
}

export default ProfileScreen