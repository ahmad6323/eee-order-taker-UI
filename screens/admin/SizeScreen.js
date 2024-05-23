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
import { saveSize, deleteSize, getSizes } from "../../utilty/sizeUtility";
import { FontAwesome6 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";


function SizeScreen({ navigation }) {
  const [error, setError] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [sizes, setSizes] = useState(null); // Initialize to null

  useEffect(() => {
    // Fetch departments from backend when component mounts
    fetchSizes();
  }, []);

  const fetchSizes = async () => {
    try {
      const fetchedSizes = await getSizes();
      setSizes(fetchedSizes.data);
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      // Save department to backend
      await saveSize({ size: values.size });

      // Fetch updated department list from backend
      fetchSizes();

      // Clear form field and errors
      setError("");
      setErrorVisible(false);
    } catch (error) {
      console.error("Error saving department:", error);
      setError(error.response.data);
      setErrorVisible(true);
    }
  };
  const onDeleteSize = async (sizeToDelete) => {
    try {
      // Assuming deleteSize is an async function that deletes the size from the backend
      await deleteSize(sizeToDelete._id);

      // Update the sizes state to exclude the deleted size
      setSizes(sizes.filter((size) => size.size !== sizeToDelete.size));
    } catch (error) {
      console.error("Error deleting size:", error);
      // Handle error appropriately
    }
  };

  if (sizes === null) {
    return null;
  }

  return (
    <ScrollView style={{ paddingTop: 50 }}>
      <AppErrorMessage error={error} visible={errorVisible}></AppErrorMessage>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.logoContainer}>
            <AppText style={styles.logo}>Sizes</AppText>
            <AppText style={styles.subText}>
              All details related to Sizes
            </AppText>
          </View>
          <View style={styles.formContainer}>
            <AppForm
              initialValues={{ size: "" }}
              onSubmit={handleSubmit}
            >
              <AppErrorMessage error={error} visible={errorVisible} />
              <AppFormField
                name={"size"}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="XS, S, M, L, XL, XXL, XXXL"
              />
              <SubmitButton title={"Submit"} />
            </AppForm>
          </View>
          <View>
            <AppText style={{ fontSize: 24, fontFamily: "Bold", marginTop: 10 }}>
              Added Sizes
            </AppText>
            <View style={{ marginVertical: 20 }}>
              {sizes.map((size, index) => (
                <TouchableOpacity
                  onPress={() => {}}
                  key={index}
                  style={styles.departmentContainer}
                >
                  <AppText style={styles.departmentText}>{size.size}</AppText>
                  <TouchableOpacity onPress={() => onDeleteSize(size)}>
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

export default SizeScreen;
