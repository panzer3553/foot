import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Heading4, Text } from './Text';
import { NavigationUtils } from '../navigation';

export const EmptyView = ({ image, text, isSmall = false, isLogin }) => {
    return (
      <View style={[styles.container, styles.exploreModeContainer]}>
        <Image source={image} style={[styles.image, isSmall && styles.small]} resizeMode="contain"/>
        {isLogin ? (<Text style={styles.txtLogin} onPress={() => {
          NavigationUtils.showModal({
            screen: 'signup',
            passProps: {
              exploreMode: true,
            },
          });
        }}>
          {'Please '}
          <Heading4  style={styles.txtLogin}>Login</Heading4>
          {' to explore more'}
          </Text>
          ) : <Text>{text}</Text>}
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  exploreModeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  small: {
    width: 150,
    height: 150,
  },
});

export default EmptyView;
