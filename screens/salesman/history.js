import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const History = ({ route }) => {
  const orders = route.params;
  console.log(orders);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item._id} // Assuming _id is the unique identifier for orders
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Image source={{ uri: item.pimage[0] }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.pname}</Text>
              <Text style={styles.color}>Color: {item.color}</Text>
              <Text style={styles.size}>Size: {item.size}</Text>
              <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
              <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
              <View style={styles.line} />
            </View>
          </View>
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

export default History;
