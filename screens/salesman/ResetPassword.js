import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { updatePassword } from "../../utilty/salesmanUtility";

const ResetPassword = ({ route, navigation }) => {
  const { email } = route.params;
  const [password, setPassword] = useState("");
  const handleUpdate = async () => {
    try {
      const res = await updatePassword(email, password);
      navigation.navigate("login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput style={styles.readOnlyInput} editable={false} value={email} />

      <TextInput
        style={styles.input}
        placeholder="New Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <Button title="Update Password" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  readOnlyInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#ddd", // Read-only input background
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default ResetPassword;
