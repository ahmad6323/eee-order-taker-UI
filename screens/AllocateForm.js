import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import * as Yup from "yup";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import AppFormPicker from "../components/forms/AppFormPicker";
import { getSalesmans } from "../utilty/salesmanUtility";
import { getProducts } from "../utilty/ProductUtility";
import { allocate } from "../utilty/allocationUtility";
import { getSizes } from "../utilty/sizeUtility";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  salesmanId: Yup.object().required().label("Salesman ID"),
  productId: Yup.object().required().label("Product ID"),
  colors: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().min(1).max(15).required().label("Color"),
      sizes: Yup.object().shape({
        xs: Yup.number().min(0).required().default(0).label("XS"),
        s: Yup.number().min(0).required().default(0).label("S"),
        m: Yup.number().min(0).required().default(0).label("M"),
        l: Yup.number().min(0).required().default(0).label("L"),
        xl: Yup.number().min(0).required().default(0).label("XL"),
      }),
    })
  ),
});

function AllocateForm({ navigation }) {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [salesmen, setSalesmen] = useState([]);
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colorFields, setColorFields] = useState([{ name: "", sizes: {} }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: salesmenData } = await getSalesmans();
        const { data: productsData } = await getProducts();
        const { data: sizesData } = await getSizes();
        setSalesmen(salesmenData);
        setProducts(productsData);
        setSizes(sizesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddColorField = () => {
    setColorFields([...colorFields, { name: "", sizes: {} }]);
  };

  const handleColorChange = (index, name) => {
    const updatedColorFields = [...colorFields];
    updatedColorFields[index].name = name;
    updatedColorFields[index].sizes = sizes.reduce((acc, size) => {
      acc[size.size] = updatedColorFields[index].sizes[size.size] || 0;
      return acc;
    }, {});
    setColorFields(updatedColorFields);
  };

  const handleSizeChange = (colorIndex, sizeKey, value) => {
    setColorFields((prevColorFields) => {
      const updatedColorFields = [...prevColorFields];
      updatedColorFields[colorIndex].sizes[sizeKey] = parseInt(value, 10) || 0;
      return updatedColorFields;
    });
  };

  const handleRemoveColorField = (index) => {
    const updatedColorFields = [...colorFields];
    updatedColorFields.splice(index, 1);
    setColorFields(updatedColorFields);
  };
  const handleSubmit = async (info) => {
    const { salesmanId, productId } = info;
    const productAllocationData = {
      salesmanId: salesmanId.value,
      productId: productId.value,
      allocations: colorFields,
    };
    try {
      console.log("Product allocation data:", productAllocationData);
      const response = await allocate(productAllocationData);
      console.log("Allocation successful:", response.data);
      navigation.navigate("allocation");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
        setErrorVisible(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <AppForm
          initialValues={{
            salesmanId: "",
            productId: "",
            colors: colorFields,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppErrorMessage error={error} visible={errorVisible} />
          <AppFormPicker
            items={salesmen.map((salesman) => ({
              label: salesman.name,
              value: salesman._id,
            }))}
            name="salesmanId"
            placeholder="Select Salesman"
            width="98%"
          />
          <AppFormPicker
            items={products.map((product) => ({
              label: product.name,
              value: product._id,
            }))}
            name="productId"
            placeholder="Select Product"
            width="98%"
          />
          {colorFields.map((colorField, index) => (
            <View key={index}>
              <AppFormField
                name={`colors[${index}].name`}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Color"
                value={colorField.name}
                onChangeText={(name) => handleColorChange(index, name)}
              />
              <View style={styles.sizeInputContainer}>
                {sizes?.map((size) => (
                  <AppFormField
                    width={"30%"}
                    key={size?.size}
                    name={`colors[${index}].sizes.${size.size}`}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={`${size.size}`}
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      handleSizeChange(index, size.size, value)
                    }
                  />
                ))}
              </View>
              <TouchableOpacity onPress={() => handleRemoveColorField(index)}>
                <Text style={{ color: colors.danger }}>Remove Color</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity onPress={handleAddColorField}>
            <Text style={{ color: colors.secondary, marginBottom: 5 }}>
              Add Color
            </Text>
          </TouchableOpacity>
          <SubmitButton title="Allocate" />
        </AppForm>
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
  innerContainer: {
    width: "80%",
  },
  sizeInputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default AllocateForm;
