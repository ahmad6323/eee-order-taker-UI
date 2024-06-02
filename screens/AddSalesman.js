import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
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
import ImageInput from "../components/ImageInput"
import * as FileSystem from "expo-file-system";
import * as Yup from "yup";

const formValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits')
    .required('Phone number is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

function AddSalesman({ navigation, route }) {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [image, setImage] = useState(null);
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

        if(image){
          const base64String = await FileSystem.readAsStringAsync(image, {
            encoding: FileSystem.EncodingType.Base64,
          });
          info.image = base64String;

        }

        await saveSalesman(info);
        navigation.navigate("profiles");

      } catch (error) {
        console.log(error);
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
            validationSchema={formValidationSchema}
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
            <ImageInput imageUri={image} onSelectImage={setImage}/>
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  eyeIcon: {
    position: "absolute",
    right: 3,
  },
  selectedTextStyle: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'Bold',
  },
  placeholderStyle: {
    color: '#999', 
    fontFamily: 'Poppins',
  }
});

export default AddSalesman;
