import React from "react";
import { StyleSheet } from "react-native";

import colors from "../../config/colors";
import AppText from "../AppText";

function AppErrorMessage({ error, visible }) {
  return error && visible ? (
    <AppText style={styles.error}>{error}</AppText>
  ) : undefined;
}

const styles = StyleSheet.create({
  error: {
    color: colors.danger,
  },
});

export default AppErrorMessage;
