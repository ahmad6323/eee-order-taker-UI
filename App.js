// App.js
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import SalesmanNavigator from "./navigation/SalesmanNavigator";
import { CartProvider } from "./CartContext";
import ProfileNavigator from "./navigation/admin/ProfileNavigator";
import LoginNav from "./navigation/loginNav";
import * as SplashScreen from "expo-splash-screen";
import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
import salesmanAuthService from "./utilty/salesmanAuthService";
import { UserContext } from "./UserContext";
import OfflineNotice from "./components/OfflineNotice";
import { useFonts } from 'expo-font';
import ActivityIndicator from "./components/ActivityIndicator";

export default function App() {

  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/poppins/Poppins-Regular.ttf'),
  });

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await salesmanAuthService.getUser();
    if (user) setUser(user);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await restoreUser();
      } catch (error) {
        console.log("Error loading app", error);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onNavigationContainerReady = useCallback(async () => {
    if (isReady) await SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) return null;

  if(!fontsLoaded){
    return <ActivityIndicator visible={true}/>
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer onReady={onNavigationContainerReady}>
        {
          user && user.role === "salesman" ? (
          <CartProvider>
            <OfflineNotice />
            <SalesmanNavigator />
          </CartProvider>
        ) : user && user.role === "admin" ? (
          <ProfileNavigator /> 
        ) : (
          <LoginNav />
        )}
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
