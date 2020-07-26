import { Dimensions, Platform } from 'react-native';
import { Colors } from '.';
import { hasNotch } from 'react-native-device-info';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const horizontalPadding = 16;

export default {
  // LAYOUT
  horizontalPadding,
  screenHeight,
  screenWidth,

  // RELIGION ITEM
  religionItemWidth: (screenWidth - horizontalPadding * 4) / 3,
  religionItemHeight: (screenWidth - horizontalPadding * 4) / 3,
  religionItemBorderRadius: 10,
  religionItemBorderWidth: 1,
  religionItemBorderColor: Colors.grey400,

  // TEXT INPUT
  textInputPlaceHolderColor: Colors.textGray,
  textInputIconColor: Colors.textLightGray,

  // BUTTON
  btnBorderRadius: 27,

  // HEADER
  headerHeight: {
    ...Platform.select({
      android: {
        marginTop: hasNotch() ? 16 : 0,
        height: hasNotch() ? 96 : 80,
      },
      ios: {
        marginTop: hasNotch() ? 16 : 4,
        height: hasNotch() ? 100 : 84,
      },
    }),
  },
};
