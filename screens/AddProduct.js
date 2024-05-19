import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppFormPicker from "../components/forms/AppFormPicker";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";
import SafeScreen from "../components/SafeScreen";
import { saveProduct } from "../utilty/ProductUtility";
import { getDepartments } from "../utilty/deptUtility";
import { getAllSubCategories } from "../utilty/catUtility";
import { getSizes } from "../utilty/sizeUtility";
import { getColors } from "../utilty/colorUtility";
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as FileSystem from "expo-file-system";


function AddProduct({ navigation }) {

  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sizesData = await getSizes();
        const colors = await getColors();
        setColors(colors.data);
        setSizes(sizesData.data);
        setError(false);
        setErrorVisible(false);
      } catch (error) {
        setError(error);
        setErrorVisible(true);
        console.error("Error fetching sizes:", error);
      }
    };

    const fetchCategoriesAndDepartments = async () => {
      try {
        const categoriesData = await getAllSubCategories();
        const departmentsData = await getDepartments();
        setCategories(categoriesData.data);
        setDepartments(departmentsData.data);
      } catch (error) {
        console.error("Error fetching categories and departments:", error);
      }
    };

    fetchData();
    fetchCategoriesAndDepartments();
  }, []);

  const handleSubmit = async (productData) => {
    try {

      let formData = new FormData();

      formData.append('name', productData.name);
      formData.append('category',productData.category.value);
      formData.append('price', productData.price);
      formData.append('description', productData.description);
      formData.append('department', JSON.stringify(selected));
      formData.append('colors', JSON.stringify(selectedColors));
      formData.append('sizes', JSON.stringify(selectedSizes));

      await Promise.all(productData.imageUrl.map(async (uri) => {
        const base64String = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        return base64String;
      })).then(async (base64Array)=>{
        formData.append("imageUrl",base64Array);

        let data = getFormDataContent(formData);
  
        let parsedData = {
          ...data,
          colors: JSON.parse(data.colors),
          department: JSON.parse(data.department),
          sizes: JSON.parse(data.sizes)
        };
  
        await saveProduct(parsedData);
        navigation.navigate("profiles");
      });
    } catch (error) {
      console.log(error);
    }
  };

  function getFormDataContent(formData) {
    const data = {};
    formData._parts.forEach(part => {
      const [key, value] = part;
      if (data[key]) {
        data[key] = [].concat(data[key], value);
      } else {
        data[key] = value;
      }
    });
    return data;
  }
  
  return (
    <ScrollView>
      <SafeScreen>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.logoContainer}>
              <AppText style={styles.logo}>Add Product</AppText>
              <AppText style={styles.subText}>
                Provide the details to add a new product
              </AppText>
            </View>
            <View style={styles.formContainer}>
              <AppForm
                initialValues={{
                  name: "",
                  category: "",
                  department: "",
                  price: "",
                  sizes: selectedSizes,
                  colors: selectedColors,
                  imageUrl: [],
                  description: "",
                }}
                onSubmit={handleSubmit}
              >
                <AppErrorMessage error={error} visible={errorVisible} />
                <AppFormField
                  name="name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Enter name"
                />
                <AppFormPicker
                  items={categories.map((cat) => ({
                    label: `${cat.name} / ${cat.parent_id.name}`,
                    value: cat._id,
                  }))}
                  name="category"
                  placeholder="Category"
                  width="98%"
                />
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
                  searchPlaceholder="Search..."
                  value={selected}
                  onChange={item => {
                    setSelected(item);
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
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={colors.map((color) => ({
                    label: color.color,
                    value: color._id,
                  }))}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Colors"
                  searchPlaceholder="Search..."
                  value={selectedColors}
                  onChange={item => {
                    setSelectedColors(item);
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
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={sizes.map((size) => ({
                    label: size.size,
                    value: size._id,
                  }))}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Sizes"
                  searchPlaceholder="Search..."
                  value={selectedSizes}
                  onChange={item => {
                    setSelectedSizes(item);
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
                <AppFormField
                  name="price"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Price per unit"
                />
                <AppFormImagePicker name="imageUrl" />
                <AppFormField
                  maxLength={225}
                  multiline
                  numberOfLines={3}
                  name="description"
                  placeholder="Descriptions"
                />
                <SubmitButton title="Submit" />
              </AppForm>
            </View>
          </View>
        </View>
      </SafeScreen>
    </ScrollView>
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
  icon: {
    marginRight: 5,
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
  sizeInputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default AddProduct;
