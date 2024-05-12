import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Slider } from "react-native-elements";
import colors from "../../config/colors";
import Icon from "react-native-vector-icons/Ionicons"; // Import Ionicons
import { useCart } from "../../CartContext";
import { UserContext } from "../../UserContext";
import { getSizes } from "../../utilty/sizeUtility";
import { getAllocations } from "../../utilty/allocationUtility";

const ProductListDetail = ({ route, navigation }) => {
  const { user } = useContext(UserContext);
  const { product } = route.params;

  const { addToCart, cartItems } = useCart();
  const [sizes, setSizes] = useState({});
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log(selectedSizeIndex);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const allocationsResponse = await getAllocations(user._id);
        const allocations = allocationsResponse.data;

        // Extract all available sizes from allocations where sizes are not 0
        const availableSizes = allocations.reduce((acc, curr) => {
          curr.allocations.forEach((allocation) => {
            if (allocation.sizes.length !== 0) {
              acc = { ...acc, ...allocation.sizes }; // Merge sizes object
            }
          });
          return acc;
        }, {});

        setSizes(availableSizes);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    fetchSizes();
  }, []);
  console.log(sizes);
  if (!product) {
    return <Text>Loading...</Text>;
  }

  const handleSizeSelect = (index) => {
    setSelectedSizeIndex(index);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleQuantityIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      salesman: user._id,
      pname: product._id,
      pdepartment: product.department,
      pcategory: product.category,
      size: Object.keys(sizes)[selectedSizeIndex], // Use fetched sizes
      color: selectedColor,
      quantity,
      pimage: product.imageUrl,
      price: product.price * quantity,
    });
    alert("Your Item added to cart successfully!");
    navigation.navigate("list");
  };

  const navigateNextImage = () => {
    if (currentImageIndex < product.imageUrl.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const navigatePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.imageUrl[currentImageIndex] }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.imageNavContainer}>
          <TouchableOpacity onPress={navigatePrevImage}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateNextImage}>
            <Icon name="arrow-forward" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>Price {product.price} (pkr)</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.sizesContainer}>
          <Text style={styles.sizesLabel}>Available Sizes:</Text>
          <ScrollView horizontal>
            {Object.entries(sizes).map(
              ([size, value], index) =>
                // Check if the size value is greater than 0
                value > 0 && (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.sizeButton,
                      selectedSizeIndex === index && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                    onPress={() => handleSizeSelect(index)}
                  >
                    <Text
                      style={[
                        styles.sizeButtonText,
                        selectedSizeIndex === index && {
                          color: colors.light,
                        },
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                )
            )}
          </ScrollView>
        </View>

        <View style={styles.colorsContainer}>
          <Text style={styles.colorsLabel}>Available Colors:</Text>
          <ScrollView horizontal>
            {product.colors &&
              product.colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorButton,
                    selectedColor === color.name && {
                      backgroundColor: colors.primary,
                    },
                  ]}
                  onPress={() => handleColorSelect(color.name)}
                >
                  <Text
                    style={[
                      styles.colorButtonText,
                      selectedColor === color.name && { color: colors.light },
                    ]}
                  >
                    {color.name}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleQuantityDecrement}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleQuantityIncrement}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  productImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  imageNavContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 0,
    padding: 10,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  sizesContainer: {
    marginBottom: 20,
  },
  sizesLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sizeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.light,
    borderRadius: 5,
    marginRight: 10,
  },
  sizeButtonText: {
    fontSize: 16,
  },
  colorsContainer: {
    marginBottom: 20,
  },
  colorsLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  colorButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.light,
    borderRadius: 5,
    marginRight: 10,
  },
  colorButtonText: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: colors.light,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    fontSize: 24,
    color: colors.dark,
  },
  quantity: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: colors.light,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductListDetail;
