import React, { useRef, useEffect } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import isNumber from 'lodash.isnumber';
import { Subheading, Text } from 'react-native-paper';
import { Images, Colors } from '../../themes';
import LinearGradient from 'react-native-linear-gradient';

const { width: viewportWidth } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(viewportWidth);
const itemHorizontalMargin = wp(5);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const Row = ({ item, onPressItem }) => {
  const { thumbnail, _id } = item;
  return (
    <TouchableOpacity
      style={styles.slide}
      onPress={() => {
        onPressItem(item);
      }}>
      <ImageBackground
        defaultSource={Images.DEFAULT_CAROUSEL}
        source={{ uri: thumbnail }}
        style={styles.image}>
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[Colors.blackFade10, Colors.blackFade860]}
          style={styles.imageFadeContainer}>
          <Subheading numberOfLines={2} style={styles.title}>
            {item.name}
          </Subheading>
          <Text numberOfLines={2} style={styles.title}>
            {item.description}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const CarouselList = (props) => {
  const { carouselIndex,  data } = props;
  const carouselRef = useRef();

  const onAfterSnapToItem = (index) => {
    props.onSnapItem(data[index]);
  };

  useEffect(() => {}, []);

  const onFirstSnap = () => {
    props.onSnapItem(data[0]);

    if (carouselRef && isNumber(carouselIndex) && carouselIndex >= 0) {
      carouselRef.snapToItem(carouselIndex);
    }

    if (carouselIndex === 0) {
      setTimeout(() => {}, 200);
    }
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        data={data}
        firstItem={0}
        renderItem={({ item }) => Row({ item, onPressItem: props.onPressItem })}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth - 110}
        inactiveSlideScale={1}
        onSnapToItem={onAfterSnapToItem}
        onLayout={onFirstSnap}
        removeClippedSubviews={false}
      />
    </View>
  );
};

export default CarouselList;

const styles = StyleSheet.create({
  slide: {
    backgroundColor: Colors.white,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    //android
    elevation: 1,
  },
  carouselContainer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  imageFadeContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 8,
  },
  title: {
    width: '100%',
    color: Colors.white,
  },
  description: {
    width: '100%',
    color: Colors.white,
  },
});
