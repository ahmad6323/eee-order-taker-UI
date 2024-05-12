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

const OrderPlaced = ({ navigation }) => {
  return (
    <View style={[styles.orderPlaced, styles.iconLayout1]}>
      <View style={styles.orderPlacedChild} />
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
        style={[styles.illustrationSuccessIcon, { marginLeft: 20 }]}
        contentFit="cover"
        source={require("../../assets/success.png")}
      />
      <View style={[styles.titlecaption, styles.titlecaptionPosition]}>
        <Text style={[styles.orderConfirmed, { marginLeft: 20 }]}>
          Order Confirmed
        </Text>
        <Text style={[styles.orderHasBeen, { marginLeft: 20 }]}>
          Order has been successfully placed!
        </Text>
      </View>
      <Pressable
        style={[
          styles.buttonPrimary,
          styles.titlecaptionPosition,
          { marginLeft: 20 },
        ]}
        onPress={() => navigation.navigate("userhome")}
      >
        <Text style={[styles.button, styles.cashTypo]}>Back to Home</Text>
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
  titlecaptionPosition: {
    width: 327,
    left: 26,
    position: "absolute",
  },
  iconLayout: {
    height: 12,
    width: 12,
    display: "none",
  },
  pageTitlePosition: {
    top: "50%",
    display: "none",
    position: "absolute",
  },
  orderPlacedChild: {
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
  illustrationSuccessIcon: {
    top: 172,
    left: 59,
    width: 249,
    height: 207,
    position: "absolute",
  },
  orderConfirmed: {
    fontSize: FontSize.size_5xl,
    lineHeight: 32,

    color: Color.neutral100,
    textAlign: "center",
    fontWeight: "700",
    alignSelf: "stretch",
  },
  orderHasBeen: {
    lineHeight: 20,
    fontWeight: "500",

    color: Color.neutral60,
    marginTop: 12,
    fontSize: FontSize.size_mini,
    textAlign: "center",
    alignSelf: "stretch",
  },
  titlecaption: {
    top: 410,
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
    top: 505,
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
  orderPlaced: {
    flex: 1,
    height: 812,
    overflow: "hidden",
    backgroundColor: Color.neutralLightLightest,
    width: "100%",
  },
});

export default OrderPlaced;
