import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import config from "../config.json";
import colors from '../config/colors';

const pictureEndpoint = config.pictureUrl + "/public/products";

const ImageSlider = ({ images, style }) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  const goToPrevious = () => {
    const previousIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(previousIndex);
  };

  return (
    <View style={style }>
      <Image
        source={{ uri: `${pictureEndpoint}/${images[currentIndex]}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={goToPrevious}>
            <MaterialCommunityIcons
                name="arrow-left"
                size={25}
                color={colors.primary}
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToNext}>
            <MaterialCommunityIcons
                name="arrow-right"
                size={25}
                color={colors.primary}
            />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
  },
});

export default ImageSlider;
