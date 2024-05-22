import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SafeScreen from "../components/SafeScreen";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import adminAuth from "../utilty/adminAuth";
import { UserContext } from "../UserContext";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { getOrders } from "../utilty/orderUtility";

const chartConfig = {
  backgroundGradientFrom: colors.danger,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: colors.danger,
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const ProfileScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState(0);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders.data);
        const totalSales = fetchedOrders.data.reduce(
          (acc, order) => acc + order.price,
          0
        );
        setSales(totalSales);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <SafeScreen style={styles.background}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={{ alignItems: "flex-start", marginBottom: 25 }}>
              <Text style={{ fontWeight: "bold", fontSize: 27 }}>
                Admin Panel
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 14, color: "#6e6969" }}
              >
                Select Any Option Below
              </Text>
            </View>
            <View style={styles.main_row}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("dashboard", { sales, orders })
                }
                style={{
                  backgroundColor: "#fc5c65",
                  width: "55%",
                  height: "100",
                  borderRadius: 10,
                  justifyContent: "space-between",
                  padding: 8,
                }}
              >
                <View>
                  <Text style={styles.text1}>Total Orders</Text>
                  <Text style={styles.text2}>{orders.length}</Text>
                </View>
                <View>
                  <Text style={styles.text1}>Total Saless</Text>
                  <Text style={styles.text2}>0.00</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
                  >
                    More Details
                  </Text>
                  <AntDesign name="arrowright" size={20} color="white" />
                </View>
              </TouchableOpacity>
              <View style={styles.column}>
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("addedproducts")}
                    style={{
                      backgroundColor: "#fcb100",
                      height: 145,
                      borderRadius: 10,
                      padding: 8,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      width: 150,
                    }}
                  >
                    <Text style={styles.text1}>Manage Products</Text>
                    <AntDesign name="arrowright" size={25} color="white" />
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("addedsalesman")}
                    style={{
                      backgroundColor: "#50c7b7",
                      height: 145,
                      borderRadius: 10,
                      padding: 8,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      width: 150,
                    }}
                  >
                    <Text style={styles.text1}>Manage Salesman</Text>
                    <AntDesign name="arrowright" size={25} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("addsaleman", { new: true })
                }
                style={{
                  width: 110,
                  height: 100,
                  alignItems: "center",
                  marginVertical: 10,
                  backgroundColor: "#f8f4f4",
                  justifyContent: "space-around",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <MaterialIcons name="man" size={40} color="#fc5c65" />
                <Text style={styles.buttonHeadings} >Add Salesman</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("addproduct", { product: {} })
                }
                style={{
                  width: 110,
                  height: 100,
                  alignItems: "center",
                  marginVertical: 10,
                  backgroundColor: "#f8f4f4",
                  justifyContent: "space-around",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <MaterialIcons
                  name="production-quantity-limits"
                  size={40}
                  color="#fc5c65"
                />
                <Text style={styles.buttonHeadings}>Add Product</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("allocation")}
                style={{
                  width: 110,
                  height: 100,
                  alignItems: "center",
                  marginVertical: 10,
                  backgroundColor: "#f8f4f4",
                  justifyContent: "space-around",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <MaterialIcons name="category" size={40} color="#fc5c65" />
                <Text style={styles.buttonHeadings}>Manage Allocation</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{ color: colors.dark, fontSize: 18, paddingTop: 15, fontWeight: "bold" }}
            >
              More Options
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("department")}
                style={{
                  width: 110,
                  height: 90,
                  alignItems: "center",
                  marginVertical: 10,
                  backgroundColor: "#f8f4f4",
                  justifyContent: "space-around",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <MaterialIcons name="add-business" size={35} color="black" />
                <Text style={styles.buttonHeadings}>Departments</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("history")}
                style={{
                  width: 110,
                  height: 90,
                  alignItems: "center",
                  marginVertical: 10,
                  backgroundColor: "#f8f4f4",
                  justifyContent: "space-around",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <MaterialIcons name="history" size={35} color="black" />
                <Text style={styles.buttonHeadings}>Order History</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("categories")}
                style={{
                  width: 110,
                  height: 90,
                  alignItems: "center",
                  marginVertical: 10,
                  backgroundColor: "#f8f4f4",
                  justifyContent: "space-around",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <Entypo name="menu" size={35} color="black" />
                <Text style={styles.buttonHeadings}>Categories</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("sizes")}
                style={{
                  width: 110,
                  height: 90,
                  alignItems: "center",
                  marginVertical: 10,
                  backgroundColor: "#f8f4f4",
                  justifyContent: "space-around",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <FontAwesome6
                  name="arrow-up-wide-short"
                  size={35}
                  color="black"
                />
                <Text style={styles.buttonHeadings}>Sizes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("colors")}
                style={{
                  width: 110,
                  height: 90,
                  alignItems: "center",
                  marginVertical: 10,
                  backgroundColor: "#f8f4f4",
                  justifyContent: "space-around",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <FontAwesome6
                  name="brush"
                  size={35}
                  color="black"
                />
                <Text style={styles.buttonHeadings}>Colors</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 110,
                  height: 90,
                  alignItems: "center",
                  marginVertical: 10,
                  justifyContent: "space-around",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
              </TouchableOpacity>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => {
                  setUser(null);
                  adminAuth.removeToken();
                }}
                style={{
                  width: 70,
                  height: 90,
                  alignItems: "center",
                  marginVertical: 10,
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <FontAwesome6
                  name="door-open"
                  size={25}
                  color="red"
                />
                <Text style={styles.buttonHeadings}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#f8f4f4",
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins"
  },
  text2: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Poppins"
  },
  innerContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    flex: 1,
  },
  main_row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  column: {
    justifyContent: "space-between",
  },
  buttonHeadings: {
    fontSize: 14,
    fontFamily: "Poppins",
    textAlign: "center"
  }
});

export default ProfileScreen;
