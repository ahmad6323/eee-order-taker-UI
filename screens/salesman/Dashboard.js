import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../../components/AppText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../../UserContext";
import salesmanAuthService from "../../utilty/salesmanAuthService";

import { Ionicons } from '@expo/vector-icons';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);


const Dashboard = ({ navigation }) => {

  const { user, setUser } = useContext(UserContext);

  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.2, {
        duration: 500,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
  }, []);

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
          <AppText style={{ color: "black", fontWeight: "bold", fontSize: 22 }}>
            999999999
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
                style={{ color: "black", fontWeight: "bold", fontSize: 24 }}
              >
                10000
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
            onPress={() => navigation.navigate("list")}
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
            width: "40%",
            height: 130,
            borderRadius: 13,
            alignItems: "flex-starts",
            padding: 10,
            justifyContent: "space-between",
            elevation: 6,
          }}
        >
          <TouchableOpacity  onPress={() => navigation.navigate("cart")} >
            <View style={{ alignItems: "flex-start" }}>
              <AppText style={{ color: "black", fontSize: 19 }}>Cart</AppText>
            </View>
          </TouchableOpacity>
          <View style={{ alignItems: "flex-end" }}>
            <AppText
              style={{
                color: "black",
                fontSize: 15,
              }}
            >
              <AnimatedIcon name="cart" size={30} color="red" style={animatedStyle}/>
            </AppText>
          </View>
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
          <TouchableOpacity>
            <View style={{ alignItems: "flex-start" }}>
              <AppText style={{ color: "black", fontSize: 19 }}>Settings</AppText>
            </View>
          </TouchableOpacity>
          <View style={{ alignItems: "flex-end" }}>
            <AnimatedIcon name="cog" size={30} color="red" style={animatedStyle}/>
          </View>
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
        <AnimatedIcon name="cog" size={30} color="red" style={animatedStyle}/>
        <AppText style={{ color: "black", fontSize: 19 }}>
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
    fontWeight: "bold",
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
});

export default Dashboard;
