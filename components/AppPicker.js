import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import AppText from "./AppText";
import SafeScreen from "./SafeScreen";
import ItemPicker from "./ItemPicker";
import colors from "../config/colors";

function AppPicker({
  icon,
  items,
  placeholder,
  numColumns = 1,
  width = "100%",
  PickerItemComponent = ItemPicker,
  selectedItem,
  onSelectedItem,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width: width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <AppText
              style={[styles.text, { color: defaultStyles.colors.dark }]}
            >
              {selectedItem.label}
            </AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <SafeScreen>
          <Button
            color={colors.secondary}
            title="Close"
            onPress={() => setModalVisible(false)}
          ></Button>
          <FlatList
            data={items}
            keyExtractor={(item) => item.value}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectedItem(item);
                }}
              />
            )}
          />
        </SafeScreen>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 14,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 0.5,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    color: defaultStyles.colors.medium,
  },
});
export default AppPicker;
