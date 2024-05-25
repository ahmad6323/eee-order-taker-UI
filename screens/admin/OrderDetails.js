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
import MapView, { Marker } from "react-native-maps";
import { getSaleman } from "../../utilty/salesmanUtility";
import config from "../../config.json";


const OrderDetailsScreen = ({ navigation, route }) => {
  const [salesman, setSalesman] = useState(null);
  const [locationName, setLocationName] = useState("Loading...");
  const { order } = route.params;

  useEffect(() => {
    const fetchSalesman = async () => {
      try {
        const salesmanDetails = await getSaleman(order.salesmanId);
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
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${order.location.longitude}&lon=${order.location.latitude}`
        );
        setLocationName(response.data.display_name);
      } catch (error) {
        console.log(error);
        setLocationName("Location Not Found");
      }
    };

    fetchLocationName();
  }, [order.salesman]);

  const formatPrice = (price)=>{
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'PKR',
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <Text style={styles.locationInfo}>{`${locationName}`}</Text>
      
      <View style={styles.mapContainer}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          onPress={() =>
            navigation.navigate("orderdetailmap", {
              long: order.location.longitude,
              lat: order.location.latitude,
            })
          }
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(order.location.longitude),
            longitude: parseFloat(order.location.latitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(order.location.longitude),
              longitude: parseFloat(order.location.latitude),
            }}
            anchor={{ x: 0.5, y: 0.5 }}
            title="Order Location"
          />
        </MapView>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
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

      <View style={styles.productInfo}>
        <ScrollView horizontal>
          {
            order.products.map((product,index)=>{
              return <View
                key={index}
              >
                {
                  product.variations.map((variation,index)=>{
                    return <View key={index}>
                      <Text style={{
                        fontFamily: "Poppins",
                        fontSize: 18
                      }}>{variation.sku} - {variation.quantity}</Text>
                    </View>
                  }) 
                }
              </View>
            })
          }
        </ScrollView>
        <Text style={styles.heading}>{formatPrice(order.totalBill)}/-</Text>
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
    fontFamily: "Bold",
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontFamily: "Bold",
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
    height: 250,
    backgroundColor: "transparent",
    resizeMode: "contain",
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
    fontFamily: "Bold",
  },
});

export default OrderDetailsScreen;
