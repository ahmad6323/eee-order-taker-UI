import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  forgotPassword,
  verifyForgotPassword,
} from "../../utilty/salesmanUtility";
import colors from "../..//config/colors";
import SafeScreen from "../..//components/SafeScreen";
import AppErrorMessage from "../../components/forms/AppErrorMessage";
import ActivityIndicator from "../../components/ActivityIndicator";

const ForgotScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(""));
  const codeInputs = useRef([]);

  const handleVerify = async () => {
    try {
      if (email) {
        await forgotPassword(email);
        setErrorVisible(false);
        alert("Email Verification code Sent to your email!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
        setErrorVisible(true);
      }
    }
  };

  const handleVerifyCode = async () => {
    setIsLoading(true);
    try {
      const { data } = await verifyForgotPassword(verificationCode.join(""));
      if (data.Verify === "Email has been verified") {
        navigation.navigate("reset", { email: email });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
        setErrorVisible(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (value, index) => {
    if (value && index < verificationCode.length - 1) {
      // Move focus to the next input
      codeInputs.current[index + 1].focus();
    }
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
  };

  return (
    <SafeScreen>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ActivityIndicator visible={isLoading} />
        <View style={styles.box}>
          <Text style={styles.boxText}>
            For password change, you need to first verify your email.
          </Text>
        </View>
        <AppErrorMessage error={error} visible={errorVisible} />
        <View style={styles.content}>
          <View
            style={{
              width: "100%",
              backgroundColor: colors.light,
              height: "40%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.medium,
                borderRadius: 5,
                padding: 10,
                textAlign: "center",
                width: "100%",
              }}
              placeholder="Enter Email"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <View style={{ borderRadius: 10, marginVertical: 10 }}>
              <Button
                title="Send Verification Code"
                onPress={handleVerify}
                color={colors.primary}
              />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: colors.light,
              height: "40%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={styles.inputContainer}>
              {verificationCode.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(input) => (codeInputs.current[index] = input)}
                  style={styles.input}
                  placeholder="-"
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  keyboardType="numeric"
                  maxLength={1}
                />
              ))}
            </View>

            <Button
              title="Verify"
              onPress={handleVerifyCode}
              color={colors.primary}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
  box: {
    backgroundColor: colors.primary,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    width: "100%",
  },
  boxText: {
    color: "white",
    textAlign: "center",
  },
});

export default ForgotScreen;
