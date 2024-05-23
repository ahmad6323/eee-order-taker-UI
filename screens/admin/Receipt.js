import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import config from "../../config.json";

const Receipt = ({ navigation, route }) => {

  const { order } = route.params;

  const formatPrice = (price)=>{
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'PKR',
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
          order.products.map((product,index)=>{
            return <View key={index}
              style={{
                flexDirection: "row"
              }}
            >
              {
                product.imageUrl.map((img,index)=>(
                  <Image
                    key={index}
                    source={{
                      uri: `${config.pictureUrl}/public/products/${img}`
                    }}
                    style={styles.image}
                    defaultSource={require("../../assets/noimage.jpg")}
                  />
                ))
              }
            </View>
          })
        }
      </ScrollView>

      <View style={styles.customerInfo}>
        <Image
          source={{
            uri: `${config.pictureUrl}/public/salesman/${order.image}`
          }}
          style={styles.salesmanImage}
          defaultSource={require("../../assets/noimage.jpg")}
        />
        <Text style={styles.customerName}>{order.salesmanName}</Text>
        <Text style={styles.totalAmount}>Total amount: {formatPrice(order.totalBill)} /- </Text>
      </View>

      <Text>Customer's Phone No:</Text>
      <Text style={styles.phone}>{order.phone}</Text>

      <View style={styles.feedbackContainer}>
        <Text style={styles.feed}>Customer Feedback:</Text>
        <Text>{order.feedBack ? order.feedBack : "No feedback provided!"}</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.detailsButton}
      >
        <Text style={styles.detailsButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginRight: 10,
    borderRadius: 8,
    marginBottom: 30,
  },
  salesmanImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  customerInfo: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 30,
    borderColor: "black",
    borderColor: "black",
    borderStyle: "dashed",
    borderRadius: 1,
    borderWidth: 1,
  },
  phone: {
    fontSize: 16,
    fontFamily: "Bold",
  },
  feed: {
    fontSize: 16,
    fontFamily: "Bold",
  },
  customerName: {
    fontSize: 16,
    fontFamily: "Bold",
  },
  address: {
    fontSize: 14,
    color: "#666",
  },
  totalAmount: {
    fontSize: 14,
    fontFamily: "Bold",
  },
  feedbackContainer: {
    fontFamily: "Bold",
    paddingVertical: 30,
    marginBottom: 60,
  },
  detailsButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#FFF",
    fontFamily: "Bold",
  }
});

export default Receipt;
