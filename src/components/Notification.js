import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  InteractionManager,
} from 'react-native';
import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';
import { Text } from './Text';
import Touchable from './Touchable';
import { Colors } from '../themes';
import { NavigationUtils } from '../navigation';
import { Navigation } from 'react-native-navigation';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.animation = new Animated.Value(-500);
  }

  componentDidMount() {
    const { onDisplay, componentId } = this.props;
    this.toggleNotiAnim();
    if (onDisplay) {
      onDisplay(componentId);
    }
  }

  toggleNotiAnim = (isShow = true) => {
    const { autoDismissTime, isAutoDismiss } = this.props;
    const handle = InteractionManager.createInteractionHandle();
    Animated.spring(this.animation, {
      toValue: isShow ? -20 : -this.containerHeight,
      useNativeDriver: true,
    }).start(() => {
      InteractionManager.clearInteractionHandle(handle);
      if (!isShow) {
        Navigation.dismissOverlay(this.props.componentId);
      } else {
        isAutoDismiss &&
          setTimeout(() => {
            this.toggleNotiAnim(false);
          }, autoDismissTime);
      }
    });
  };

  render() {
    const { title, content, type } = this.props;
    return (
      <Animated.View
        style={[
          styles.wrapperView,
          {
            backgroundColor: BACKGROUND_TYPES[type],
            transform: [{ translateY: this.animation }],
          },
        ]}
        onLayout={({
          nativeEvent: {
            layout: { height },
          },
        }) => {
          this.containerHeight = height;
        }}>
        <Touchable
          style={styles.wrapperView}
          onPress={() => {
            this.toggleNotiAnim(false);
          }}>
          <View accessibilityTraits="plays" style={styles.container}>
            <Text color="white" style={styles.content}>
              {content}
            </Text>
          </View>
        </Touchable>
      </Animated.View>
    );
  }
}

Notification.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  type: PropTypes.string,
  autoDismissTime: PropTypes.number,
  isAutoDismiss: PropTypes.bool,
  componentId: PropTypes.string,
  onDisplay: PropTypes.func,
};

Notification.defaultProps = {
  autoDismissTime: 3000,
  isAutoDismiss: true,
  type: 'success',
};

const BACKGROUND_TYPES = {
  error: 'red',
  success: '#28a745',
};

const styles = StyleSheet.create({
  wrapperView: {
    width: Dimensions.get('window').width,
  },
  container: {
    alignItems: 'center',
    padding: 16,
    paddingTop: DeviceInfo.hasNotch() ? 50 : 36,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  content: {
    textAlign: 'center',
  },
});

export default Notification;
