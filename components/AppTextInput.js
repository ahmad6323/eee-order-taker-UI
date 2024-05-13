import React from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import colors from "../config/colors";

function AppTextInput({ icon, editable = true, showDeleteIcon = false, onDelete, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width: width, flexDirection: 'row', alignItems: 'center' }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        editable={editable}
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, { flex: 1 }]}
        {...otherProps}
      />
      {showDeleteIcon && (
        <TouchableOpacity onPress={onDelete}>
          <MaterialCommunityIcons
            name="delete"
            size={20}
            color={defaultStyles.colors.medium}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: colors.medium,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
});
export default AppTextInput;
