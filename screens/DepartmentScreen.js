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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { saveDepartment, getDepartments } from "../utilty/deptUtility";

const validationSchema = Yup.object().shape({
  department: Yup.string().required().label("Department"),
});

function DepartmentScreen({ navigation }) {
  const [error, setError] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [departments, setDepartments] = useState(null); // Initialize to null

  useEffect(() => {
    // Fetch departments from backend when component mounts
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
    if (!validationSchema.isValidSync(values)) {
      setError("Invalid department name");
      setErrorVisible(true);
      return;
    }

    try {
      // Save department to backend
      await saveDepartment({ name: values.department });

      // Fetch updated department list from backend
      fetchDepartments();

      // Clear form field and errors
      setError("");
      setErrorVisible(false);
    } catch (error) {
      console.error("Error saving department:", error);
      setError("Error saving department");
      setErrorVisible(true);
    }
  };

  // Check if departments is still null
  if (departments === null) {
    return null; // Render nothing while departments are being fetched
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
              validationSchema={validationSchema}
            >
              <AppErrorMessage error={error} visible={errorVisible} />
              <AppFormField
                name={"department"}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Select Department"
              />
              <SubmitButton title={"Submit"} />
            </AppForm>
          </View>
          <View style={{ marginTop: 60 }}>
            <AppText style={{ fontSize: 26, fontWeight: "bold" }}>
              Added Departments
            </AppText>
          </View>
          <View style={{ marginVertical: 20 }}>
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
          </View>
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
    fontWeight: "bold",
    padding: 10,
    flex: 1,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default DepartmentScreen;
