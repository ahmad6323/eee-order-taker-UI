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
import { getProduct } from "../../utilty/ProductUtility";

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, setCartItems } = useCart();
  const [location, setLocation] = useState(null);
  const [isPlaceOrderEnabled, setIsPlaceOrderEnabled] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(true);
  const [offlineOrders, setOfflineOrders] = useState([]);

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

    fetchLocation();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      if (state.isConnected && offlineOrders.length > 0) {
        // If online and there are offline orders, place them
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
        source={{ uri: item.imageUrl }}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemDetailsContainer}>
        <Text style={styles.itemName}>{item.pname}</Text>
        <Text>Size: {item.size}</Text>
        <Text>Color: {item.color}</Text>
        <Text>Quantity: {item.quantity}</Text>
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => removeFromCart(item._id)}
        >
          <Icon name="trash" size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handlePlaceOrder = async () => {
    try {
      if (!location) {
        Alert.alert(
          "Location Not Available",
          "Please wait while we fetch your current location."
        );
        return;
      }

      const orderData = cartItems.map((item) => ({
        ...item,
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      }));

      const isConnected = await NetInfo.fetch().then(
        (state) => state.isConnected
      );

      if (isConnected) {
        await saveOrder(orderData);
        setCartItems([]);
        navigation.navigate("done");
      } else {
        await storeOfflineOrder(orderData);
        Alert.alert(
          "Offline Order Stored",
          "Order will be placed when the internet connection is available."
        );
      }
    } catch (error) {
      navigation.navigate("fail", error.response?.data);
    }
  };

  const storeOfflineOrder = async (orderData) => {
    try {
      const existingOrders = await AsyncStorage.getItem("offlineOrders");
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      orders.push(orderData);
      await AsyncStorage.setItem("offlineOrders", JSON.stringify(orders));
      console.log("Stored offline order:", orderData); // Add this log statement
    } catch (error) {
      console.error("Error storing offline order:", error);
    }
  };

  const placeOfflineOrders = async () => {
    try {
      const existingOrders = await AsyncStorage.getItem("offlineOrders");
      console.log("Existing offline orders:", existingOrders); // Add this log statement
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
          <Text style={styles.placeOrderText}>Place Order</Text>
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
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: colors.light,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetailsContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
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
    fontWeight: "bold",
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
