import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

import colors from "../config/colors";

function AppButton({ icon, title, onPress, color = "primary", style }) {
  // Corrected destructuring here
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }, style]}
      onPress={onPress}
    >
      <View style={styles.buttonContent}>
        <Text style={styles.text}>{title}</Text>
        {icon && icon}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 4,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
    textTransform: "uppercase",
    marginRight: 10, // Add spacing between text and icon
  },
});

export default AppButton;
