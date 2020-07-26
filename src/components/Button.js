import React, {PureComponent} from 'react';
import {
  TouchableOpacity,
  Platform,
  View,
  TouchableNativeFeedback,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import {ButtonText} from './Text';
import {Colors, Metrics, Images} from '../themes';

class Button extends PureComponent {
  getAndroidBackgroundColor(color) {
    if (Platform.Version >= 21) {
      return TouchableNativeFeedback.Ripple(color);
    }
    return TouchableNativeFeedback.SelectableBackground();
  }

  mapPropsToStyle = (style) => {
    const computedStyles = Object.keys(this.props).reduce((acc, key) => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.props[key] === true && style[key]) {
        acc.push(style[key]);
        return acc;
      }
      return acc;
    }, []);
    return computedStyles;
  };

  render() {
    const {
      color,
      icon,
      text,
      textColor,
      children,
      style,
      onPress,
      androidRippleColor,
      loading,
      disabled,
    } = this.props;
    if (Platform.OS === 'ios' || Platform.Version <= 21) {
      return (
        <TouchableOpacity
          {...this.props}
          style={[
            styles.default,
            {
              backgroundColor: color,
              borderColor: color,
            },
            ...this.mapPropsToStyle(styles),
            style,
            disabled && styles.disabled,
          ]}
          activeOpacity={0.7}
          onPress={!loading && onPress}>
          {loading && (
            <ActivityIndicator
              size="small"
              color="white"
              style={{marginRight: 7}}
            />
          )}
          {icon ? (
            <Image source={Images.mapIcon} style={{marginRight: 7}} />
          ) : null}
          {text ? <ButtonText color={textColor}>{text}</ButtonText> : children}
        </TouchableOpacity>
      );
    }
    return (
      <TouchableNativeFeedback
        onPress={!loading && onPress}
        background={
          androidRippleColor
            ? this.getAndroidBackgroundColor(androidRippleColor)
            : this.getAndroidBackgroundColor(Colors.androidRippleColor)
        }
        {...this.props}>
        <View
          style={[
            styles.default,
            ...this.mapPropsToStyle(styles),
            style,
            disabled && styles.disabled,
          ]}>
          {loading && <ActivityIndicator size="small" color="white" />}
          {icon ? (
            <Image source={Images.mapIcon} style={{marginRight: 7}} />
          ) : null}
          {text ? <ButtonText color={textColor}>{text}</ButtonText> : children}
        </View>
      </TouchableNativeFeedback>
    );
  }
}

Button.propTypes = {
  ...TouchableOpacity.propTypes,
  block: PropTypes.bool,
  full: PropTypes.bool,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
};

const styles = StyleSheet.create({
  default: {
    // backgroundColor: Colors.main,
    // borderColor: Colors.main,
    // height: 50,
    // alignSelf: 'flex-start',
    // flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    // borderRadius: 28,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  inverted: {
    marginHorizontal: 40,
    backgroundColor: 'white',
    borderColor: 'white',
    height: 50,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  transparent: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  block: {
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  full: {
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  disabled: {
    backgroundColor: '#b5b5b5',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  rounded: {
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    width: 80,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  large: {
    width: 120,
    paddingVertical: 12,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  small: {
    flex: 0,
    height: 30,
    width: 70,
    marginHorizontal: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  medium: {
    height: 40,
    width: 90,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  square: {
    height: 40,
    width: 40,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  squareSmall: {
    height: 22,
    width: 22,
    marginHorizontal: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 6,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  bottom: {
    marginHorizontal: 20,
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  light: {
    backgroundColor: 'rgba(0,0,0, 0.3)',
    borderColor: '#979797',
  },
});

export default Button;
