import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

const OrderDetailsMap = ({ navigation, route }) => {
  const { long, lat } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <Text style={styles.locationInfo}>Location Info with Date and Time</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(lat),
          longitude: parseFloat(long),
          latitudeDelta: 0.01, // Adjusted for closer zoom
          longitudeDelta: 0.01, // Adjusted for closer zoom
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(lat),
            longitude: parseFloat(long), // Corrected typo
          }}
          title="Order Location"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  title: {
    paddingHorizontal: 30,
    paddingTop: 50,
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
  },
  locationInfo: {
    paddingHorizontal: 30,
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
});

export default OrderDetailsMap;
