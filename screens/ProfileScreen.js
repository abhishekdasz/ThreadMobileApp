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
      <View style={styles.headerContainer}>
        <Text style={styles.headerUsername}>abhishek_das</Text>
        <View style={styles.headerSubtitle}>
          <Text>Threads.net</Text>
        </View>
      </View>

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
        <View style={styles.button}>
          <Text>Edit Profile</Text>
        </View>

        <View style={styles.button}>
          <Pressable onPress={logout}>
            <Text>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  headerContainer: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerUsername: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerSubtitle: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "#D0D0D0",
  },
  profileContainer: {
    paddingHorizontal: 15,
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
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontWeight: "bold",
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
