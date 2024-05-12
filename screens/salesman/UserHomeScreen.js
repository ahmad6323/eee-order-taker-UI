import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../../config/colors";
import AppText from "../../components/AppText";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width * 0.8;
import { FontAwesome5 } from "@expo/vector-icons";
import { UserContext } from "../../UserContext";
import salesmanAuthService from "../../utilty/salesmanAuthService";
import { getOrders } from "../../utilty/orderUtility";
import { getAllocations } from "../../utilty/allocationUtility";

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

const UserHomeScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [sales, setSales] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const allOrders = await getOrders();
        const filteredOrders = allOrders.data.filter(
          (order) => order.salesman === user._id
        );
        setOrders(filteredOrders);
        const totalSales = filteredOrders.reduce(
          (acc, order) => acc + order.price,
          0
        );
        setSales(totalSales);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchAllocations = async () => {
      try {
        const allAllocations = await getAllocations();

        const filteredAllocations = allAllocations.data.filter(
          (allocation) => allocation.salesmanId._id === user._id
        );

        setAllocations(filteredAllocations);
      } catch (error) {
        console.error("Error fetching allocations:", error);
      }
    };

    fetchOrders();
    fetchAllocations();
  }, [user._id]);

  const handleSettingsPress = () => {
    // Handle settings press logic here
    navigation.navigate("profile");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 40,
          left: 20,
          padding: 10,
          zIndex: 1,
        }}
        onPress={() => navigation.navigate("cart")}
      >
        <FontAwesome5 name="shopping-cart" size={30} color={colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsButton}
        // onPress={handleSettingsPress}
        onPress={() => {
          setUser(null);
          salesmanAuthService.removeToken();
        }}
      >
        <MaterialIcons name="settings" size={24} color="black" />
      </TouchableOpacity>

      <View
        style={{
          width: "85%",
          backgroundColor: colors.white,
          height: 130,
          borderRadius: 15,
          alignItems: "flex-start",
          padding: 10,
          justifyContent: "space-between",
          elevation: 6,
        }}
      >
        <View>
          <AppText style={{ fontWeight: "bold" }}>Total Sales(pkr)</AppText>
          <AppText style={{ color: colors.medium }}>{sales}</AppText>
        </View>
        <Octicons
          name="graph"
          style={{ alignSelf: "flex-end" }}
          size={40}
          color="#A766F9"
        />
      </View>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <View
          style={{
            backgroundColor: colors.white,
            width: "40%",
            height: 155,
            borderRadius: 10,
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
            elevation: 6,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <AppText style={{ color: colors.medium }}>Total Orders</AppText>
            <AppText
              style={{ color: colors.black, fontWeight: "bold", fontSize: 24 }}
            >
              {orders.length}
            </AppText>
          </View>
          <Fontisto
            style={{ alignSelf: "flex-end" }}
            name="shopping-basket-add"
            size={40}
            color="#F9B466"
          />
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            width: "40%",
            height: 155,
            borderRadius: 10,
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
            marginHorizontal: 15,
            elevation: 6,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <AppText
              style={{
                color: colors.medium,
                fontSize: 20,
              }}
            >
              Assigned Products
            </AppText>
            <AppText
              style={{ color: colors.black, fontWeight: "bold", fontSize: 24 }}
            >
              {allocations.length}
            </AppText>
          </View>
          <Entypo
            name="arrow-bold-right"
            style={{ alignSelf: "flex-end" }}
            size={40}
            color="black"
          />
        </View>
      </View>
      <View
        style={{ flexDirection: "row", marginVertical: 10, marginBottom: 18 }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("history", orders)}
          style={{
            backgroundColor: colors.white,
            width: "40%",
            height: 155,
            borderRadius: 10,
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
            elevation: 6,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <AppText style={{ color: colors.medium }}>
              View Your Past Sale
            </AppText>
          </View>
          <Octicons
            name="history"
            style={{ alignSelf: "flex-end" }}
            size={40}
            color="#46EB8E"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("list")}
          style={{
            backgroundColor: colors.white,
            width: "40%",
            height: 155,
            borderRadius: 10,
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
            marginHorizontal: 15,
            elevation: 6,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <AppText
              style={{
                color: colors.medium,
                fontSize: 20,
              }}
            >
              Sell Your Products
            </AppText>
          </View>
          <Entypo
            name="arrow-bold-right"
            style={{ alignSelf: "flex-end" }}
            size={40}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <BarChart
        // style={graphStyle}
        data={data}
        width={screenWidth}
        height={200}
        yAxisLabel="%"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    </View>
  );
};

export default UserHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
    zIndex: 1,
  },
  innerContainer: {
    width: "80%",
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: "flex-start",
  },
  logo: {
    color: colors.dark,
    fontSize: 35,
    fontWeight: "bold",
  },
  subText: {
    color: colors.medium,
    fontSize: 16,
    textAlign: "center",
  },
  formContainer: {
    marginTop: 20,
  },
  forgotPasswordText: {
    color: colors.primary,
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: "underline",
    alignItems: "flex-end",
  },
});
