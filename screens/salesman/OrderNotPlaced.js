import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import {
  FontFamily,
  Color,
  Border,
  Padding,
  FontSize,
} from "../../GlobalStyles";

const OrderNotPlaced = ({ navigation, route }) => {
  const msg = route.params;
  return (
    <View style={[styles.orderNotPlaced, styles.iconLayout1]}>
      <View style={styles.orderNotPlacedChild} />
      <View style={styles.option2Parent}>
        <View style={styles.optionBorder}>
          <View style={styles.applePayFlexBox}>
            <View style={styles.radioButton} />
            <Text style={[styles.cash, styles.cashTypo]}>Cash</Text>
          </View>
        </View>
        <View style={[styles.option3, styles.optionBorder]}>
          <View style={styles.applePayFlexBox}>
            <View style={styles.radioButton} />
            <Text style={[styles.cash, styles.cashTypo]}>Easypaisa</Text>
          </View>
        </View>
      </View>
      <Image
        style={[styles.iconPosition, { marginLeft: 20 }]}
        contentFit="cover"
        source={require("../../assets/ops.png")}
      />
      <View style={[styles.titlecaption, styles.titlecaptionLayout]}>
        <Text style={[styles.errorOccurred, { marginLeft: 20 }]}>
          Error Occurred
        </Text>
        <Text style={[styles.youCannotPlace, { marginLeft: 30 }]}>
          {msg ||
            "You cannot place this order at this moment. Please try again later."}
        </Text>
      </View>
      <Pressable
        style={[
          styles.buttonPrimary,
          styles.titlecaptionLayout,
          { marginLeft: 20 },
        ]}
        onPress={() => navigation.navigate("cart")}
      >
        <Text style={[styles.button, styles.cashTypo]}>Back to Checkout</Text>
      </Pressable>

      <View style={styles.navBar}>
        <Text style={[styles.pageTitle, styles.pageTitlePosition]}>
          Checkout
        </Text>
        <Text style={[styles.rightButton, styles.pageTitlePosition]}>
          Go Back
        </Text>
      </View>
      <Pressable
        style={styles.close}
        onPress={() => navigation.navigate("userhome")}
      >
        <Image
          style={[styles.icon, styles.iconLayout1, { marginLeft: 20 }]}
          contentFit="cover"
          source={require("../../assets/close.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout1: {
    width: "100%",
    overflow: "hidden",
  },
  cashTypo: {
    marginLeft: 8,
    textAlign: "left",
    fontWeight: "700",
  },
  optionBorder: {
    borderWidth: 0.5,
    borderColor: Color.colorLightgray,
    borderRadius: Border.br_base,
    borderStyle: "solid",
    alignSelf: "stretch",
    padding: Padding.p_base,
  },
  titlecaptionLayout: {
    width: 327,
    position: "absolute",
  },
  iconLayout: {
    height: 12,
    width: 12,
    display: "none",
  },
  iconPosition: {
    height: 150,
    width: 150,
    left: 110,
    top: 191,
    position: "absolute",
  },
  pageTitlePosition: {
    top: "50%",
    display: "none",
    position: "absolute",
  },
  orderNotPlacedChild: {
    bottom: 0,
    height: 96,
    alignItems: "center",
    left: 0,
    right: 0,
    position: "absolute",
  },
  radioButton: {
    borderRadius: Border.br_481xl,
    borderColor: Color.colorSilver_100,
    borderWidth: 1.5,
    width: 16,
    height: 16,
    borderStyle: "solid",
  },
  cash: {
    fontSize: FontSize.bodyBodyS_size,
    color: Color.neutralDarkLight,
    marginLeft: 8,
    textAlign: "left",
  },
  applePayFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  option3: {
    marginTop: 16,
  },
  option2Parent: {
    top: 299,
    display: "none",
    padding: Padding.p_base,
    left: 0,
    right: 0,
    position: "absolute",
  },
  errorOccurred: {
    fontSize: FontSize.size_5xl,
    lineHeight: 32,
    color: Color.neutral100,
    textAlign: "center",
    fontWeight: "700",
    alignSelf: "stretch",
  },
  youCannotPlace: {
    lineHeight: 20,
    fontWeight: "500",
    color: Color.neutral60,
    marginTop: 12,
    fontSize: FontSize.size_mini,
    textAlign: "center",
    alignSelf: "stretch",
  },
  titlecaption: {
    top: 364,
    left: 22,
  },
  button: {
    color: Color.neutralLightLightest,
    fontSize: FontSize.size_mini,
    marginLeft: 8,
    textAlign: "left",
  },
  rightIcon: {
    marginLeft: 8,
    overflow: "hidden",
  },
  buttonPrimary: {
    top: 503,
    left: 26,
    borderRadius: Border.br_xs,
    backgroundColor: Color.highlightDarkest,
    height: 48,
    justifyContent: "center",
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  frameIcon: {
    overflow: "hidden",
  },
  pageTitle: {
    marginTop: -8.5,
    marginLeft: -35,
    left: "50%",
    fontSize: FontSize.size_base,
    fontWeight: "800",
    color: Color.neutralDarkDarkest,
    textAlign: "center",
  },
  rightButton: {
    marginTop: -7.5,
    left: 24,
    fontSize: FontSize.bodyBodyM_size,
    fontWeight: "600",
    color: Color.highlightDarkest,
    textAlign: "left",
  },
  navBar: {
    top: 0,
    height: 56,
    left: 0,
    right: 0,
    position: "absolute",
    overflow: "hidden",
    backgroundColor: Color.neutralLightLightest,
  },
  icon: {
    height: "100%",
    overflow: "hidden",
  },
  close: {
    left: 333,
    top: 40,
    width: 20,
    height: 20,
    position: "absolute",
  },
  orderNotPlaced: {
    flex: 1,
    height: 812,
    overflow: "hidden",
    backgroundColor: Color.neutralLightLightest,
    width: "100%",
  },
});

export default OrderNotPlaced;
