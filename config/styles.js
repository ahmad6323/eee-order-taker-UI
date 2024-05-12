import { Platform, StyleSheet, StatusBar } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
  colors,
  text: {
    fontSize: 20,
    fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto",
    color: colors.dark,
  },
  parameters: {
    statusBarHeight: StatusBar.currentHeight,
    // headerHeight: "50%",
  },
});

export default styles;
