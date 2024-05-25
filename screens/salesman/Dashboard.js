import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import AppText from "../../components/AppText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../../UserContext";
import salesmanAuthService from "../../utilty/salesmanAuthService";

import { useIsFocused } from "@react-navigation/native";
import { useCart } from "../../CartContext";
import { Ionicons } from '@expo/vector-icons';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { getDashboardContentForSalesman } from "../../utilty/salesmanUtility";

import { saveOrder } from "../../utilty/orderUtility";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const Dashboard = ({ navigation }) => {

  const { cartItems } = useCart();
  const { user, setUser } = useContext(UserContext);

  const scale = useSharedValue(1);
  const isFocused = useIsFocused();

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    if(isFocused){
      scale.value = withRepeat(
        withTiming(1.3, {
          duration: 500,
          easing: Easing.linear,
        }),
        -1,
        true,
      );
      getDashboardData(user._id);

      // user logged in again after logging in / coming onlion, we place the orders if we have
      // if not, skip
      checkAndPlaceOffLineOrders();
    }
  }, [isFocused]);

  const checkAndPlaceOffLineOrders = async ()=>{
    try {
      const existingOrders = await AsyncStorage.getItem("offlineOrders");
      if (existingOrders) {
        const orders = JSON.parse(existingOrders);
        for (const order of orders) {
          await saveOrder(order);
        }
        await AsyncStorage.removeItem("offlineOrders");
        Alert.alert(
          "Offline Orders Notification",
          "All offline orders are cleared!"
        )
      }
    } catch (error) {
      console.error("Error placing offline orders:", error);
      navigation.navigate("fail");
    }
  }

  const getDashboardData = async (id)=>{
    try {
      const { data } = await getDashboardContentForSalesman(id);
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching salesman:", error);
    }
  }

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
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <AppText style={styles.logo}>{user.name}</AppText>
          <AppText style={styles.subText}>Department : Apparel</AppText>
        </View>
      </View>
      <View
        style={{
          marginBottom: 10,
          width: "90%",
          backgroundColor: "white",
          height: 140,
          borderRadius: 20,
          alignItems: "flex-start",
          padding: 12,
          justifyContent: "space-between",
          elevation: 10,
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
          <AppText style={{ color: "black", fontFamily: "Bold", fontSize: 22 }}>
            {
              dashboardData ? dashboardData.totalSales + " /- ": 0
            }
          </AppText>
        </View>
        <View
          style={{ alignSelf: "flex-end" }}
        >
          <AnimatedIcon name="stats-chart" size={30} color="blue" style={animatedStyle}/>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", marginVertical: 10, paddingLeft: 10, width: "90%" }}
      >
        <View
          style={{
            flexDirection: "column",
            width: "50%"
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
                {
                  dashboardData ? dashboardData.orders : 0 
                }
              </AppText>
            </View>
            <View
              style={{ alignSelf: "flex-end" }}
            >
              <AnimatedIcon name="layers" size={30} color="orange" style={animatedStyle}/>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            width: "40%",
            justifyContent: "space-evenly"
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "lightgreen",
              width: "100%",
              height: 70,
              borderRadius: 13,
              padding: 10,
              marginHorizontal: 15,
              elevation: 6,
              justifyContent: "flex-start"
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
            <View style={{ alignItems: "flex-end" }}>
              <AppText
                style={{
                  color: "black",
                  fontSize: 15,
                }}
              >
                <AnimatedIcon name="arrow-forward" size={30} color="black" style={animatedStyle}/>
              </AppText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "orange",
              width: "100%",
              height: 70,
              borderRadius: 13,
              padding: 10,
              marginHorizontal: 15,
              elevation: 6,
            }}
          >
            <View style={{ alignItems: "flex-start" }}>
              <AppText
                style={{
                  color: "black",
                  fontSize: 15,
                }}
                onPress={()=>{navigation.navigate("history")}}
              >
                Order History
              </AppText>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <AppText
                style={{
                  color: "black",
                  fontSize: 15,
                }}
              >
                <AnimatedIcon name="arrow-forward" size={30} color="black" style={animatedStyle}/>
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
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
          }}
        >
          <TouchableOpacity  onPress={() => navigation.navigate("cart")} 
            style={{
              height: 110,
              justifyContent: "space-between"
            }}
          >
            <View>
              <AppText style={{ color: "black", fontSize: 19 }}>Cart</AppText>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <AnimatedIcon name="cart" size={30} color="green" style={animatedStyle}/>
              <Text style={styles.textOnTop}>{
                cartItems && cartItems.length !== 0 ? "+" + cartItems.length : "" 
              }</Text>
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
              justifyContent: "space-between"
            }}
          >
            <View style={{ alignItems: "flex-start" }}>
              <AppText style={{ color: "black", fontSize: 19 }}>Settings</AppText>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <AnimatedIcon name="cog" size={30} color="red" style={animatedStyle}/>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "25%"
        }}
        onPress={()=>{
          setUser(null);
          salesmanAuthService.removeToken();
        }}
      >
        <AnimatedIcon name="exit-outline" size={30} color="red"/>
        <AppText style={{ color: "black", fontSize: 22, marginLeft: 15 }}>
          Logout
        </AppText>
      </TouchableOpacity>
    </View>
  );
}

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
    position: 'absolute',
    top: -12, 
    right: 5, 
    fontSize: 14,
    color: 'red',
    fontFamily: "Bold",
    borderRadius: 25,
  },
});

export default Dashboard;
