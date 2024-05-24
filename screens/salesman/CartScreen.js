import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { useCart } from "../../CartContext";
import colors from "../../config/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import { saveOrder } from "../../utilty/orderUtility";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import config from "../../config.json";

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart } = useCart();
  const [location, setLocation] = useState(null);
  const [isPlaceOrderEnabled, setIsPlaceOrderEnabled] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(true);
  const [offlineOrders, setOfflineOrders] = useState([]);
  const [totalBill, setTotalBill] = useState(0);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Location permission is required to place an order."
          );
          return;
        }

        let userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation);
        setIsPlaceOrderEnabled(true);
      } catch (error) {
        console.error("Error getting location:", error);
      } finally {
        setIsFetchingLocation(false);
      }
    };

    if(cartItems){
      let finalBill = 0;
      cartItems.map((item)=>{
        const totalOfVariant = parseInt(getBillForVariation(item.variations,item.pricePerUnit));
        finalBill += totalOfVariant;
      });
      const formattedTotal = finalBill.toLocaleString('en-US', {
        style: 'currency',
        currency: 'PKR',
      });
      setTotalBill(formattedTotal);
    }

    fetchLocation();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      if (state.isConnected && offlineOrders.length > 0) {
        await placeOfflineOrders();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [offlineOrders]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: `${config.pictureUrl}/public/products/${item.image}` }}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemDetailsContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Price Per Unit: {item.pricePerUnit} PKR</Text>
        <Text style={{
          fontSize: 16,
        }}>Variation SKU & Quantity</Text>
        {
          item.variations.map((variation,index)=>{
            return <Text key={index}>{variation.sku + " - " + variation.quantity}</Text>
          })
        }
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        > 
          <Text
            style={{
              fontSize: 16,
              marginTop: 5
            }}
          >
            Price: {calculateTotal(item.variations,item.pricePerUnit)} /-
          </Text>
          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={() => removeFromCart(item._id)}
          >
            <Icon name="trash" size={20} color={colors.danger} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  function calculateTotal(variations, fixedPrice) {
    if (!Array.isArray(variations) || typeof fixedPrice !== 'number') {
      throw new TypeError('Invalid arguments: variations must be an array and fixedPrice must be a number');
    }
    const total = variations.reduce((total, variation) => total + (variation.quantity * fixedPrice), 0);
    const formattedTotal = total.toLocaleString('en-US', {
      style: 'currency',
      currency: 'PKR',
    });
    return formattedTotal;
  }

  function getBillForVariation(variations, fixedPrice) {
    if (!Array.isArray(variations) || typeof fixedPrice !== 'number') {
      throw new TypeError('Invalid arguments: variations must be an array and fixedPrice must be a number');
    }
    return variations.reduce((total, variation) => total + (variation.quantity * fixedPrice), 0);
  }

  const handlePlaceOrder = async () => {
    try {
      if (!location) {
        Alert.alert(
          "Location Not Available",
          "Please wait while we fetch your current location."
        );
        return;
      }

      const orderData = {
        items: cartItems,
        totalPrice: totalBill,
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      };

      navigation.navigate("customer_details",{orderData});

      // await saveOrder(orderData);
      
      // const isConnected = await NetInfo.fetch().then(
      //   (state) => state.isConnected
      // );
      // test pending for offline orders placement
      // if (isConnected) {
      //   setCartItems([]);
      //   navigation.navigate("done");
      // } else {
      //   await storeOfflineOrder(orderData);
      //   Alert.alert(
      //     "Offline Order Stored",
      //     "Order will be placed when the internet connection is available."
      //   );
      // }
    } catch (error) {
      console.log(error);
      navigation.navigate("fail", error.response?.data);
    }
  };

  const storeOfflineOrder = async (orderData) => {
    try {
      const existingOrders = await AsyncStorage.getItem("offlineOrders");
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      orders.push(orderData);
      await AsyncStorage.setItem("offlineOrders", JSON.stringify(orders));
      console.log("Stored offline order:", orderData); 
    } catch (error) {
      console.error("Error storing offline order:", error);
    }
  };

  const placeOfflineOrders = async () => {
    try {
      const existingOrders = await AsyncStorage.getItem("offlineOrders");
      console.log("Existing offline orders:", existingOrders); 
      if (existingOrders) {
        const orders = JSON.parse(existingOrders);
        for (const order of orders) {
          await saveOrder(order);
          console.log("Placed offline order:", order);
          // Add this log statement
        }
        await AsyncStorage.removeItem("offlineOrders");
        setOfflineOrders([]);
        navigation.navigate("done");
      }
    } catch (error) {
      console.error("Error placing offline orders:", error);
      navigation.navigate("fail");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {cartItems.length > 0
          ? "Your Added Items in Cart"
          : "Your Cart Is Empty"}
      </Text>
      {cartItems.length === 0 ? (
        <Text style={styles.noItemText}>No items added to cart yet.</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <View style={styles.buttonContainer}>
        {cartItems.length > 0 && isFetchingLocation && (
          <Text style={{ marginVertical: 10, color: colors.danger }}>
            Please wait to place order, we are fetching your location.
          </Text>
        )}
        <TouchableOpacity
          style={[
            styles.placeOrderButton,
            {
              opacity: cartItems.length === 0 || !isPlaceOrderEnabled ? 0.5 : 1,
            },
          ]}
          disabled={cartItems.length === 0 || !isPlaceOrderEnabled}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Place Order - {totalBill}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  heading: {
    fontSize: 24,
    fontFamily: "Bold",
    marginBottom: 20,
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: colors.light,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  itemImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: "contain"
  },
  itemDetailsContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontFamily: "Bold",
    marginBottom: 10,
  },
  itemPrice: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    alignSelf: "center",
  },
  placeOrderButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    width: "100%",
  },
  placeOrderText: {
    color: colors.light,
    fontSize: 18,
    fontFamily: "Bold",
  },
  noItemText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },

  loadingText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
});

export default CartScreen;
