import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import colors from "../../config/colors";
import { useCart } from "../../CartContext";
import { UserContext } from "../../UserContext";
import { getAllocationByProductId } from "../../utilty/allocationUtility";
import ImageSlider from "../../components/ImageSlider";
import AppErrorMessage from "../../components/forms/AppErrorMessage";

const ProductListDetail = ({ route, navigation }) => {
  const { user } = useContext(UserContext);
  
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [orderFromThisPage, setOrderFromThisPage] = useState({});
  const [error, setError] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  
  const { product_id } = route.params;

  useEffect(() => {
    const fetchProductById = async (id)=>{
      try{
        const { data } = await getAllocationByProductId(id);
        setProduct(data);
        setOrderFromThisPage({
          productId: data.productId._id,
          name: data.name,
          image: data.productId.imageUrl[0],
          pricePerUnit: data.productId.price,
          variations: data.products.map(variation => ({
            variationId: variation.variation._id,
            sku: variation.variation.SKU,
            quantity: 0,
            maxQuantity: variation.remaining
          }))
        });

      }catch(ex){
        console.log(ex);
      }
    }

    fetchProductById(product_id);
  }, []);

  if (!product_id) {
    return <Text>Loading...</Text>;
  }

  const handleQuantityChange = (index, increment) => {
    setErrorVisible(false);
    setOrderFromThisPage(prevOrder => {
      const newVariations = [...prevOrder.variations];
      const newQuantity = newVariations[index].quantity + increment;
      
      // restrict user to add mre quantity than assigned
      if (newQuantity >= 0 && newQuantity <= newVariations[index].maxQuantity) {
        newVariations[index].quantity = newQuantity;
        setError(false);
        setErrorVisible(false); 
      } else {
        setError(`Quantity for this vairation cannot exceed ${newVariations[index].maxQuantity}`);
        setErrorVisible(true);
      }

      return { ...prevOrder, variations: newVariations };
    });
  };

  const handleAddToCart = () => {
    const updatedVariations = getVariationsWithZeroQuantity(orderFromThisPage);
    
    const updatedData = {
      productId: product.productId._id,
      name: product.productId.name,
      image: product.productId.imageUrl[0],
      pricePerUnit: product.productId.price,
      variations: updatedVariations
    };

    addToCart({
      salesman: user._id,
      ...updatedData
    });

    alert("Your Item added to cart successfully!");
    navigation.navigate("list");
  };

  function getVariationsWithZeroQuantity(order) {
    return order.variations.filter(variation => variation.quantity !== 0);
  }

  if(product === null){
    return (
      <ActivityIndicator color={"orange"}/>
    );
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <ImageSlider style={styles.productImage} images={product && product.productId.imageUrl} />
      </View>
      <View style={styles.detailsContainer}>
        <AppErrorMessage error={error} visible={errorVisible} />
        <Text style={styles.name}>{product.productId.name}</Text>
        <Text style={styles.price}>Price {product.productId.price}/- PKR</Text>
        <Text style={styles.description}>{product.productId.description}</Text>
        <View style={styles.sizesContainer}>
          <Text style={styles.sizesLabel}>Variations Allocated</Text>
          {
            product.products && orderFromThisPage && orderFromThisPage.variations && product.products.map((variation,index)=>{
              return <View 
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Text style={styles.sizesLabel}>{variation.variation.color.color.trim() + " - " + variation.variation.size.size.trim() + " - " + variation.remaining + " max"}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    disabled={orderFromThisPage.variations[index].quantity === 0}
                    style={styles.quantityButton}
                    onPress={()=>{
                      handleQuantityChange(index,-1)
                    }}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>
                    {orderFromThisPage.variations[index].quantity}
                  </Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={()=>{
                      handleQuantityChange(index,1)
                    }}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            })
          }
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
    paddingVertical: 50,
    width: "100%"
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
    width: "100%",
    height: "43%"
  },
  productImage: {
    width: "75%",
    height: "100%",
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
    fontFamily: "Bold",
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
    fontFamily: "Bold",
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
    fontFamily: "Bold",
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
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    fontSize: 20,
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
    fontFamily: "Bold",
  },
});

export default ProductListDetail;
