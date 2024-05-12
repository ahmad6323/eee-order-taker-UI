import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SubmitButton from "../components/forms/SubmitButton";
import { TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

function RoleScreen({ navigation }) {
  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <AppText style={styles.logo}>Log In</AppText>
          <AppText style={styles.subText}>Tell us about your role</AppText>
        </View>
        <View style={styles.formContainer}>
          <AppButton
            onPress={() => navigation.navigate("login")}
            title={"Salesman"}
          />
          <AppButton
            onPress={() => navigation.navigate("adminlogin")}
            title={"Admin"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "80%",
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: "flex-start",
  },
  logo: {
    color: colors.dark,
    fontSize: 35,
    fontWeight: "bold",
  },
  subText: {
    color: colors.medium,
    fontSize: 16,
    textAlign: "center",
  },
  formContainer: {
    marginTop: 20,
  },
  forgotPasswordText: {
    color: colors.primary,
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: "underline",
    alignItems: "flex-end",
  },
});

export default RoleScreen;
