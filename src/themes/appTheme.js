import { configureFonts, DefaultTheme } from 'react-native-paper';
import * as Colors from './colors';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Lato',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Lato-Bold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Lato-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Lato-Thin',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Lato',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Lato-Bold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Lato-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Lato-Thin',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.whiteOne,
    primary: Colors.purpleHeart,
    accent: Colors.orange700,
    primaryButtonLabel: '#FFF',
  },
  fonts: configureFonts(fontConfig),
};

export default theme;
