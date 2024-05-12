import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AppText from "../../components/AppText";
import SafeScreen from "../../components/SafeScreen";
import { getdProducts } from "../../utilty/ProductUtility";

const DeptProduct = ({ route }) => {
  const { id, name } = route.params;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getdProducts(id);
        setProducts(response.data); // Assuming the response data is an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <SafeScreen>
      <View style={{ padding: 10, marginHorizontal: 10, marginVertical: 20 }}>
        <AppText style={{ fontSize: 25, fontWeight: "bold" }}>{name}</AppText>
        <AppText>List of added product for this department</AppText>
      </View>
      <View style={styles.container}>
        {products.length === 0 ? (
          <Text>No products available</Text>
        ) : (
          products.map((product, index) => (
            <View style={styles.productContainer} key={index}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: product.imageUrl[0] }}
                  style={styles.productImage}
                  resizeMode="cover"
                  defaultSource={require("../../assets/noimage.jpg")}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.mainLabel}>{product.name}</Text>
                <Text style={styles.subLabel}>{product.description}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>
                  ${product.price.toFixed(2)}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </SafeScreen>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productImage: {
    flex: 1, // Placeholder color for product image
    borderRadius: 5,
    backgroundColor: "#ccc",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  mainLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subLabel: {
    fontSize: 16,
    color: "#777",
  },
  priceContainer: {
    justifyContent: "flex-end",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DeptProduct;
