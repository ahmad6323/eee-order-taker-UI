import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import colors from "../config/colors";
import { getProducts, deleteProduct } from "../utilty/ProductUtility";
import SafeScreen from "../components/SafeScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "../components/AppText";
import ImageSlider from "../components/ImageSlider";
import config from "../config.json";

const pictureEndpoint = config.pictureUrl + "/public/products";

const AddedProducts = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [isListView, setIsListView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeScreen>
      <ScrollView>
        <View style={styles.header}>
          <View style={{}}>
            <AppText style={styles.logo}>Added Products</AppText>
            <AppText style={styles.subText}>List of added products</AppText>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => setIsListView(false)}>
              <MaterialCommunityIcons
                name="view-grid"
                size={24}
                color={isListView ? colors.medium : colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsListView(true)}>
              <MaterialCommunityIcons
                name="view-list"
                size={24}
                color={isListView ? colors.primary : colors.medium}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by product name"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.container}>
          {filteredProducts.length === 0 ? (
            <Text>No Products!</Text>
          ) : isListView ? (
            filteredProducts.map((product, index) => (
              <View style={styles.listItemContainer} key={index}>
                <Image
                  source={{uri: `${pictureEndpoint}/${product.imageUrl[0]}`}}
                  style={styles.listItemImage}
                  resizeMode="cover"
                  defaultSource={require("../assets/noimage.jpg")}
                />
                <View style={styles.listItemDetails}>
                  <Text style={[styles.listItemName, {}]}>{product.name}</Text>
                  <Text style={styles.listItemDescription}>
                    {product.description}
                  </Text>
                  <Text style={styles.listItemPrice}>Rs. {product.price}</Text>
                  <View style={{flexDirection: "row", alignSelf: "flex-end"}}>
                    <MaterialCommunityIcons
                      name="delete"
                      size={25}
                      color={colors.primary}
                      onPress={() => handleDelete(product._id)}
                    />
                    <MaterialCommunityIcons
                      name="pencil"
                      size={25}
                      color={colors.primary}
                    />
                  </View>
                </View>
              </View>
            ))
          ) : (
            filteredProducts.map((product, index) => (
              <View
                style={styles.productContainer}
                key={index}
              >
                <ImageSlider images={product.imageUrl} style={styles.image}/>
                <View style={styles.card}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.variationHeading}>Variations</Text>
                    {product.variations.map((variation, variationIndex) => (
                      <View key={variationIndex}>
                        <Text style={styles.color}>{variation.color.color.trim() + " - " + variation.size.size.trim() + " - " + variation.SKU.trim()}</Text>
                      </View>
                    ))}
                    <Text style={styles.description}>
                      {product.description}
                    </Text>
                    <Text style={styles.price}>Rs. {product.price}</Text>
                  </View>
                  <View style={styles.actionsContainer}>
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                      <MaterialCommunityIcons
                        name="delete"
                        size={25}
                        color={colors.primary}
                        onPress={() => handleDelete(product._id)}
                      />
                      <MaterialCommunityIcons
                        name="pencil"
                        size={25}
                        color={colors.primary}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  logo: {
    color: colors.dark,
    fontSize: 25,
    fontFamily: "Bold",
    fontFamily: "Poppins"
  },
  subText: {
    color: colors.medium,
    fontSize: 16,
    fontFamily: "Poppins"
  },
  iconContainer: {
    flexDirection: "row",
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.medium,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 20,
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
    fontFamily: "Bold",
    marginBottom: 5,
    color: colors.dark,
    fontFamily: "Poppins"
  },
  variationHeading: {
    fontSize: 17,
    fontFamily: "Bold",
    marginBottom: 5,
    color: colors.dark,
    fontFamily: "Poppins"
  },
  bold: {
    fontFamily: "Bold",
  },
  color: {
    fontFamily: "Bold",
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
    fontFamily: "Bold",
    color: colors.danger,
    marginLeft: 10,
    fontFamily: "Poppins"
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  listItemImage: {
    width: 90,
    height: 90,
    borderRadius: 5,
    marginRight: 10,
  },
  listItemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  listItemName: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontFamily: "Bold",
    color: colors.dark,
    marginBottom: 5,
    marginTop: 40,
  },
  listItemDescription: {
    marginBottom: 5,
    color: colors.medium,
  },
  listItemPrice: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontFamily: "Bold",
    color: colors.danger,
    marginBottom: 5,
    alignSelf: "flex-end",
  },
  color: {
    fontFamily: "Bold",
    marginBottom: 5,
    color: colors.medium,
  },
  bold: {
    fontFamily: "Bold",
  },
  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  sizeText: {
    marginRight: 10,
  },
});

export default AddedProducts;
