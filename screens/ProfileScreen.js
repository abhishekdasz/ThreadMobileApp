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
      <Text style={styles.headerText}>Profile</Text>

      {userDetails && (
        <View style={styles.profileContainer}>
          <View style={styles.profileHeader}>
            <Image
              style={styles.profileImage}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
              }}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userDetails.name}</Text>
              <Text style={styles.profileSubtitle}>Threads.net</Text>
            </View>
          </View>

          <View style={styles.profileDetails}>
            <Text>{userDetails.email} </Text>
            <Text style={styles.bioText}>
              {userDetails.bio || "Tech Enthusiast || Nature Lover"}
            </Text>
            <Text>{userDetails.followers || 0}0 followers</Text>
          </View>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.profileButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>

        <Pressable style={styles.profileButton} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 35,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileContainer: {
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: "cover",
  },
  profileInfo: {
    marginLeft: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileSubtitle: {
    color: "gray",
  },
  profileDetails: {
    marginTop: 15,
  },
  detailHeader: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  bioContainer: {
    marginTop: 20,
  },
  bioText: {
    color: "gray",
  },
  followerContainer: {
    flexDirection: "row",
    marginTop: 15,
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileButton: {
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
});

export default ProfileScreen;
