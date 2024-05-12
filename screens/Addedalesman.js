import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { getSalesmans, deleteSalesman } from "../utilty/salesmanUtility";
import SafeScreen from "../components/SafeScreen";

const AddedSalesman = ({ navigation }) => {
  const [salesmanList, setSalesmanList] = useState([]);

  useEffect(() => {
    const fetchSalesmans = async () => {
      try {
        const response = await getSalesmans();
        setSalesmanList(response.data);
      } catch (error) {
        console.error("Error fetching salesmans:", error);
      }
    };

    fetchSalesmans();
  }, []);

  const handleDelete = async (salesmanId) => {
    try {
      await deleteSalesman(salesmanId);
      // Remove the deleted salesman from the list
      setSalesmanList((prevSalesmanList) =>
        prevSalesmanList.filter((salesman) => salesman._id !== salesmanId)
      );
      console.log("Salesman deleted successfully");
    } catch (error) {
      console.error("Error deleting salesman:", error);
    }
  };

  const handleCall = (phone) => {
    const phoneNumber = `tel:${phone}`;
    Linking.openURL(phoneNumber);
  };

  return (
    <SafeScreen>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText style={styles.logo}>Added Salesmans</AppText>
          <AppText style={styles.subText}>List of added salesmans</AppText>
        </View>
        {salesmanList.length === 0 ? (
          <AppText>No salesman added</AppText>
        ) : (
          <View style={styles.salesmanList}>
            {salesmanList.map((salesman) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("addsaleman", { salesman })}
                style={styles.salesmanItem}
                key={salesman._id}
              >
                <Image
                  source={
                    salesman.image
                      ? { uri: salesman.image }
                      : require("../assets/noimage.jpg")
                  }
                  style={styles.profilePicture}
                />
                <View style={styles.detailsContainer}>
                  <AppText style={styles.salesmanName}>{salesman.name}</AppText>
                  <AppText style={styles.salesmanPhone}>
                    {salesman.phone}
                  </AppText>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() => console.log("Chat icon pressed")}
                  >
                    <MaterialCommunityIcons
                      name="chat"
                      size={32}
                      color={colors.primary}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleCall(salesman.phone)}>
                    <MaterialCommunityIcons
                      name="phone"
                      size={32}
                      color={colors.primary}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(salesman._id)}>
                    <MaterialCommunityIcons
                      name="delete"
                      size={32}
                      color={colors.primary}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
    alignItems: "flex-start", // Align to the left
    width: "100%", // Ensure full width
    paddingHorizontal: 20, // Add horizontal padding for spacing
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
  salesmanList: {
    width: "80%",
    backgroundColor: colors.white,
    width: "90%",
  },
  salesmanItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    paddingBottom: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  salesmanName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  salesmanPhone: {
    fontSize: 17,
    color: colors.medium,
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 10,
  },
});

export default AddedSalesman;
