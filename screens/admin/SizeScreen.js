import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppFormField from "../../components/forms/AppFormField";
import SubmitButton from "../../components/forms/SubmitButton";
import AppForm from "../../components/forms/AppForm";
import AppErrorMessage from "../../components/forms/AppErrorMessage";
import colors from "../../config/colors";
import AppText from "../../components/AppText";
import { saveSize, getSizes, updateSize } from "../../utilty/sizeUtility";
import { ScrollView } from "react-native-gesture-handler";
import EditorModal from "../../components/EditFieldModal";
import { AntDesign } from "@expo/vector-icons";

function SizeScreen({ navigation }) {
  const [error, setError] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [sizes, setSizes] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [valueToEdit, setValueToEdit] = useState(null);

  useEffect(() => {
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
      await saveSize({ size: values.size });
      fetchSizes();
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
      await updateSize(valueToEdit._id,value.value.trim());
      fetchSizes();
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

  if (sizes === null) {
    return null;
  }

  return (
    <ScrollView style={{ paddingTop: 50 }}>
      <AppErrorMessage error={error} visible={errorVisible}></AppErrorMessage>
      <EditorModal visible={showModal} onPress={updateField} value={valueToEdit ? valueToEdit.value : "" } title={"Size"} onClose={()=>{
        setShowModal(false);
        setValueToEdit(null);
      }}/>
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
                <View
                  key={index}
                  style={styles.departmentContainer}
                >
                  <AppText style={styles.departmentText}>{size.size}</AppText>
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
                        _id: size._id,
                        value: size.size
                      });
                    }}
                  />
                </View>
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
