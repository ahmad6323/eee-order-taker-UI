import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import React from "react";
import UserHomeScreen from "../screens/salesman/UserHomeScreen";
import HomeScreen from "../screens/HomeScreen";
import ProductsList from "../screens/salesman/ProductsList";
import ProductListDetail from "../screens/salesman/ProductListDetail";
import CartScreen from "../screens/salesman/CartScreen";
import History from "../screens/salesman/history";
import OrderPlaced from "../screens/salesman/OrderPlaced";
import OrderNotPlaced from "../screens/salesman/OrderNotPlaced";

const SalesmanNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="userhome" component={UserHomeScreen} />
      <Stack.Screen name="profile" component={HomeScreen} />
      <Stack.Screen name="list" component={ProductsList} />
      <Stack.Screen name="cart" component={CartScreen} />
      <Stack.Screen name="listdetail" component={ProductListDetail} />
      <Stack.Screen name="history" component={History} />
      <Stack.Screen name="done" component={OrderPlaced} />
      <Stack.Screen name="fail" component={OrderNotPlaced} />
    </Stack.Navigator>
  );
};

export default SalesmanNavigator;
