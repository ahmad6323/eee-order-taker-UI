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

import config from "../../config.json";

const OrderHistorySalesman = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const formatPrice = (price)=>{
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'PKR',
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.salesmanId + Math.floor(Math.random() * (13 + 39)) + 18}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("orderdetail", { order: item })}
            style={styles.orderItem}
          >
            <View style={styles.itemDetails} key={item.salesmanId + Math.floor(Math.random() * (200+31) / 2) + 18}>
              <Text style={styles.itemName}>Salesman: {item.salesmanName}</Text>
              {item.products.map((product, index) => (
                <View key={`${index}-${item.salesmanId}-${product.id}-${Math.floor(Math.random() * (134+51) / 4) + 12}`}>
                  <View key={`${item.salesmanId}-${product.id}-details-${Math.floor(Math.random() * (133+29) / 3) + 7}`}>
                    <Text style={styles.itemName}>{product.name}</Text>
                    <Text style={styles.quantity}>{formatPrice(product.price)} /-</Text>
                    {product.variations.map((variation, index2) => (
                      <Text key={`${index2}-${item.salesmanId}-${product.id}-${variation.sku}-${Math.floor(Math.random() * (125+25) / 5) + 9}`} style={styles.quantity}>
                        SKU: {variation.sku} - {variation.quantity}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
              <Text style={styles.price}>Price: {formatPrice(item.totalBill)} /-</Text>
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
    fontFamily: "Bold",
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
    resizeMode: "contain"
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: "Bold",
  },
  color: {
    fontSize: 14,
    color: "#666",
  },
  size: {
    fontSize: 14,
    fontFamily: "Bold",
    top: 17,
  },
  quantity: {
    fontSize: 14,
    fontFamily: "Poppins"
  },
  price: {
    fontSize: 14,
    fontFamily: "Bold",
  },
});

export default OrderHistorySalesman;
