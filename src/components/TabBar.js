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
import DeviceInfo from 'react-native-device-info';
const height = Dimensions.get('window').height;

let isTablet = DeviceInfo.isTablet();

const TabBar = ({activeIndex = 0, theme}) => {
  const buttons = [
    {
      id: 'home',
      image: Images.home,
    },
    {
      id: 'add',
      image: Images.add,
    },
    {
      id: 'library',
      image: theme === 'dark' ? Images.library1 : Images.library,
    },
    {
      id: 'more',
      image: Images.more,
    },
  ];
  let color = 'rgb(21,145, 255)';
  if (theme === 'black') {
    color = '#212733';
  }

  if (isTablet) {
    return (
      <View style={styles.tabletRow}>
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
    height: height,
    width: 80,
  },
  row: {
    flexDirection: 'row',
    height: 75,
  },
  block: {
    flex: 1,
    height: 75,
  },
  button: {
    height: 55,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
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
