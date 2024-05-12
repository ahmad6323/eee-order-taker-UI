import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
// import { LinearGradient } from "expo-linear-gradient";

function Dashboards({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <AppText style={styles.logo}>Dashboard</AppText>
          <AppText style={styles.subText}>
            Here Is All Data Visualization
          </AppText>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", marginVertical: 10, paddingLeft: 10 }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            width: "40%",
            height: 155,
            borderRadius: 13,
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
            elevation: 6,
          }}
        >
          {/* <LinearGradient
            // Background Linear Gradient
            colors={["rgba(252,185,69,87)", "transparent"]}
            style={styles.background}
          /> */}
          <View style={{ alignItems: "center" }}>
            <AppText style={{ color: colors.medium }}>Total Orders</AppText>
            <AppText
              style={{ color: colors.black, fontWeight: "bold", fontSize: 24 }}
            >
              10069
            </AppText>
          </View>
          <Svg
            style={{ alignSelf: "flex-end" }}
            width="50"
            height="50"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              opacity="0.21"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z"
              fill="#F9B466"
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15 24.3164L27.9005 31.7645C28.0394 31.8447 28.1851 31.9026 28.3333 31.9394V46.3846L15.9201 39.0385C15.3498 38.701 15 38.0875 15 37.4248V24.3164ZM45 24.1184V37.4248C45 38.0875 44.6502 38.701 44.0799 39.0385L31.6667 46.3846V31.8129C31.6969 31.7978 31.7269 31.7816 31.7566 31.7645L45 24.1184Z"
              fill="#F9B466"
            />
            <Path
              opacity="0.499209"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.4052 20.7014C15.5628 20.5024 15.7617 20.3343 15.9936 20.2108L29.1186 13.2201C29.6695 12.9266 30.3304 12.9266 30.8814 13.2201L44.0064 20.2108C44.1852 20.306 44.3443 20.4277 44.48 20.5697L30.0899 28.8778C29.9953 28.9325 29.908 28.995 29.8285 29.064C29.749 28.995 29.6618 28.9325 29.5671 28.8778L15.4052 20.7014Z"
              fill="#F9B466"
            />
          </Svg>
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            width: "40%",
            height: 155,
            borderRadius: 13,
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
            marginHorizontal: 15,
            elevation: 6,
          }}
        >
          {/* <LinearGradient
            // Background Linear Gradient
            colors={["rgba(253,104,29,100)", "transparent"]}
            style={styles.background}
          /> */}
          <View style={{ alignItems: "center" }}>
            <AppText
              style={{
                color: colors.medium,
                fontSize: 19,
              }}
            >
              Total Products
            </AppText>
            <AppText
              style={{ color: colors.black, fontWeight: "bold", fontSize: 24 }}
            >
              69
            </AppText>
          </View>
          <Svg
            style={{ alignSelf: "flex-end" }}
            width="50"
            height="50"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              opacity="0.3"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z"
              fill="#FF9066"
            />
            <Path
              opacity="0.78"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M28.6312 23.8088C28.6512 23.5483 28.8684 23.3472 29.1297 23.3472H29.5475C29.8044 23.3472 30.0195 23.5418 30.045 23.7974L30.6667 30.0138L35.0814 32.5365C35.2372 32.6256 35.3333 32.7912 35.3333 32.9707V33.3592C35.3333 33.6889 35.0199 33.9283 34.7018 33.8416L28.3987 32.1226C28.1673 32.0595 28.0133 31.841 28.0317 31.6018L28.6312 23.8088Z"
              fill="#FF9066"
            />
            <Path
              opacity="0.901274"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.7218 14.9843C22.4577 14.6696 21.9477 14.7901 21.8524 15.1897L20.2189 22.0379C20.1412 22.3635 20.3993 22.672 20.7336 22.6531L27.7783 22.2539C28.1892 22.2306 28.3976 21.7485 28.133 21.4333L26.3316 19.2864C27.4965 18.8884 28.7317 18.6805 30 18.6805C36.2592 18.6805 41.3333 23.7546 41.3333 30.0138C41.3333 36.273 36.2592 41.3471 30 41.3471C23.7408 41.3471 18.6667 36.273 18.6667 30.0138C18.6667 28.963 18.809 27.9339 19.0864 26.9448L16.5188 26.2245C16.1808 27.4297 16 28.7006 16 30.0138C16 37.7458 22.268 44.0138 30 44.0138C37.732 44.0138 44 37.7458 44 30.0138C44 22.2818 37.732 16.0138 30 16.0138C28.0551 16.0138 26.2029 16.4104 24.5197 17.1271L22.7218 14.9843Z"
              fill="#FF9066"
            />
          </Svg>
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
            backgroundColor: colors.white,
            width: "40%",
            height: 155,
            borderRadius: 13,
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
            elevation: 6,
          }}
        >
          {/* <LinearGradient
            // Background Linear Gradient
            colors={["rgba(17,181,224,100)", "transparent"]}
            style={styles.background}
          /> */}
          <View style={{ alignItems: "center" }}>
            <AppText style={{ color: colors.medium, fontSize: 19 }}>
              Total Salesman
            </AppText>
            <AppText
              style={{ color: colors.black, fontWeight: "bold", fontSize: 24 }}
            >
              169
            </AppText>
          </View>
          <Svg
            style={{ alignSelf: "flex-end" }}
            width="50"
            height="50"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              opacity="0.21"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z"
              fill="#8280FF"
            />
            <Path
              opacity="0.587821"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.6667 23.3333C20.6667 26.2789 23.0545 28.6667 26 28.6667C28.9455 28.6667 31.3334 26.2789 31.3334 23.3333C31.3334 20.3878 28.9455 18 26 18C23.0545 18 20.6667 20.3878 20.6667 23.3333ZM34 28.6667C34 30.8758 35.7909 32.6667 38 32.6667C40.2092 32.6667 42 30.8758 42 28.6667C42 26.4575 40.2092 24.6667 38 24.6667C35.7909 24.6667 34 26.4575 34 28.6667Z"
              fill="#8280FF"
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M25.9778 31.3333C19.6826 31.3333 14.5177 34.5687 14.0009 40.9323C13.9727 41.2789 14.6356 42 14.97 42H36.9956C37.9972 42 38.0128 41.1939 37.9972 40.9333C37.6065 34.3909 32.3616 31.3333 25.9778 31.3333ZM45.2746 42L40.1333 42C40.1333 38.9987 39.1417 36.2291 37.4683 34.0008C42.0103 34.0505 45.7189 36.3468 45.998 41.2C46.0092 41.3955 45.998 42 45.2746 42Z"
              fill="#8280FF"
            />
          </Svg>
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            width: "40%",
            height: 155,
            borderRadius: 13,
            alignItems: "center",
            padding: 10,
            justifyContent: "space-between",
            marginHorizontal: 15,
            elevation: 6,
          }}
        >
          {/* <LinearGradient
            // Background Linear Gradient
            colors={["rgba(34,195,153,88)", "transparent"]}
            style={styles.background}
          /> */}
          <View style={{ alignItems: "center" }}>
            <AppText
              style={{
                color: colors.medium,
                fontSize: 20,
              }}
            >
              Total Sales
            </AppText>
            <AppText
              style={{ color: colors.black, fontWeight: "bold", fontSize: 24 }}
            >
              69696
            </AppText>
          </View>
          <Svg
            style={{ alignSelf: "flex-end" }}
            width="50"
            height="50"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              opacity="0.21"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z"
              fill="#4AD991"
            />
            <Path
              d="M19.1111 40.8889H42.4444C43.3036 40.8889 44 41.5853 44 42.4444C44 43.3036 43.3036 44 42.4444 44H17.5556C16.6964 44 16 43.3036 16 42.4444V17.5556C16 16.6964 16.6964 16 17.5556 16C18.4147 16 19.1111 16.6964 19.1111 17.5556V40.8889Z"
              fill="#4AD991"
            />
            <Path
              opacity="0.5"
              d="M24.9126 34.175C24.325 34.8018 23.3406 34.8335 22.7138 34.246C22.0871 33.6584 22.0553 32.674 22.6429 32.0472L28.4762 25.825C29.0445 25.2189 29.9888 25.1663 30.6208 25.7056L35.2248 29.6344L41.2235 22.0361C41.7558 21.3618 42.734 21.2467 43.4083 21.7791C44.0826 22.3114 44.1977 23.2896 43.6653 23.9639L36.6653 32.8306C36.1186 33.5231 35.1059 33.6227 34.4347 33.05L29.7306 29.0358L24.9126 34.175Z"
              fill="#4AD991"
            />
          </Svg>
        </View>
      </View>
      <View
        style={{
          width: "85%",
          backgroundColor: colors.white,
          height: 130,
          borderRadius: 20,
          alignItems: "flex-start",
          padding: 10,
          justifyContent: "space-between",
          elevation: 6,
        }}
      >
        <View>
          <AppText style={{ fontWeight: "bold" }}>
            Trending Product (top sale)
          </AppText>
          <AppText style={{ color: colors.medium }}>My Shirt</AppText>
        </View>
        <MaterialIcons
          name="local-fire-department"
          size={40}
          color="orange"
          style={{ alignSelf: "flex-end" }}
        />
      </View>
      <View
        style={{
          width: "85%",
          backgroundColor: colors.white,
          height: 130,
          borderRadius: 20,
          alignItems: "flex-start",
          padding: 10,
          justifyContent: "space-between",
          elevation: 6,
          marginTop: 15,
        }}
      >
        <View>
          <AppText style={{ fontWeight: "bold" }}>
            Digressive Product (lowest sale)
          </AppText>
          <AppText style={{ color: colors.medium }}>Denim Jeans</AppText>
        </View>
        <MaterialIcons
          name="fmd-bad"
          size={40}
          color={colors.danger}
          style={{ alignSelf: "flex-end" }}
        />
      </View>
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
    color: colors.dark,
    fontSize: 35,
    fontWeight: "bold",
  },
  subText: {
    paddingLeft: 20,
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
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 170,
    borderRadius: 13,
  },
});
Dashboards;
export default Dashboard;
