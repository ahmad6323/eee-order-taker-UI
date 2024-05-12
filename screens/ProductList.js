import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import SafeScreen from "../components/SafeScreen";
import { AntDesign } from "@expo/vector-icons";

const dummyProducts = [
  {
    id: 1,
    name: "T-Shirt",
    description: "Black / M",
    price: 500,
    image: require("../assets/noimage.jpg"),
  },
  {
    id: 2,
    name: "Pants",
    description: "Blue / L",
    price: 800,
    image: require("../assets/noimage.jpg"),
  },
  {
    id: 3,
    name: "Suit",
    description: "Grey / XL",
    price: 1500,
    image: require("../assets/noimage.jpg"),
  },
];

function ProductList() {
  const [counts, setCounts] = useState({});

  const incrementCount = (productId) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1,
    }));
  };

  const decrementCount = (productId) => {
    setCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      if (newCounts[productId] > 0) {
        newCounts[productId]--;
      }
      return newCounts;
    });
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const productId in counts) {
      const product = dummyProducts.find(
        (item) => item.id.toString() === productId
      );
      totalPrice += counts[productId] * product.price;
    }
    return totalPrice;
  };

  return (
    <SafeScreen style={{ paddingTop: 50 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.logoContainer}>
            <AppText style={styles.logo}>Product List</AppText>
            <AppText style={styles.subText}>List of added products</AppText>
          </View>
          <View style={styles.totalPriceContainer}>
            <AppText style={styles.totalPriceText}>
              Total Price: PKR {calculateTotalPrice()}
            </AppText>
          </View>
        </View>
        {dummyProducts.map((product) => (
          <View key={product.id} style={styles.productContainer}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={product.image} />
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.detailsTextContainer}>
                <AppText style={styles.productName}>{product.name}</AppText>
                <AppText style={styles.productDescription}>
                  {product.description}
                </AppText>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => decrementCount(product.id.toString())}
                >
                  <AntDesign
                    name="minuscircleo"
                    size={24}
                    color={colors.medium}
                  />
                </TouchableOpacity>
                <AppText style={styles.quantity}>
                  {counts[product.id] || 0}
                </AppText>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => incrementCount(product.id.toString())}
                >
                  <AntDesign
                    name="pluscircleo"
                    size={24}
                    color={colors.medium}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.priceContainer}>
              <AppText style={styles.price}>PKR {product.price}</AppText>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
  innerContainer: {
    width: "80%",
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: "flex-start",
  },
  logo: {
    color: colors.dark,
    fontSize: 35,
    fontWeight: "bold",
  },
  subText: {
    color: colors.medium,
    fontSize: 16,
  },
  productContainer: {
    width: "90%",
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: colors.light,
    borderRadius: 15,
    overflow: "hidden",
  },
  imageContainer: {
    width: "30%",
    height: 110,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 13,
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  detailsTextContainer: {},
  productName: {
    fontWeight: "bold",
  },
  productDescription: {
    color: colors.medium,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: colors.light,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    marginHorizontal: 10,
  },
  priceContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.light,
  },
  price: {
    fontWeight: "bold",
  },
  totalPriceContainer: {
    marginBottom: 10,
    alignItems: "flex-end",
  },
  totalPriceText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ProductList;
