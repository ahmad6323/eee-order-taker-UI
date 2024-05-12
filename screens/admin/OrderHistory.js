import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getOrders } from "../../utilty/orderUtility";

const OrderHistoryScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders when the component mounts
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Handle error
      }
    };

    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item._id} // Assuming _id is the unique identifier for orders
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("orderdetail", { order: item })}
            style={styles.orderItem}
          >
            <Image source={{ uri: item.pimage[0] }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.pname}</Text>
              <Text style={styles.color}>Color: {item.color}</Text>
              <Text style={styles.size}>Size: {item.size}</Text>
              <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
              <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
              <View style={styles.line} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 52,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 46,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 56,
  },
  line: {
    marginTop: 10,
    borderBottomColor: "#666",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  color: {
    fontSize: 14,
    color: "#666",
  },
  size: {
    fontSize: 14,
    fontWeight: "bold",
    top: 17,
  },
  quantity: {
    fontSize: 14,
    fontWeight: "bold",
    left: 130,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    left: 130,
  },
});

export default OrderHistoryScreen;
