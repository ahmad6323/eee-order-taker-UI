import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import { TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import salesmanAuthService from "../utilty/salesmanAuthService";
import jwtDecode from "jwt-decode";
import { UserContext } from "../UserContext";

const validationSchema = Yup.object({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const authContext = useContext(UserContext);
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    try {
      // setIsLoading(true);
      const { data } = await salesmanAuthService.login(email, password);
      const user = jwtDecode(data);
      authContext.setUser(user);
      salesmanAuthService.storeToken(data);
      setErrorVisible(false);
    } catch (error) {
      if (error.response && error.response.status === 400)
        setError(error.response.data);
      setErrorVisible(true);
    } finally {
      // setIsLoading(false); // Stop showing activity indicator
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <AppText style={styles.logo}>User (Log in)</AppText>
          <AppText style={styles.subText}>Log in to proceed further</AppText>
        </View>
        <View style={styles.formContainer}>
          <AppForm
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppErrorMessage error={error} visible={errorVisible} />
            <AppFormField
              name={"email"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Email"
            />
            <AppFormField
              name={"password"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Password"
              secureTextEntry
              textContentType="password"
            />
            <TouchableOpacity
              onPress={() => null}
              style={{ alignItems: "flex-end", paddingVertical: 5 }}
            >
              <Text
                onPress={() => navigation.navigate("forgot")}
                style={styles.forgotPasswordText}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <SubmitButton title={"Login"} />
          </AppForm>
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

export default LoginScreen;
