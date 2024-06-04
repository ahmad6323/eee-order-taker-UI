import React, { useState } from "react";
import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import AppFormField from "../../components/forms/AppFormField";
import SubmitButton from "../../components/forms/SubmitButton";
import AppForm from "../../components/forms/AppForm";
import AppErrorMessage from "../../components/forms/AppErrorMessage";
import colors from "../../config/colors";
import AppText from "../../components/AppText";
import { useCart } from "../../CartContext";
import * as yup from "yup";
import { saveOrder } from "../../utilty/orderUtility";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { Snackbar } from "react-native-paper";
import SafeScreen from "../../components/SafeScreen";

const customerDetailValidation = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters"),
  city: yup
    .string()
    .required("City is required")
    .min(2, "City must be at least 2 characters")
    .max(100, "City must be at most 100 characters"),
  address: yup
    .string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be at most 200 characters"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\d{11}$/, "Phone must be exactly 11 digits"),
  remarks: yup.string().max(500, "Remarks must be at most 500 characters"),
});

function Checkout({ navigation, route }) {
  const { orderData } = route.params;

  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => {
    setVisible(false);
    navigation.navigate("done", {
      description:
        "Order is locally stored, and will be processed when device is connected to the internet!",
    });
  };

  const [snackBarMessage, setSnackBarMessage] = useState("");

  const { setCartItems } = useCart();

  let values = {
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    phone: "",
    remarks: "",
  };

  const handleSubmit = async (info) => {
    const finalOrderData = {
      ...orderData,
      customerData: info,
    };

    // offline check
    const isConnected = await NetInfo.fetch().then(
      (state) => state.isConnected
    );

    if (isConnected) {
      // online
      try {
        await saveOrder(finalOrderData);
        navigation.navigate("done", {
          description: "Order is placed successfully!",
        });
        setCartItems([]);
      } catch (ex) {
        console.log(ex);
        setErrorVisible(true);
        setError(ex.response.data);
      }
    } else {
      // case: offline
      await storeOfflineOrder(finalOrderData);
      setCartItems([]);
      setSnackBarMessage(
        "Order is saved, it will be uploaded once the device is connected to the internet!"
      );
      onToggleSnackBar();
    }
  };

  const storeOfflineOrder = async (orderData) => {
    try {
      const existingOrders = await AsyncStorage.getItem("offlineOrders");
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      orders.push(orderData);
      await AsyncStorage.setItem("offlineOrders", JSON.stringify(orders));
    } catch (error) {
      console.error("Error storing offline order:", error);
    }
  };

  return (
    <ScrollView>
      <SafeScreen>
        <View style={styles.container}>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              label: "Okay",
              onPress: () => {
                onDismissSnackBar();
              },
            }}
          >
            {snackBarMessage}
          </Snackbar>
          <View style={styles.innerContainer}>
            <View style={styles.logoContainer}>
              <Button
                onPress={() => navigation.navigate("cart")}
                title="Cancel"
              />
              <AppText style={styles.logo}>Add Customer Details</AppText>
              <AppText style={styles.subText}>
                Add customers details to confirm...
              </AppText>
            </View>
            <View style={styles.formContainer}>
              <AppForm
                initialValues={values}
                onSubmit={handleSubmit}
                validationSchema={customerDetailValidation}
              >
                <AppErrorMessage error={error} visible={errorVisible} />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      width: "46%",
                      flexDirection: "column",
                    }}
                  >
                    <Text style={styles.labels}>First Name</Text>
                    <AppFormField
                      name={"firstName"}
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder="First Name"
                    />
                  </View>
                  <View
                    style={{
                      width: "47%",
                      flexDirection: "column",
                    }}
                  >
                    <Text style={styles.labels}>Last Name</Text>
                    <AppFormField
                      name={"lastName"}
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder="Last Name"
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <Text style={styles.labels}>City</Text>
                  <AppFormField
                    name={"city"}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="City"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <Text style={styles.labels}>Address</Text>
                  <AppFormField
                    name={"address"}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Address"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <Text style={styles.labels}>Phone No.</Text>
                  <AppFormField
                    name={"phone"}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Phone Number"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <Text style={styles.labels}>Remarks</Text>
                  <AppFormField
                    name={"remarks"}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Remarks"
                  />
                </View>
                <View style={styles.totalParent}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins",
                    }}
                  >
                    Total
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Bold",
                    }}
                  >
                    {orderData && orderData.totalPrice}
                  </Text>
                </View>
                <SubmitButton title={"Place Order"} />
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
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderRadius: 20,
    borderWidth: 1,
    borderTopColor: "gray",
  },
  innerContainer: {
    width: "85%",
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: "flex-start",
  },
  logo: {
    color: colors.dark,
    fontSize: 28,
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
    color: "#333",
    fontSize: 16,
    fontFamily: "Bold",
  },
  placeholderStyle: {
    color: "#999",
    fontFamily: "Poppins",
  },
  labels: {
    fontSize: 16,
    fontFamily: "Bold",
    marginBottom: -5,
  },
  totalParent: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
});

export default Checkout;
