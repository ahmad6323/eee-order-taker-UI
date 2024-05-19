import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { saveSalesman, updateSalesMan } from "../utilty/salesmanUtility";
import { getDepartments } from "../utilty/deptUtility";
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


function AddSalesman({ navigation, route }) {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const { salesman } = route.params;

  let values = {
    _id: route.params.new === false  ? route.params.salesman._id : "",
    name: route.params.new === false ? route.params.salesman.name : "",
    email: route.params.new === false ? route.params.salesman.email : "",
    phone: route.params.new === false ? route.params.salesman.phone : "",
    department: route.params.new === false ? route.params.salesman.department.map(dep=>{return dep._id}) : [],
    password: "",
  };

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
    if(salesman){
      setSelectedDepartments(salesman.department.map(dep=>{
        return dep._id;
      }));
    }
  }, []);

  const handleSubmit = async (info) => {
    if(route.params.new){
      try {
        info.department = selectedDepartments;
        await saveSalesman(info);
        navigation.navigate("verification", { email: info.email });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError(error.response.data);
          setErrorVisible(true);
        }
      }
    }else{
      try {
        info.department = selectedDepartments;
        await updateSalesMan(info,route.params.salesman._id);
        navigation.navigate("addedsalesman");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError(error.response.data);
          setErrorVisible(true);
        }
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
            initialValues={values}
            onSubmit={handleSubmit}
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
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={departments.map((dept) => ({
                label: dept.name,
                value: dept._id,
              }))}
              labelField="label"
              valueField="value"
              placeholder="Select departments"
              value={selectedDepartments}
              onChange={item => {
                setSelectedDepartments(item);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="home"
                  size={20}
                />
              )}
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
  dropdown: {
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    height: 65,
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderRadius: 20,
    borderWidth: 1,
    borderTopColor: "gray",
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
