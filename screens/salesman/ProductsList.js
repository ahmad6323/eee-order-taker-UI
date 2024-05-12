// Import useState and TextInput
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput, // Add this import
} from "react-native";
import colors from "../../config/colors";
import { getProducts, deleteProduct } from "../../utilty/ProductUtility";
import SafeScreen from "../../components/SafeScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "../../components/AppText";
import { getAllocations } from "../../utilty/allocationUtility";
import { UserContext } from "../../UserContext";

const ProductsList = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        const allProducts = response.data; // Assuming response.data is an array of products

        // Fetch allocations for the current user
        const allocationsResponse = await getAllocations(user._id);
        const allocations = allocationsResponse.data;

        // Filter products based on allocations
        const filteredProducts = allProducts.filter((product) => {
          // Check if there are allocations for this product
          const allocation = allocations.find(
            (allocation) => allocation.productId._id === product._id
          );

          if (!allocation) {
            return false; // Exclude products without allocations
          }

          // Check if the salesmanId in allocations matches the user's _id
          return allocation.salesmanId._id === user._id;
        });

        setProducts(filteredProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductPress = (product) => {
    navigation.navigate("listdetail", { product });
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeScreen>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <AppText style={styles.logo}>All Available Products</AppText>
            <AppText style={styles.subText}>
              List of all industry products
            </AppText>
          </View>
          {/* Search input */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by product name"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          {/* Render filtered products */}
          {filteredProducts.length === 0 ? (
            <View style={styles.loadingContainer}>
              <Text>No Products!</Text>
            </View>
          ) : (
            filteredProducts.map((product, index) => (
              <TouchableOpacity
                onPress={() => handleProductPress(product)}
                style={styles.productContainer}
                key={index}
              >
                <Image
                  source={{ uri: product.imageUrl[0] }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.card}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.name}>{product.name}</Text>

                    {/* {product.colors.map((color, colorIndex) => (
                      <View key={colorIndex}>
                        <Text style={styles.color}>{color.name}</Text>
                        <View style={styles.sizeContainer}>
                          {Object.entries(color.sizes).map(
                            ([sizeKey, sizeValue]) => (
                              <Text key={sizeKey} style={styles.size}>
                                {sizeKey}: {sizeValue}
                              </Text>
                            )
                          )}
                        </View>
                      </View>
                    ))} */}

                    <Text style={styles.description}>
                      {product.description}
                    </Text>
                  </View>
                  <View style={styles.actionsContainer}>
                    <Text style={styles.price}>${product.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

// Styles...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
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
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  productContainer: {
    marginBottom: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  card: {
    backgroundColor: colors.light,
    padding: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.dark,
  },
  bold: {
    fontWeight: "bold",
  },
  color: {
    marginBottom: 5,
    color: colors.medium,
    fontWeight: "bold",
  },
  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  size: {
    marginRight: 10,
    marginBottom: 5,
    color: colors.medium,
  },
  description: {
    marginBottom: 5,
    color: colors.medium,
  },
  actionsContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.danger,
    marginLeft: 10,
  },
  // Search input styles
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
    width: "100%",
  },
  searchInput: {
    borderWidth: 1,

    borderColor: colors.medium,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.white,
  },
});

export default ProductsList;
