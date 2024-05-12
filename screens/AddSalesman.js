import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppFormField from "../components/forms/AppFormField";
import AppFormPicker from "../components/forms/AppFormPicker";
import SubmitButton from "../components/forms/SubmitButton";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { saveSalesman } from "../utilty/salesmanUtility";
import { getDepartments } from "../utilty/deptUtility";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  phone: Yup.string().required().label("Phone"),
  email: Yup.string().required().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  department: Yup.object().required().label("Department"),
});

function AddSalesman({ navigation, route }) {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [departments, setDepartments] = useState([]);

  const { salesman } = route.params;

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const result = await getDepartments();
        setDepartments(result.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleSubmit = async (info) => {
    try {
      if (salesman) {
        // Include _id only if salesman exists
        info._id = salesman._id;
      }
      info.department = info.department.value;
      await saveSalesman(info);
      if (info._id) {
        navigation.navigate("addedsalesman");
      } else {
        navigation.navigate("verification", { email: info.email });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
        setErrorVisible(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <AppText style={styles.logo}>Add Salesman</AppText>
          <AppText style={styles.subText}>
            Provide the details to add a new salesman
          </AppText>
        </View>
        <View style={styles.formContainer}>
          <AppForm
            initialValues={{
              name: salesman ? salesman.name : "",
              phone: salesman ? salesman.phone : "",
              email: salesman ? salesman.email : "",
              password: salesman ? salesman.password : "",
              department: null,
            }}
            onSubmit={handleSubmit} // Make sure handleSubmit is passed here
            validationSchema={validationSchema}
          >
            <AppErrorMessage error={error} visible={errorVisible} />
            <AppFormField
              name={"name"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter name"
            />
            <AppFormField
              name={"phone"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter phone"
            />
            <AppFormField
              name={"email"}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter email address"
            />
            <View style={styles.passwordContainer}>
              <View style={{ flex: 1 }}>
                <AppFormField
                  name={"password"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Assign a Password"
                  secureTextEntry={!showPassword}
                  textContentType="password"
                />
              </View>
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                style={styles.eyeIcon}
              >
                <MaterialCommunityIcons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color={colors.medium}
                />
              </TouchableOpacity>
            </View>
            <AppFormPicker
              items={departments.map((dept) => ({
                label: dept.name,
                value: dept._id,
              }))}
              name={"department"} // Change the name to match the field name
              placeholder={"Select Department"}
            />
            <SubmitButton title={"Done"} />
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  eyeIcon: {
    position: "absolute",
    right: 3,
  },
});

export default AddSalesman;
