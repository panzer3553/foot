import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {Text} from './Text';

const Canvas = ({imageStyle, imageSource, text}) => {
  return (
    <View style={styles.slide}>
      <Image source={imageSource} style={[styles.image, imageStyle]} />
      {text && (
        <View style={styles.textView}>
          <Text color="white">{text}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textView: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    backgroundColor: '#555575',
    borderRadius: 25,
    padding: 3,
  },
  image: {
    borderRadius: 25,
  },
});

export default Canvas;
