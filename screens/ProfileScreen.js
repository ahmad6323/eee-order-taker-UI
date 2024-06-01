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
import { getProfileScreenData } from "../utilty/orderUtility";

const ProfileScreen = ({ navigation }) => {
  const [ordersAndSales, setOrdersAndSales] = useState(null);

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await getProfileScreenData();
        setOrdersAndSales(data);
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
            <View style={{ alignItems: "flex-start", marginBottom: 10 }}>
              <Text style={{ fontFamily: "Bold", fontSize: 27 }}>
                Admin Panel
              </Text>
              <Text
                style={{ fontFamily: "Bold", fontSize: 14, color: "#6e6969" }}
              >
                Select Any Option Below
              </Text>
            </View>
            <View style={styles.main_row}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("dashboard", { ordersAndSales })
                }
                style={{
                  backgroundColor: "#fc5c65",
                  width: "50%",
                  height: "100",
                  borderRadius: 10,
                  justifyContent: "space-between",
                  padding: 8,
                }}
              >
                <View>
                  <Text style={styles.text1}>Total Orders</Text>
                  <Text style={styles.text2}>
                    {ordersAndSales ? ordersAndSales.orders : 0}
                  </Text>
                </View>
                <View>
                  <Text style={styles.text1}>Total Sales</Text>
                  <Text style={styles.totalSalesNumber}>
                    {ordersAndSales ? ordersAndSales.totalSales : "0.00"} /-{" "}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 14, fontFamily: "Bold" }}
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
                onPress={() => navigation.navigate("addsaleman", { new: true })}
                style={{
                  width: "30%",
                  height: 100,
                  alignItems: "center",
                  marginVertical: 10,
                  backgroundColor: "#f8f4f4",
                  // justifyContent: "space-around",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <MaterialIcons name="man" size={40} color="#fc5c65" />
                <Text style={styles.buttonHeadings}>Add Salesman</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("addproduct", { product: {} })
                }
                style={{
                  width: "30%",
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
                  width: "30%",
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
              style={{
                color: colors.dark,
                fontSize: 18,
                paddingLeft: 15,
                paddingRight: 15,
                fontFamily: "Bold",
              }}
            >
              More Options
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("department")}
                style={{
                  width: "30%",
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
                  width: "30%",
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
                  width: "30%",
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
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("sizes")}
                style={{
                  width: "30%",
                  height: 90,
                  alignItems: "center",
                  marginVertical: 10,
                  backgroundColor: "#f8f4f4",
                  justifyContent: "space-around",
                  borderRadius: 10,
                  padding: 5,
                  marginLeft: 10,
                  marginRight: 8,
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
                  width: "30%",
                  height: 90,
                  alignItems: "center",
                  marginVertical: 10,
                  backgroundColor: "#f8f4f4",
                  justifyContent: "space-around",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <FontAwesome6 name="brush" size={35} color="black" />
                <Text style={styles.buttonHeadings}>Colors</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingLeft: 10,
              }}
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
                <FontAwesome6 name="door-open" size={25} color="red" />
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
    fontFamily: "Bold",
  },
  text2: {
    color: "white",
    fontSize: 24,
    fontFamily: "Bold",
  },
  totalSalesNumber: {
    color: "white",
    fontSize: 18,
    fontFamily: "Bold",
  },
  innerContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  main_row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  column: {
    // justifyContent: "space-between",
  },
  buttonHeadings: {
    fontSize: 14,
    fontFamily: "Poppins",
    textAlign: "center",
  },
});

export default ProfileScreen;
