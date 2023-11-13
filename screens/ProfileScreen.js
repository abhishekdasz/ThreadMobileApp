import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";

const ProfileScreen = () => {
  const [user, setUser] = useState("");
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProfile();
  }, [userId]);

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("Cleared auth token");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
          }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.subtitle}>Threads.net</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Education:</Text>
        <Text style={styles.detailText}>BTech.</Text>

        <Text style={styles.detailTitle}>Interests:</Text>
        <Text style={styles.detailText}>Movie Buff | Musical Nerd</Text>
        <Text style={styles.detailText}>Love Yourself</Text>
      </View>

      <Text style={styles.followersText}>
        {user?.followers?.length} followers
      </Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>

        <Pressable onPress={logout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 55,
    padding: 15,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: "contain",
  },
  profileInfo: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    color: "gray",
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  detailText: {
    fontSize: 15,
    fontWeight: "400",
  },
  followersText: {
    color: "gray",
    fontSize: 15,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "black",
    borderRadius: 6,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileScreen;
