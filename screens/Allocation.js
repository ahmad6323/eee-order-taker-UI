import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import { getAllocations, deleteAlloation } from "../utilty/allocationUtility"; // Fix the import name here
import { MaterialIcons } from "@expo/vector-icons";

const AllocationScreen = ({ navigation }) => {
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    const fetchAllocations = async () => {
      try {
        const { data } = await getAllocations();
        setAllocations(data);
      } catch (error) {
        console.error("Error fetching allocations data:", error);
      }
    };

    fetchAllocations();
  }, []);

  const handleDeleteAllocation = async (id) => {
    try {
      await deleteAlloation(id); // Corrected function name here
      // Remove the deleted allocation from the state
      setAllocations((prevAllocations) =>
        prevAllocations.filter((allocation) => allocation._id !== id)
      );
    } catch (error) {
      console.error("Error deleting allocation:", error);
    }
  };

  const renderAllocationItem = ({ item }) => (
    <View style={styles.allocationItem}>
      <View>
        <Text style={styles.text}>{`Salesman: ${item.salesmanId.name}`}</Text>
        <Text style={styles.text}>{`Product: ${item.productId.name}`}</Text>
        <Text style={styles.heading}>Allocated Quantities</Text>
        {item.allocations.map((allocation, index) => (
          <View key={index}>
            <Text style={styles.color}>{`Color: ${allocation.name}`}</Text>
            <View style={styles.sizeContainer}>
              {Object.keys(allocation.sizes).map((size, sizeIndex) => (
                <View key={sizeIndex} style={styles.sizeItem}>
                  <Text style={styles.sizeLabel}>{`${size}:`}</Text>
                  <Text style={styles.sizeQuantity}>
                    {allocation.sizes[size]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
        <TouchableOpacity onPress={() => handleDeleteAllocation(item._id)}>
          <MaterialIcons
            style={{ alignSelf: "flex-end" }}
            name="delete-outline"
            size={24}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("allocationfrom")}
        style={[styles.box, styles.allocateBox, { height: 40 }]}
      >
        <Text style={styles.allocateText}>Allocate</Text>
      </TouchableOpacity>
      <FlatList
        data={allocations}
        renderItem={renderAllocationItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 25,
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  remainingBox: {
    backgroundColor: "#f0f0f0",
    height: 80,
  },
  allocateBox: {
    backgroundColor: "#007bff",
    height: 80,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  remainingText: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.danger,
  },
  allocateText: {
    color: "#fff",
    fontSize: 18,
  },
  allocationItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quantity: {
    flex: 1,
    fontSize: 16,
  },
  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  sizeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 5,
  },
  sizeLabel: {
    fontSize: 16,
    marginRight: 5,
    color: colors.medium,
  },
  sizeQuantity: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.dark,
  },
});

export default AllocationScreen;
