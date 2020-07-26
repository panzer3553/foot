import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import { Colors } from '../themes';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';

const ViewCount = ({ numOfUsers, style }) => {
  return (
    <View style={[styles.buttonNumOfUsers, style]}>
      <Icon name="eye" size={11} color={Colors.white} />
      <Text style={styles.txtUsers} color={Colors.white}>{`  ${numOfUsers}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonNumOfUsers: {
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
});

export default ViewCount;
