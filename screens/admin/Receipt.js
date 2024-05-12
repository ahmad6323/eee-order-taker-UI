import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Receipt = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN5IPQRr-pbH6kbO09YGNlvaKxRyb6Hk_SRRwajW7eHw&s", // Replace with actual image URL
          }}
          style={styles.image}
        />
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN5IPQRr-pbH6kbO09YGNlvaKxRyb6Hk_SRRwajW7eHw&s", // Replace with actual image URL
          }}
          style={styles.image}
        />
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN5IPQRr-pbH6kbO09YGNlvaKxRyb6Hk_SRRwajW7eHw&s", // Replace with actual image URL
          }}
          style={styles.image}
        />
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN5IPQRr-pbH6kbO09YGNlvaKxRyb6Hk_SRRwajW7eHw&s", // Replace with actual image URL
          }}
          style={styles.image}
        />
        {/* Add more images */}
      </ScrollView>

      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>Customer Name</Text>
        <Text style={styles.address}>Address with city goes here</Text>
        <Text style={styles.totalAmount}>Total amount: 1000</Text>
      </View>

      <Text>Customer's Phone No:</Text>
      <Text style={styles.phone}>+92300 1234567</Text>

      <View style={styles.feedbackContainer}>
        <Text style={styles.feed}>Customer Feedback:</Text>
        <Text>The Product was very nice etc...</Text>
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
    fontWeight: "bold",
  },
  feed: {
    fontSize: 16,
    fontWeight: "bold",
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
    color: "#666",
  },
  totalAmount: {
    paddingTop: 30,
    fontSize: 14,
    fontWeight: "bold",
  },
  feedbackContainer: {
    fontWeight: "bold",
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
    fontWeight: "bold",
  },
});

export default Receipt;
