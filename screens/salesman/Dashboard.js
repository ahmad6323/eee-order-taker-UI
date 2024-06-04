import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, ScrollView } from "react-native";
import AppText from "../../components/AppText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../../UserContext";
import salesmanAuthService from "../../utilty/salesmanAuthService";

import { useIsFocused } from "@react-navigation/native";
import { useCart } from "../../CartContext";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { getDashboardContentForSalesman } from "../../utilty/salesmanUtility";

import { saveOrder } from "../../utilty/orderUtility";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Snackbar } from "react-native-paper";
import SafeScreen from "../../components/SafeScreen";

import NetInfo from "@react-native-community/netinfo";

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const Dashboard = ({ navigation }) => {
  const { cartItems } = useCart();
  const { user, setUser } = useContext(UserContext);

  const scale = useSharedValue(1);
  const isFocused = useIsFocused();

  const [dashboardData, setDashboardData] = useState(null);

  const [snackBarMessage, setSnackBarMessage] = useState("");

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => {
    setVisible(false);
  };
  useEffect(() => {
    if (isFocused) {
      scale.value = withRepeat(
        withTiming(1.3, {
          duration: 500,
          easing: Easing.linear,
        }),
        -1,
        true
      );
      getDashboardData(user._id);
      checkAndPlaceOffLineOrders();
    }
  }, [isFocused]);

  const checkAndPlaceOffLineOrders = async () => {
    // add check for online, if offline remove token ?
    try {
      // offline check
      const isConnected = await NetInfo.fetch().then(
        (state) => state.isConnected
      );

      if (isConnected) {
        // online
        const existingOrders = await AsyncStorage.getItem("offlineOrders");
        if (existingOrders) {
          const orders = JSON.parse(existingOrders);
          for (const order of orders) {
            await saveOrder(order);
          }
          await AsyncStorage.removeItem("offlineOrders");
          setSnackBarMessage(
            "All offline orders are synced and cleared from your device!"
          );
          onToggleSnackBar();
        }
      } else {
        // case: offline
        setSnackBarMessage(
          "Your device is offline! We will sync order, if available, once the device is online!"
        );
        onToggleSnackBar();
      }
    } catch (error) {
      console.error("Error placing offline orders:", error);
      navigation.navigate("fail");
    }
  };

  const getDashboardData = async (id) => {
    try {
      const { data } = await getDashboardContentForSalesman(id);
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching salesman:", error);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  return (
    <ScrollView>
      <SafeScreen>
        <View style={styles.container}>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              label: "Okay",
              onPress: () => {
                onDismissSnackBar();
              },
            }}
          >
            {snackBarMessage}
          </Snackbar>
          <View style={styles.innerContainer}>
            <View style={styles.logoContainer}>
              <AppText style={styles.logo}>{user.name}</AppText>
              <AppText style={styles.subText}>
                Department : {user.departments}
              </AppText>
            </View>
          </View>
          <View
            style={{
              marginBottom: 10,
              width: "88%",
              backgroundColor: "white",
              height: 100,
              borderRadius: 20,
              alignItems: "flex-start",
              padding: 12,
              justifyContent: "space-between",
              elevation: 10,
              marginLeft: 6,
            }}
          >
            <View style={{ alignItems: "flex-start" }}>
              <AppText
                style={{
                  color: "black",
                  fontSize: 20,
                }}
              >
                Total Sales (PKR)
              </AppText>
              <AppText
                style={{ color: "black", fontFamily: "Bold", fontSize: 22 }}
              >
                {dashboardData ? dashboardData.totalSales + " /- " : 0}
              </AppText>
            </View>
            <View style={{ position: "absolute", right: 15, bottom: 15 }}>
              <AnimatedIcon
                name="stats-chart"
                size={30}
                color="blue"
                style={animatedStyle}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              paddingLeft: 10,
              width: "90%",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "50%",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: 160,
                  borderRadius: 12,
                  padding: 10,
                  elevation: 6,
                  marginBottom: 10,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ alignItems: "flex-start" }}>
                  <AppText style={{ color: "black" }}>Total Orders</AppText>
                  <AppText
                    style={{ color: "black", fontFamily: "Bold", fontSize: 24 }}
                  >
                    {dashboardData ? dashboardData.orders : 0}
                  </AppText>
                </View>
                <View style={{ alignSelf: "flex-end" }}>
                  <AnimatedIcon
                    name="layers"
                    size={30}
                    color="orange"
                    style={animatedStyle}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                borderRadius: 12,
                marginHorizontal: 15,
                justifyContent: "space-between",
                flexDirection: "column",
                width: "45%",
                height: 160,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#50c7b7",
                  width: "100%",
                  height: 75,
                  borderRadius: 13,
                  padding: 10,
                  elevation: 6,
                  justifyContent: "flex-start",
                }}
                onPress={() => navigation.navigate("list")}
              >
                <View style={{ alignItems: "flex-start" }}>
                  <AppText
                    style={{
                      color: "black",
                      fontSize: 15,
                    }}
                  >
                    Place an Order
                  </AppText>
                </View>
                <View style={{ position: "absolute", right: 15, bottom: 5 }}>
                  <AnimatedIcon
                    name="arrow-forward"
                    size={25}
                    color="black"
                    style={animatedStyle}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#fcb100",
                  width: "100%",
                  height: 75,
                  borderRadius: 13,
                  padding: 10,
                  elevation: 6,
                  justifyContent: "flex-start",
                }}
                onPress={() => {
                  navigation.navigate("history");
                }}
              >
                <View style={{ alignItems: "flex-start" }}>
                  <AppText
                    style={{
                      color: "black",
                      fontSize: 15,
                    }}
                  >
                    Order History
                  </AppText>
                </View>
                <View style={{ position: "absolute", right: 15, bottom: 5 }}>
                  <AnimatedIcon
                    name="arrow-forward"
                    size={25}
                    color="black"
                    style={animatedStyle}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              // marginVertical: 10,
              marginBottom: 18,
              paddingLeft: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: "45%",
                borderRadius: 13,
                padding: 10,
                justifyContent: "space-between",
                elevation: 6,
                marginLeft: 16,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("cart")}
                style={{
                  height: 110,
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <AppText style={{ color: "black", fontSize: 19 }}>
                    Cart
                  </AppText>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <AnimatedIcon
                    name="cart"
                    size={30}
                    color="green"
                    style={animatedStyle}
                  />
                  <Text style={styles.textOnTop}>
                    {cartItems && cartItems.length !== 0
                      ? "+" + cartItems.length
                      : ""}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "white",
                width: "40%",
                height: 130,
                borderRadius: 13,
                padding: 10,
                justifyContent: "space-between",
                elevation: 6,
                marginHorizontal: 17,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 110,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ alignItems: "flex-start" }}>
                  <AppText style={{ color: "black", fontSize: 19 }}>
                    Settings
                  </AppText>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <AnimatedIcon
                    name="cog"
                    size={30}
                    color="red"
                    style={animatedStyle}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "25%",
            }}
            onPress={() => {
              setUser(null);
              salesmanAuthService.removeToken();
            }}
          >
            <AnimatedIcon name="exit-outline" size={30} color="red" />
            <AppText style={{ color: "black", fontSize: 22, marginLeft: 15 }}>
              Logout
            </AppText>
          </TouchableOpacity>
        </View>
      </SafeScreen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: "flex-start",
  },
  logo: {
    paddingLeft: 20,
    color: "black",
    fontSize: 35,
    fontFamily: "Bold",
  },
  subText: {
    paddingLeft: 20,
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  formContainer: {
    marginTop: 20,
  },
  forgotPasswordText: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: "underline",
    alignItems: "flex-end",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 170,
    borderRadius: 13,
  },
  textOnTop: {
    position: "absolute",
    top: -12,
    right: 5,
    fontSize: 14,
    color: "red",
    fontFamily: "Bold",
    borderRadius: 25,
  },
});

export default Dashboard;
