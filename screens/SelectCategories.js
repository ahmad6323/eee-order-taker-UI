import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Text} from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import SafeScreen from "../components/SafeScreen";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import { saveCategory, getSubCategories } from "../utilty/catUtility";

function SelectCategory({ navigation, route }) {

  const [isEmptyError, setIsEmptyError] = useState(false);

  const [disableMain, setDisableMain] = useState(false);
  const [category, setCategory] = useState(null);
  const [subCategories, setSubcategories] = useState([""]);

  const { category_id } = route?.params; 

  useEffect(() => {

    if(category_id !== null && category_id !== undefined){
      setDisableMain(true);
      getSubs();
    }else{
      setDisableMain(false);
      setCategory(null);
      setSubcategories([]);
    }
  }, []);

  const addSubCategoryValue = (text) => {

  }

  const getSubs = async () => {
    try {
      const response = await getSubCategories(category_id);
      setCategory(response.data);
      setSubcategories(response.data.subCategories);
    } catch (error) {
      console.error("Error fetching sub category:", error);
    }
  };

  const handleSubmit = async () => {
    console.log(category);
    console.log(subCategories);
  };

  const removeSubCategory = (subcategoryName) => {
    setSubcategories(prevSubCategories => {
      if (!subcategoryName) {
        return prevSubCategories.slice(0, -1);
      } else {
        return prevSubCategories.filter(subcategory => subcategory !== subcategoryName);
      }
    });
  };

  return (
    <SafeScreen style={{ paddingTop: 50 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.innerContainer, { marginVertical: 10 }]}>
          <View style={styles.logoContainer}>
            <AppText style={styles.logo}>Defining Category</AppText>
            <AppText style={styles.subText}>
              All details related to category
            </AppText>
          </View>
          <View style={{ marginVertical: 8 }}>
            <AppText style={{ fontSize: 18 }}>Category No. 1</AppText>
            <AppTextInput
              placeholder={"Main Category"}
              editable={!disableMain}
              onChangeText={(text) => {
                setCategory(text);
              }}
              value={category && category.name}
            />
          </View>
          <View style={{ marginVertical: 8 }}>
            <AppText style={{ fontSize: 18 }}>Sub Categories</AppText>
            {subCategories.map((subCategory, index) => (
              <AppTextInput
                key={index}
                placeholder={`Sub Category ${index + 1}`}
                onChangeText={(text) => {
                  const updatedSubCategories = [...subCategories];
                  updatedSubCategories[index] = text;
                  setSubcategories(updatedSubCategories);
                }}
                value={subCategory.name}
                showDeleteIcon={true}
                onDelete={()=>{removeSubCategory(subCategory)}}
              />
            ))}
            <TouchableOpacity onPress={() => setSubcategories([...subCategories, {name: ""}])}>
              <Text>Add Sub Category</Text>
            </TouchableOpacity>
          </View>
        </View>
        {isEmptyError && (
          <AppText style={styles.errorText}>
            Please fill in both fields.
          </AppText>
        )}
        <AppButton
          style={{ width: "80%" }}
          title={"Done"}
          onPress={handleSubmit}
        />
      </ScrollView>
    </SafeScreen>
  );
}
styles = StyleSheet.create({
  cat: {
    backgroundColor: colors.primary,
    width: "100%",
    height: 50,
    padding: 12,
    borderRadius: 12,
    justifyContent: "center",
    marginVertical: 7,
  },
  categoryContainer: {
    backgroundColor: colors.light,
    width: "90%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    padding: 12,
  },
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 20,
  },
  category: {
    backgroundColor: colors.primary,
    width: "85%",
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    padding: 12,
    marginTop: 20,
  },
  categoryText: {
    color: colors.white,
    fontWeight: "bold",
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
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SelectCategory;
