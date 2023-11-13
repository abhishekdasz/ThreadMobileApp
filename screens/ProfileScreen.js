import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");
        const userId = await AsyncStorage.getItem("userId");

        if (authToken && userId) {
          const response = await axios.get(
            `http://192.168.29.195:3000/profile/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          setUserDetails(response.data.user);
        }
      } catch (error) {
        console.log("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

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
        <View style={styles.profileHeader}>
          <Image
            style={styles.profileImage}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
            }}
          />

          <View style={styles.profileDetails}>
            <View style={styles.nameContainer}>
              <Text style={styles.profileName}>{userDetails?.name}</Text>
            </View>

            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>
                {userDetails?.followers?.length || 0} followers
              </Text>
              <Text style={styles.statsText}>{"  "}</Text>
              <Text style={styles.statsText}>
                {userDetails?.posts?.length || 0} posts
              </Text>
            </View>

            <Text style={styles.bio}>
              {userDetails?.bio || "Tech Enthusiast || Nature Lover"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.editProfileButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </Pressable>

        <Pressable style={styles.logoutButton} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 40,
  },
  profileContainer: {
    padding: 15,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileDetails: {
    marginLeft: 20,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 20,
  },
  editProfileButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  logoutButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  editProfileText: {
    fontSize: 14,
    color: "#007AFF",
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  statsText: {
    color: "gray",
  },
  bio: {
    fontSize: 14,
    color: "gray",
    marginTop: 8,
  },
});

export default ProfileScreen;
