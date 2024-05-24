import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { saveDepartment, getDepartments, updateDepartment } from "../utilty/deptUtility";
import { ScrollView } from "react-native-gesture-handler";
import EditorModal from "../components/EditFieldModal";
import { AntDesign } from "@expo/vector-icons";


function DepartmentScreen({ navigation }) {
  const [error, setError] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [departments, setDepartments] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [valueToEdit, setValueToEdit] = useState(null);

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

  const updateField = async (value)=> {
    if(!valueToEdit){
      return;
    }
    try {
      await updateDepartment(valueToEdit._id,value.value.trim());
      fetchDepartments();
      setValueToEdit(null);
      setShowModal(false);
      setError("");
      setErrorVisible(false);
    } catch (error) {
      console.error("Error saving department:", error);
      setError(error.response.data);
      setErrorVisible(true);
    }
  }

  if (departments === null) {
    return null;
  }

  return (
    <ScrollView style={{ paddingTop: 50 }}>
      <AppErrorMessage error={error} visible={errorVisible}></AppErrorMessage>
      <EditorModal visible={showModal} onPress={updateField} value={valueToEdit ? valueToEdit.value : "" } title={"Size"} onClose={()=>{
        setShowModal(false);
        setValueToEdit(null);
        console.log("closing");
      }}/>
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
          <ScrollView style={{ marginVertical: 20 }}>
            <AppText style={{ fontSize: 26, fontFamily: "Bold" }}>
              Added Departments
            </AppText>
            {departments.map((department, index) => (
              <View
                key={index}
                style={styles.departmentContainer}
              >
                <AppText style={styles.departmentText}>
                  {department.name}
                </AppText>
                <View
                  style={{
                    flexDirection: "row",
                    width: "15%",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <AntDesign
                    name={"edit"}
                    size={22}
                    color="blue"
                    onPress={() => {
                      setShowModal(true);
                      setValueToEdit({
                        _id: department._id,
                        value: department.name
                      });
                    }}
                  />
                  <AntDesign
                    name={"arrowright"}
                    size={22}
                    color="red"
                    style={{
                      marginRight: 5
                    }}
                    onPress={() =>
                      navigation.navigate("deptprod", {
                        id: department._id,
                        name: department.name,
                      })
                    }
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
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
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
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
