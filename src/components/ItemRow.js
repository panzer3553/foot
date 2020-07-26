import React from 'react';
import { TouchableOpacity,StyleSheet } from 'react-native';
import { Heading4, Text } from './Text';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import { Colors } from '../themes';

const Item = ({onPress, title, haveIcon = true, textColor, subText}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <Heading4 style={{flex: 1}} color={textColor}>{title}</Heading4>
      {subText && <Text>{subText}</Text>}
      {haveIcon && <Icon name="angle-right" size={20}/>}
     </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 15,
    marginHorizontal: 25,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.divideLine,
  },
});

export default Item;
