import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getOrdersSalesman } from "../../utilty/orderUtility";
import config from "../../config.json";
import { UserContext } from "../../UserContext";


const History = () => {

  const { user } = useContext(UserContext);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async (id) => {
      try {
        const fetchedOrders = await getOrdersSalesman(id);
        setOrders(fetchedOrders.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders(user._id);
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
      {
        orders.length === 0 && <Text style={styles.itemName}>No Orders Available to view!</Text>
      }
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderId}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.orderItem}
            key={index}
          >
            <View style={styles.itemDetails}>
              {
                item.items.map((product,index)=>{
                  return <View key={index}>
                    <View>
                      <Text style={styles.itemName}>{product.name}</Text>
                      <Text style={styles.quantity}>{formatPrice(product.pricePerUnit)} /-</Text>
                      {
                        product.variations.map((variation,index2)=>{
                          return (
                            <Text key={index2} style={styles.quantity}>SKU: {variation.sku} - {variation.quantity}</Text>
                          )
                        })
                      }
                    </View>
                  </View>
                })
              }
              <Text style={styles.price}>Price: {item.totalPrice} /-</Text> 
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

export default History;
