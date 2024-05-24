import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import AppFormField from "../../components/forms/AppFormField";
import SubmitButton from "../../components/forms/SubmitButton";
import AppForm from "../../components/forms/AppForm";
import AppErrorMessage from "../../components/forms/AppErrorMessage";
import colors from "../../config/colors";
import AppText from "../../components/AppText";
import {  saveColor, getColors, updateColor } from "../../utilty/colorUtility";
import { ScrollView } from "react-native-gesture-handler";
import EditorModal from "../../components/EditFieldModal";
import { AntDesign } from "@expo/vector-icons";

function ColorScreen({ navigation }) {
  const [error, setError] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [savedColors, setSavedColors] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [valueToEdit, setValueToEdit] = useState(null);

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      const fetchedSizes = await getColors();
      setSavedColors(fetchedSizes.data);
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      await saveColor({ color: values.color });
      fetchColors();
      setError("");
      setErrorVisible(false);
    } catch (error) {
      console.error("Error saving department:", error);
      setError(error.response.data);
      setErrorVisible(true);
    }
  };

  const updateField = async (value)=> {
    if(!valueToEdit){
      return;
    }
    try {
      await updateColor(valueToEdit._id,value.value.trim());
      fetchColors();
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

  if (savedColors === null) {
    return null; 
  }

  return (
    <ScrollView style={{ paddingTop: 40 }}>
      <AppErrorMessage error={error} visible={errorVisible}></AppErrorMessage>
      <EditorModal title={"Color"} value={valueToEdit ? valueToEdit.value : ""} visible={showModal} onPress={updateField} onClose={()=>{
        setValueToEdit(null);
        console.log("closing");
        setShowModal(false);
      }}/>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.logoContainer}>
            <AppText style={styles.logo}>Colors</AppText>
            <AppText style={styles.subText}>
              All details related to Sizes
            </AppText>
          </View>
          <View style={styles.formContainer}>
            <AppForm
              initialValues={{ color: "" }}
              onSubmit={handleSubmit}
            >
              <AppErrorMessage error={error} visible={errorVisible} />
              <AppFormField
                name={"color"}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Black, Magenta, Blue, Pink"
              />
              <SubmitButton title={"Submit"} />
            </AppForm>
          </View>
          <View style={{ marginVertical: 10, marginBottom: 15 }}>
            <AppText style={{ fontSize: 26, fontFamily: "Bold", marginBottom: 5 }}>
              Added Colors
            </AppText>
            {savedColors.map((color, index) => (
              <View
                key={index}
                style={styles.departmentContainer}
              >
                <AppText style={styles.departmentText}>{color.color}</AppText>
                <AntDesign
                    name={"edit"}
                    size={22}
                    color="blue"
                    style={{
                      marginRight: 10
                    }}
                    onPress={() => {
                      setShowModal(true);
                      setValueToEdit({
                        _id: color._id,
                        value: color.color
                      });
                    }}
                  />
              </View>
            ))}
          </View>
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
    marginBottom: 5,
    alignItems: "flex-start",
  },
  logo: {
    color: colors.dark,
    fontSize: 32,
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

export default ColorScreen;
