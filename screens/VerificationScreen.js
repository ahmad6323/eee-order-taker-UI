import React, { useContext, useState, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { verification, resend } from "../utilty/salesmanUtility";
import colors from "../config/colors";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import ActivityIndicator from "../components/ActivityIndicator";

const EmailVerificationInput = ({ route, navigation }) => {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputRefs = useRef([]);

  const handleVerifyCode = async () => {
    setIsLoading(true);
    const code = verificationCode.join("");

    try {
      const response = await verification(code);
      if (response.data) {
        navigation.navigate("profiles");
      }
    } catch (error) {
      console.log(error.response.status);
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
        setErrorVisible(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await resend(route.params.email);
    } catch (error) {
      console.log(error);
    } finally {
      setError(null);
      setErrorVisible(false);
      alert("Email Verification code resent!");
    }
  };

  const handleInputChange = (index, text) => {
    const newCode = [...verificationCode];
    newCode[index] = text;
    setVerificationCode(newCode);
    if (text !== "" && index < verificationCode.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ActivityIndicator visible={isLoading} />
      <View style={styles.headerContainer}>
        <View style={[styles.box, { backgroundColor: colors.primary }]}>
          <Text style={styles.emailText}>
            Verification code sent to: {route.params.email}
          </Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <AppErrorMessage error={error} visible={errorVisible} />
        <View style={styles.inputContainer}>
          {verificationCode.map((value, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.input}
              placeholder="-"
              value={value}
              onChangeText={(text) => handleInputChange(index, text)}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Verify Code"
            onPress={handleVerifyCode}
            style={styles.verifyButton}
            color={colors.primary}
          />
          <TouchableOpacity
            style={[styles.resendButton, { marginLeft: 10 }]}
            onPress={handleResendCode}
          >
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerContainer: {
    marginBottom: 20,
    width: "100%",
  },
  box: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  emailText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    textAlign: "center",
    width: 40,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  verifyButton: {
    flex: 1,
  },
  resendButton: {},
  resendText: {
    color: colors.medium,
    textDecorationLine: "underline",
  },
});

export default EmailVerificationInput;
