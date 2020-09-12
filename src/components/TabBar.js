import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Images} from '../themes';
import {NavigationUtils} from '../navigation';
import {Heading2} from './Text';
import DeviceInfo from 'react-native-device-info';
import Divider from './Divider';
import {useDeviceOrientation} from '@react-native-community/hooks';
import LinearGradient from 'react-native-linear-gradient';

const {height, width} = Dimensions.get('window');

let isTablet = DeviceInfo.isTablet();

const TabBar = ({activeIndex = 0, theme, isLandscape}) => {
  const buttons = [
    {
      id: 'home',
      image: Images.home,
      text: 'Home',
    },
    {
      id: 'add',
      image: Images.add,
      text: 'New Capture',
    },
    {
      id: 'library',
      image: theme === 'dark' ? Images.library1 : Images.library,
      text: 'Library',
    },
    {
      id: 'more',
      image: Images.more,
      text: 'More',
    },
  ];
  let color = 'rgb(21,145, 255)';
  if (theme === 'black') {
    color = '#212733';
  }

  if (isTablet && isLandscape) {
    return (
      <LinearGradient
        style={styles.tabletRow}
        colors={['rgb(148, 202, 235)', 'rgb(86, 151, 222)']}>
        {buttons.map(({image, text}, index) => {
          const isFocused = activeIndex === index;
          const nextFocus = activeIndex + 1 === index;
          const previousFocus = activeIndex - 1 === index;
          return (
            <View style={styles.blockTablet} key={index}>
              <TouchableOpacity
                activeOpacity={1}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                onPress={() => NavigationUtils.changeBottomTab(index)}
                style={[
                  styles.buttonTablet,
                  {
                    flexDirection: 'row',
                    // borderTopLeftRadius: nextFocus ? 25 : 0,
                    // borderTopRightRadius: previousFocus ? 25 : 0,
                    // borderBottomLeftRadius: isFocused ? 15 : 0,
                    // borderBottomRightRadius: isFocused ? 15 : 0,
                    backgroundColor: isFocused
                      ? 'transaparent'
                      : 'transaparent',
                  },
                ]}>
                <Image source={image} style={{marginRight: 30}} />
                <Heading2>{text}</Heading2>
              </TouchableOpacity>
              <Divider
                style={{width: 250, height: 1.5, marginHorizontal: 20}}
              />
            </View>
          );
        })}
      </LinearGradient>
    );
  }

  if (isTablet && !isLandscape) {
    return (
      <LinearGradient
        style={[styles.row, {width: width}]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['rgb(148, 202, 235)', 'rgb(86, 151, 222)']}>
        {buttons.map(({image}, index) => {
          const isFocused = activeIndex === index;
          const nextFocus = activeIndex + 1 === index;
          const previousFocus = activeIndex - 1 === index;
          return (
            <View style={[styles.block, {flex: -1, width: 100}]} key={index}>
              <TouchableOpacity
                activeOpacity={1}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                onPress={() => NavigationUtils.changeBottomTab(index)}
                style={[
                  styles.button,
                  {
                    borderTopLeftRadius: nextFocus ? 25 : 0,
                    borderTopRightRadius: previousFocus ? 25 : 0,
                    borderBottomLeftRadius: isFocused ? 15 : 0,
                    borderBottomRightRadius: isFocused ? 15 : 0,
                  },
                  {backgroundColor: isFocused && 'black'},
                ]}>
                <Image source={image} />
              </TouchableOpacity>
            </View>
          );
        })}
      </LinearGradient>
    );
  }

  return (
    <View style={styles.row}>
      {buttons.map(({image}, index) => {
        const isFocused = activeIndex === index;
        const nextFocus = activeIndex + 1 === index;
        const previousFocus = activeIndex - 1 === index;
        return (
          <View style={styles.block} key={index}>
            <TouchableOpacity
              activeOpacity={1}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              onPress={() => NavigationUtils.changeBottomTab(index)}
              style={[
                styles.button,
                {
                  borderTopLeftRadius: nextFocus ? 25 : 0,
                  borderTopRightRadius: previousFocus ? 25 : 0,
                  borderBottomLeftRadius: isFocused ? 15 : 0,
                  borderBottomRightRadius: isFocused ? 15 : 0,
                  backgroundColor: isFocused
                    ? 'transaparent'
                    : 'rgb(56,132, 204)',
                },
              ]}>
              <Image source={image} />
            </TouchableOpacity>
            <View style={styles.lower} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabletRow: {
    paddingTop: 70,
    height: height,
    width: 300,
  },
  row: {
    flexDirection: 'row',
    height: 75,
  },
  block: {
    flex: 1,
    height: 75,
  },
  blockTablet: {
    width: 300,
  },
  button: {
    height: 55,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTablet: {
    height: 70,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  lower: {
    backgroundColor: 'rgb(56,132, 204)',
    height: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default TabBar;
