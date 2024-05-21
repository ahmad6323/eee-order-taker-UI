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
import SafeScreen from "../../components/SafeScreen";
import AppText from "../../components/AppText";
import { getAllocationsForSalesman } from "../../utilty/allocationUtility";
import { UserContext } from "../../UserContext";
import ImageSlider from "../../components/ImageSlider";
import config from "../../config.json"
const pictureEndpoint = config.pictureUrl;

const ProductsList = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allocationsResponse = await getAllocationsForSalesman(user._id);
        setAllocations(allocationsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductPress = (product) => {
    navigation.navigate("listdetail", { product });
  };

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
          {allocations && allocations.map((allocation, index) => (
            <TouchableOpacity
              onPress={() => handleProductPress(allocation)}
              style={styles.productContainer}
              key={index}
            >
              {/* <Image
                source={{ uri: `${pictureEndpoint}/public/products/${allocation.productDetails.imageUrl[0]}` }}
                style={styles.image}
                resizeMode="cover"
              /> */}
              <ImageSlider images={allocation.productDetails.imageUrl} style={styles.image}/>
              <View style={styles.card}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.name}>{allocation.productDetails.name}</Text>
                  <Text style={styles.description}>{allocation.productDetails.description}</Text>
                </View>
                <View style={styles.actionsContainer}>
                  <Text style={styles.price}>{allocation.productDetails.price} PKR</Text>
                  <Text style={styles.variationIds}>
                    {allocation.variations.map(variation => variation._id).join(', ')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
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
