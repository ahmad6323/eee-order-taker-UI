import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import AppFormField from "../../components/forms/AppFormField";
import SubmitButton from "../../components/forms/SubmitButton";
import AppForm from "../../components/forms/AppForm";
import AppErrorMessage from "../../components/forms/AppErrorMessage";
import colors from "../../config/colors";
import AppText from "../../components/AppText";
import { useCart } from "../../CartContext";
import { saveOrder } from "../../utilty/orderUtility";

function Checkout({ navigation, route }) {

  const { orderData } = route.params;

  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);

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
      customerData: info
    }

    try{
      await saveOrder(finalOrderData);
      navigation.navigate("done");
      setCartItems([]);
    }catch(ex){
      console.log(ex);
      setErrorVisible(true);
      setError(ex.response.data);
    }
    
  };
  
  
  const formatPrice = (price)=>{
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'PKR',
    });
  }

  return (
    <View style={styles.container}>
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
          >
            <AppErrorMessage error={error} visible={errorVisible} />
            <View 
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  width:"46%",
                  flexDirection: "column",
                }}
              >
                <Text
                  style={styles.labels}
                >
                  First Name
                </Text>
                <AppFormField
                  name={"firstName"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="First Name"
                />
              </View>
              <View
                style={{
                  width:"47%",
                  flexDirection: "column",
                }}
              >
                <Text
                  style={styles.labels}
                >
                  Last Name
                </Text>
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
                <Text
                  style={styles.labels}
                >
                  City
                </Text>
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
                <Text
                  style={styles.labels}
                >
                  Address
                </Text>
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
                <Text
                  style={styles.labels}
                >
                  Phone No.
                </Text>
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
                <Text
                  style={styles.labels}
                >
                  Remarks
                </Text>
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
                  fontFamily: "Poppins"
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Bold"
                }}
              >
                {
                  orderData && orderData.totalPrice
                }
              </Text>
            </View>
            <SubmitButton title={"Place Order"} />
          </AppForm>
        </View>
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
    color: '#333',
    fontSize: 16,
    fontFamily: 'Bold',
  },
  placeholderStyle: {
    color: '#999', 
    fontFamily: 'Poppins',
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
