import { View, Text, Button, StatusBar, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react';
import Login from './Login';
import axios from 'axios';

import { MaterialIcons } from '@expo/vector-icons';

const Register = (props) => {
  const [name, setName] = useState("");  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    }
    axios.post('http://192.168.29.195:3000/register', user).then((response) => {
      console.log(response.data);
      Alert.alert("Registration successful","you have bee registered successfully");
      setName("");
      setEmail("");
      setPassword("");
    }).catch((error) => {
      Alert.alert("Registration failed", "An error occurred during registration");
      console.log("error", error);
    });
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      {/* <StatusBar/> */}
      <View style={{ marginTop: 100 }}>
        <Image
          style={{ width: 150, height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25 }}>
            {" "}
            Create an Account{" "}
          </Text>
        </View>

        {/* Name input */}
        <View style={{ marginTop: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              name="person"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              placeholder="enter your name"
              placeholderTextColor={"gray"}
              style={{ color: "gray", marginVertical: 5, width: 300 }}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
        </View>
        {/* Name input ends */}

        {/* email input starts */}
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              name="email"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              placeholder="enter your email"
              placeholderTextColor={"gray"}
              style={{ color: "gray", marginVertical: 5, width: 300 }}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>
        {/* email input ends */}

        {/* password inputs starts */}
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              name="lock"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              placeholder="enter your password"
              placeholderTextColor={"gray"}
              style={{ color: "gray", marginVertical: 5, width: 300 }}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>
        {/* password inputs ends */}

        <Pressable
        onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: "black",
            padding: 15,
            marginTop: 40,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            {" "}
            Register{" "}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => props.navigation.navigate("Login")}
          style={{ marginTop: 6 }}
        >
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            {" "}
            Already have an account? Log in{" "}
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register