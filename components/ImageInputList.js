import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageInput from "./ImageInput";

function ImageInputList({ imageUris = [], onAddImage, onRemoveImage }) {
  const scrollViewRef = useRef(null);
  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((imageUri) => (
            <View style={styles.image} key={imageUri}>
              <ImageInput
                imageUri={imageUri}
                onSelectImage={() => onRemoveImage(imageUri)}
              />
            </View>
          ))}

          <ImageInput onSelectImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});
export default ImageInputList;
