import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { getSaleman } from "../../utilty/salesmanUtility";

const OrderDetailsScreen = ({ navigation, route }) => {
  const [salesman, setSalesman] = useState(null);
  const [locationName, setLocationName] = useState("Loading...");
  const { order } = route.params;

  useEffect(() => {
    const fetchSalesman = async () => {
      try {
        const salesmanDetails = await getSaleman(order.salesman);
        setSalesman(salesmanDetails.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSalesman();

    // Fetch location name based on latitude and longitude
    const fetchLocationName = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${order.latitude}&lon=${order.longitude}`
        );
        setLocationName(response.data.display_name);
      } catch (error) {
        console.log(error);
        setLocationName("Location Not Found");
      }
    };

    fetchLocationName();
  }, [order.salesman]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <Text style={styles.locationInfo}>{`${locationName}`}</Text>

      {/* Smaller Map */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          onPress={() =>
            navigation.navigate("orderdetailmap", {
              long: order.longitude,
              lat: order.latitude,
            })
          }
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(order.latitude),
            longitude: parseFloat(order.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(order.latitude),
              longitude: parseFloat(order.longitude),
            }}
            anchor={{ x: 0.5, y: 0.5 }}
            title="Order Location"
          />
        </MapView>
      </View>

      {/* Image Carousel */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {order.pimage.map((imgUrl, index) => (
          <Image
            key={index}
            source={{ uri: imgUrl }}
            style={styles.image}
            defaultSource={require("../../assets/noimage.jpg")}
          />
        ))}
      </ScrollView>

      <View style={styles.productInfo}>
        <Text style={styles.title}>{order.pname}</Text>
        <Text>SKU: 000-000-000</Text>
        <Text style={styles.heading}>{`RS: ${order.price}`}</Text>
        <Text style={styles.heading}>{`Quantity: ${order.quantity}`}</Text>
        <Text>{`${order.color} / ${order.size}`}</Text>
        <Text>{`${order.pcategory.mainCategory} / ${order.pcategory.subCategory}`}</Text>
      </View>

      <View style={styles.contactInfo}>
        <Text style={styles.heading}>{`ORDER PLACED BY: ${
          salesman ? salesman.name : "Loading..."
        }`}</Text>
        <Text>{`Phone Number: ${salesman?.phone}`}</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("receipt", { order: order })}
        style={styles.detailsButton}
      >
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    paddingTop: 16,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  locationInfo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  mapContainer: {
    height: 200,
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10,
    borderRadius: 8,
  },
  productInfo: {
    marginBottom: 16,
  },
  contactInfo: {
    marginBottom: 16,
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

export default OrderDetailsScreen;
