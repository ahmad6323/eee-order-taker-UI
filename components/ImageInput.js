import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

function ImageInput({ imageUri, onSelectImage }) {
  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("DELETE", "Are you sure to delete image?", [
        { text: "Yes", onPress: onSelectImage },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.canceled) onSelectImage(result.assets[0].uri);
    } catch (error) {
      console.log("error reading an image", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            size={40}
            name="camera"
            color={colors.medium}
          />
        )}
        {imageUri && <Image style={styles.image} source={{ uri: imageUri }} />}
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
    overflow: "hidden",
    marginBottom: 7,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default ImageInput;
