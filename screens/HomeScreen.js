import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  // Dummy user data (replace with actual user data)
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    cnic: "12345-6789012-3",
    phone: "123-456-7890",
    profilePic: require("../assets/noimage.jpg"), // Replace with actual image URI
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("User logged out");
  };

  return (
    <View style={styles.container}>
      <Image source={userData.profilePic} style={styles.profilePic} />
      <Text style={styles.name}>{userData.name}</Text>
      <Text style={styles.phone}>{userData.phone}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>CNIC:</Text>
        <Text style={styles.info}>{userData.cnic}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{userData.email}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "dodgerblue" }]}
          onPress={() => console.log("Edit pressed")}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color="white"
            style={styles.logoutIcon}
          />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  phone: {
    fontSize: 18,
    marginBottom: 20,
    color: "#666",
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    color: "#333",
  },
  info: {
    fontSize: 18,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    marginLeft: 5,
  },
  logoutIcon: {
    marginRight: 5,
  },
});

export default HomeScreen;
