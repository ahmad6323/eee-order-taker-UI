import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import AppFormField from "../../components/forms/AppFormField";
import SubmitButton from "../../components/forms/SubmitButton";
import AppForm from "../../components/forms/AppForm";
import AppErrorMessage from "../../components/forms/AppErrorMessage";
import colors from "../../config/colors";
import AppText from "../../components/AppText";
import SafeScreen from "../../components/SafeScreen";
import {  saveColor, getColors, deleteColor } from "../../utilty/colorUtility";
import { FontAwesome6 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const validationSchema = Yup.object().shape({
  color: Yup.string().required("Color is required"),
});

function ColorScreen({ navigation }) {
  const [error, setError] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [savedColors, setSavedColors] = useState(null);

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      const fetchedSizes = await getColors();
      console.log(fetchedSizes.data);
      setSavedColors(fetchedSizes.data);
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  const handleSubmit = async (values) => {
    if (!validationSchema.isValidSync(values)) {
      setError("Invalid Color name");
      setErrorVisible(true);
      return;
    }
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

  const onDeleteSize = async (colorToDel) => {
    try {
      await deleteColor(colorToDel._id);
      setSavedColors(savedColors.filter((color) => color.color !== colorToDel.size));
    } catch (error) {
      console.error("Error deleting color:", error);
    }
  };

  if (savedColors === null) {
    return null; 
  }

  return (
    <SafeScreen style={{ paddingTop: 50 }}>
      <AppErrorMessage error={error} visible={errorVisible}></AppErrorMessage>
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
              validationSchema={validationSchema}
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
          <View style={{ marginTop: 60 }}>
            <AppText style={{ fontSize: 26, fontWeight: "bold" }}>
              Added Colors
            </AppText>
          </View>
          <ScrollView>
            <View style={{ marginVertical: 20 }}>
              {savedColors.map((color, index) => (
                <TouchableOpacity
                  onPress={() => {}}
                  key={index}
                  style={styles.departmentContainer}
                >
                  <AppText style={styles.departmentText}>{color.color}</AppText>
                  <TouchableOpacity onPress={() => onDeleteSize(color)}>
                    <FontAwesome6
                      style={{ marginRight: 10 }}
                      name="delete-left"
                      size={24}
                      color={colors.medium}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
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

export default ColorScreen;
