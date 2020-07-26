import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import { Colors } from '../themes/';

export const CloseButton = ({onClose, style}) => {
  return (
    <TouchableOpacity style={style} onPress={onClose}>
      <View style={styles.container}>
        <Icon name="times" size={18} color="white"/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blackFade200,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CloseButton;
