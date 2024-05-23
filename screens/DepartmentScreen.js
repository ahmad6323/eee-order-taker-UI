import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import colors from "../config/colors";
import AppText from "../components/AppText";
import SafeScreen from "../components/SafeScreen";
import { saveDepartment, getDepartments } from "../utilty/deptUtility";
import { ScrollView } from "react-native-gesture-handler";

function DepartmentScreen({ navigation }) {
  const [error, setError] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [departments, setDepartments] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const fetchedDepartments = await getDepartments();
      setDepartments(fetchedDepartments.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      await saveDepartment({ name: values.department });
      fetchDepartments();
      values = "";
      setError("");
      setErrorVisible(false);
    } catch (error) {
      console.error("Error saving department:", error);
      setError("Error saving department");
      setErrorVisible(true);
    }
  };

  if (departments === null) {
    return null;
  }

  return (
    <SafeScreen style={{ paddingTop: 50 }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.logoContainer}>
            <AppText style={styles.logo}>Departments</AppText>
            <AppText style={styles.subText}>
              All details related to departments
            </AppText>
          </View>
          <View style={styles.formContainer}>
            <AppForm
              initialValues={{ department: "" }}
              onSubmit={handleSubmit}
            >
              <AppErrorMessage error={error} visible={errorVisible} />
              <AppFormField
                name={"department"}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Dep1, Dep2 ..."
              />
              <SubmitButton title={"Submit"} />
            </AppForm>
          </View>
          <View style={{ marginTop: 60 }}>
            <AppText style={{ fontSize: 26, fontFamily: "Bold" }}>
              Added Departments
            </AppText>
          </View>
          <ScrollView style={{ marginVertical: 20 }}>
            {departments.map((department, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("deptprod", {
                    id: department._id,
                    name: department.name,
                  })
                }
                key={index}
                style={styles.departmentContainer}
              >
                <AppText style={styles.departmentText}>
                  {department.name}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
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
    fontFamily: "Bold",
  },
  subText: {
    color: colors.medium,
    fontSize: 16,
    textAlign: "center",
  },
  formContainer: {
    marginTop: 20,
  },
  departmentContainer: {
    backgroundColor: "#e8e8e8",
    width: "100%",
    height: 70,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  departmentText: {
    fontSize: 20,
    fontFamily: "Bold",
    padding: 10,
    flex: 1,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default DepartmentScreen;
