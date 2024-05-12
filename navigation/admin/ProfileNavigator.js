import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import React from "react";
import HomeScreen from "../../screens/HomeScreen";
import AddSalesman from "../../screens/AddSalesman";
import ProfileScreen from "../../screens/ProfileScreen";
import AddProduct from "../../screens/AddProduct";
import Addedalesman from "../../screens/Addedalesman";
import AddedProducts from "../../screens/AddedProducts";
import Dashboard from "../../screens/Dashboard";
import Allocation from "../../screens/Allocation";
import AllocateForm from "../../screens/AllocateForm";
import DepartmentScreen from "../../screens/DepartmentScreen";
import Category from "../../screens/Categories";
import SelectCategory from "../../screens/SelectCategories";
import EmailVerificationInput from "../../screens/VerificationScreen";
import OrderHistoryScreen from "../../screens/admin/OrderHistory";
import OrderDetailsScreen from "../../screens/admin/OrderDetails";
import OrderDetailsMap from "../../screens/admin/OrderDetailsMap";
import DeptProduct from "../../screens/admin/DeptProduct";
import SizeScreen from "../../screens/admin/SizeScreen";
import Receipt from "../../screens/admin/Receipt";
import ColorScreen from "../../screens/admin/ColorScreen";

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="profiles" component={ProfileScreen} />
      <Stack.Screen name="addsaleman" component={AddSalesman} />
      <Stack.Screen name="addproduct" component={AddProduct} />
      <Stack.Screen name="addedsalesman" component={Addedalesman} />
      <Stack.Screen name="addedproducts" component={AddedProducts} />
      <Stack.Screen name="dashboard" component={Dashboard} />
      <Stack.Screen name="allocation" component={Allocation} />
      <Stack.Screen name="allocationfrom" component={AllocateForm} />
      <Stack.Screen name="department" component={DepartmentScreen} />
      <Stack.Screen name="categories" component={Category} />
      <Stack.Screen name="addcat" component={SelectCategory} />
      <Stack.Screen name="verification" component={EmailVerificationInput} />
      <Stack.Screen name="history" component={OrderHistoryScreen} />
      <Stack.Screen name="orderdetail" component={OrderDetailsScreen} />
      <Stack.Screen name="orderdetailmap" component={OrderDetailsMap} />
      <Stack.Screen name="deptprod" component={DeptProduct} />
      <Stack.Screen name="sizes" component={SizeScreen} />
      <Stack.Screen name="receipt" component={Receipt} />
      <Stack.Screen name="colors" component={ColorScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
