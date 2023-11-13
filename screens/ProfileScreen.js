import { View, Text, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserType } from '../UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const [user, setUser] = useState("");
    const { userId, setUserId } = useContext(UserType);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://192.168.29.195:3000/profile/${userId}`);
                const { user } = response.data;
                setUser(user);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchProfile();
    }, []);

    const logout = () => {
        clearAuthToken();
    }
    
    const clearAuthToken = async () => {
        await AsyncStorage.removeItem('authToken');
        console.log('Cleared auth token');
        navigation.replace('Login');
    }

    return (
        <View>
            <Text>ProfileScreen</Text>
            <View>
                <Pressable
                    onPress={logout}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        borderColor: '#D0D0D0',
                        borderWidth: 1,
                        borderRadius: 5,
                        marginTop: 100,
                    }}
                >
                    <Text style={{ color: 'black' }}> Log out </Text>
                </Pressable>
            </View>
        </View>
    );
}

export default ProfileScreen;
