import { View, Text, Button, StatusBar, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Use the `useNavigation` hook to get the `navigation` object
    const navigation = useNavigation();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try{
                const token = await AsyncStorage.getItem('authToken');
                
                if(token)
                {
                    setTimeout(() =>{
                        navigation.replace("Main");
                    }, 400)
                }
            } catch(error){
                console.log("error", error);
            }
        }
        checkLoginStatus();
    }, []);

    const handleLogin = () => {
        const user = {
            email: email,
            password: password,
        };
    
        axios.post('http://192.168.29.195:3000/login', user).then((response) => {
            const { token, userId } = response.data;
            AsyncStorage.setItem('authToken', token);
            AsyncStorage.setItem('userId', userId);
    
            Alert.alert("Login successfully");
            navigation.navigate('Main', { userId });
        }).catch((error) => {
            console.log('error', error);
            Alert.alert("Login error");
        });
    };
    

    return (
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            {/* <StatusBar/> */}
            <View style={{ marginTop: 100 }}>
                <Image style={{ width: 150, height: 100, resizeMode: 'contain' }} source={{ uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png", }} />
            </View>

            <KeyboardAvoidingView>
                <View style={{alignItems:'center'}}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 25 }}>Login to your Account</Text>
                </View>

                <View style={{ marginTop: 40 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, borderColor: '#D0D0D0', borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
                        <MaterialIcons name="email" size={24} color="gray" style={{ marginLeft: 8 }} />
                        <TextInput placeholder='enter your email' placeholderTextColor={'gray'} style={{ color: 'gray', marginVertical: 5, width: 300 }} value={email} onChangeText={(text)=>setEmail(text)} />
                    </View>
                </View>

                <View style={{ marginTop: 30 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, borderColor: '#D0D0D0', borderWidth: 1, paddingVertical: 5, borderRadius: 5 }}>
                        <MaterialIcons name="lock" size={24} color="gray" style={{ marginLeft: 8 }} />
                        <TextInput placeholder='enter your password' placeholderTextColor={'gray'} style={{ color: 'gray', marginVertical: 5, width: 300 }} value={password} onChangeText={(text)=>setPassword(text)} />
                    </View>
                </View>

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:12}}>
                    <Text> Keep me logged in </Text>
                    <Text style={{fontWeight:'500', color:'#007FFF'}}> Forgot password </Text>
                </View>

                <Pressable onPress={handleLogin} style={{width:200, backgroundColor:'black', padding:15, marginTop:40, marginLeft:'auto', marginRight:'auto', borderRadius:6}}>
                    <Text style={{color:'white', fontWeight:'bold', fontSize:16, textAlign:'center'}}> Login </Text>
                </Pressable>

                <Pressable onPress={() => props.navigation.navigate("Register")} style={{marginTop:6}}>
                    <Text style={{textAlign:'center', fontSize:16}} > Don't have an account? Sign up </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Login