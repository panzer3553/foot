import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');
const Divider = ({type}) => {
  if (type === 'vertical') {
    return (
      <LinearGradient
        colors={['#FFFFFF00', '#FFFFFF', '#FFFFFF00']}
        style={styles.vertical}
      />
    );
  }
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#FFFFFF00', '#FFFFFF', '#FFFFFF00']}
      style={styles.normal}
    />
  );
};

const styles = StyleSheet.create({
  vertical: {
    height: 45,
    width: 1.5,
  },
  normal: {
    height: 1.5,
    marginVertical: 20,
    width: width - 60,
  },
});
export default Divider;
