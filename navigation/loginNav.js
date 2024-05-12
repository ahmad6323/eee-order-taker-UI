import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import RoleScreen from "../screens/RoleScreen";
import AdminLoginScreen from "../screens/AdminLoginScreen";
import ForgotScreen from "../screens/salesman/ForgetScreen";
import ResetPassword from "../screens/salesman/ResetPassword";
import AdminForgotScreen from "../screens/admin/AdminForgetScreen";
import AdminResetPassword from "../screens/admin/AdminResetPassword";

const LoginNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="role" component={RoleScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="adminlogin" component={AdminLoginScreen} />
      <Stack.Screen name="forgot" component={ForgotScreen} />
      <Stack.Screen name="adminforgot" component={AdminForgotScreen} />
      <Stack.Screen name="adminreset" component={AdminResetPassword} />
      <Stack.Screen name="reset" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default LoginNav;
