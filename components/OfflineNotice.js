import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";

function OfflineNotice(props) {
  const netInfo = useNetInfo();
  if (netInfo.isInternetReachable === false && netInfo.type !== "unknown")
    return (
      <View style={styles.container}>
        <AppText style={styles.text}>No Internet Connection!</AppText>
      </View>
    );
  return null;
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.danger,
    height: 50,
    width: "100%",
    position: "absolute",
    top: Constants.statusBarHeight + 3,
    zIndex: 1,
  },
  text: {
    color: colors.white,
  },
});
export default OfflineNotice;
