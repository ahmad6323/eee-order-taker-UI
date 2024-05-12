import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import * as Yup from "yup";
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
import { getCategories } from "../utilty/catUtility";
import { getSizes } from "../utilty/sizeUtility";
import { getColors } from "../utilty/colorUtility";
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

function AddProduct({ navigation }) {

  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [colorFields, setColorFields] = useState([{ name: "", sizes: {} }]);
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
        const categoriesData = await getCategories();
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
      const transformedData = {
        name: productData.name,
        category: productData.category.value,
        department: selected,
        price: productData.price,
        colors: selectedColors,
        sizes: selectedSizes,
        description: productData.description,
        imageUrl: productData.imageUrl,
      };

      // Create a new FormData object
      let formData = new FormData();

      // Loop through the imageUrl array and append each image
      transformedData.imageUrl.forEach((imagePath, index) => {
        // Read the image file as a stream
        const imageStream = fs.createReadStream(imagePath);

        // Append the image to the formData object
        formData.append(`images[${index}]`, imageStream);
      });

      // Append other fields to the formData object
      formData.append('name', transformedData.name);
      formData.append('category', transformedData.category);
      formData.append('department', transformedData.department);
      formData.append('price', transformedData.price);
      formData.append('colors', JSON.stringify(transformedData.colors));
      formData.append('sizes', JSON.stringify(transformedData.sizes));
      formData.append('description', transformedData.description);

      await saveProduct(formData);
      navigation.navigate("profiles");
    } catch (error) {
      console.log(error.response.data);
    }
  };

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
                    label: `${cat.mainCategory} / ${cat.subCategory}`,
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
                  search
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
                  selectedStyle={styles.selectedStyle}
                />
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  search
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
                  selectedStyle={styles.selectedStyle}
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
                  selectedStyle={styles.selectedStyle}
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
