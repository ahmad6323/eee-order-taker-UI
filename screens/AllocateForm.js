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
import { allocate, getProductsForSalesman } from "../utilty/allocationUtility";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { ScrollView } from "react-native-gesture-handler";
import AppFormFieldCustom from "../components/forms/AppFormFieldCustom";
import AppFormPickerCustom from "../components/forms/AppFormPickerCustom";

function AllocateForm({ navigation }) {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [salesmen, setSalesmen] = useState([]);
  const [products, setProducts] = useState([]);

  const [allocations, setAllocations] = useState([]);

  const values = {
    salesmanId: "",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: salesmenData } = await getSalesmans();
        setSalesmen(salesmenData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleSubmit = async (info) => {
    // Clean the allocations and extract only the value from productId
    // Step 1: Clean the allocations
    const cleanedAllocations = allocations.map(allocation => ({
      productId: allocation.productId,
      variation: allocation.variation.value,
      quantity: allocation.quantity
    }));

    // Step 2: Filter out allocations with quantity zero
    const filteredAllocations = cleanedAllocations.filter(allocation => allocation.quantity !== 0);

    if(filteredAllocations.length === 0){
      setError("No products were allocated!");
      setErrorVisible(true)
      return;
    }

    // Combine the cleaned allocations with the values object
    const result = {
      ...info,
      allocations: filteredAllocations
    };

    if(result.salesmanId.length === 0){
      setError("No product was allocated!");
      setErrorVisible(true)
      return;
    }else{
      try {
        await allocate(result);
        navigation.navigate("allocation");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError(error.response.data);
          setErrorVisible(true);
        }
      }
    }

  };

  const productsForSalesman = async (salesman)=>{
    if(salesman.value.length > 0){
      const { data } = await getProductsForSalesman(salesman.value);
      setProducts(data);
      setAllocations([{productId: "", variation: {}, quantity: 0}]);
    }
  }

  const handleRemoveAllocation = (index) => {
    const newAllocations = allocations.filter((_, i) => i !== index);
    setAllocations(newAllocations);
  };

  const handleProductIdChange = (index, variation) => {
    const updatedAllocations = [...allocations];
    updatedAllocations[index].variation = variation;

    const getProduct = products.filter(prod => prod._id === variation["value"])[0];
    updatedAllocations[index].productId = getProduct.productId._id;

    setAllocations(updatedAllocations);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedAllocations = [...allocations];
    updatedAllocations[index].quantity = quantity;
    setAllocations(updatedAllocations);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <AppForm
            initialValues={values}
            onSubmit={handleSubmit}
          >
            <AppText>
              Allocate Products to Salesman
            </AppText>
            <AppErrorMessage error={error} visible={errorVisible} />
            <AppFormPicker
              items={salesmen.map((salesman) => ({
                label: salesman.name,
                value: salesman._id,
              }))}
              name="salesmanId"
              placeholder="Select Salesman"
              width="98%"
              onSelectItem={productsForSalesman}
            />
            {
              allocations.map((allocation,index) => {
                return <View
                  key={index}
                >
                  <AppFormPickerCustom
                    items={products.map((product) => ({
                      label: `${product.productId.name} - ${product.size.size} - ${product.color.color}`,
                      value: product._id,
                    }))}
                    placeholder="Select Product"
                    width="98%"
                    onSelectItem={(value)=>{
                      handleProductIdChange(index,value);
                    }}
                    value={allocation.variation}
                  />
                  <AppFormFieldCustom
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Quantity for this Product"
                    value={allocation.quantity}
                    onChangeText={(value) => handleQuantityChange(index, value)}
                  />
                  <TouchableOpacity onPress={()=>{
                      handleRemoveAllocation(index);
                    }} 
                      disabled={allocations.length === 1}
                      key={index+1500}
                    >
                      <Text style={{ color: colors.danger, marginBottom: 5 }}>
                        Remove Allocation
                      </Text>
                    </TouchableOpacity>
                </View>
              })
            }
            <TouchableOpacity onPress={()=>{
              setAllocations([...allocations, {productId: "", variation: {}, quantity: 0}]);
            }} 
              disabled={products.length === 0}
            >
              <Text style={{ color: colors.secondary, marginBottom: 5 }}>
                Add Allocation
              </Text>
            </TouchableOpacity>
            <SubmitButton title="Allocate" />
          </AppForm>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: "20%"
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
