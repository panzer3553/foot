import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../../themes';
import LinearGradient from 'react-native-linear-gradient';
import TabBar from '../TabBar';
import DeviceInfo from 'react-native-device-info';
import {useDeviceOrientation} from '@react-native-community/hooks';

let isTablet = DeviceInfo.isTablet();

const Container = ({
  awareInput,
  center,
  style,
  loading,
  children,
  haveTextInput,
  scrollEnabled,
  contentContainerStyle,
  extraScrollHeight,
  extraHeight,
  activeIndex,
  theme,
  showTabBar = true,
}) => {
  const orientation = useDeviceOrientation();
  const isLandscape = orientation.landscape;
  if (awareInput) {
    return (
      <KeyboardAwareScrollView
        style={{backgroundColor: 'white'}}
        keyboardShouldPersistTaps="always"
        extraScrollHeight={extraScrollHeight}
        extraHeight={extraHeight}
        contentContainerStyle={[center && styles.center, style && style]}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            {children}
            {loading && (
              <Modal
                animationType="none"
                transparent
                visible={loading}
                onRequestClose={() => {}}>
                <View style={styles.fadeView}>
                  <ActivityIndicator
                    color={Colors.primary}
                    size="large"
                    animating={loading}
                  />
                </View>
              </Modal>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    );
  }
  if (haveTextInput) {
    return (
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        contentContainerStyle={[center && styles.center, style && style]}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            {children}
            {loading && (
              <Modal
                animationType="none"
                transparent
                visible={loading}
                onRequestClose={() => {}}>
                <View style={styles.fadeView}>
                  <ActivityIndicator
                    color={Colors.primary}
                    size="large"
                    animating={loading}
                  />
                </View>
              </Modal>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
  if (scrollEnabled) {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        scrollEnabled
        keyboardDismissMode="on-drag"
        styles={[styles.container, center && styles.center, style && style]}
        contentContainerStyle={[
          {backgroundColor: 'white'},
          contentContainerStyle && contentContainerStyle,
        ]}>
        {children}
        {loading && (
          <Modal
            animationType="none"
            transparent
            visible={loading}
            onRequestClose={() => {}}>
            <View style={styles.fadeView}>
              <ActivityIndicator
                color={Colors.primary}
                size="large"
                animating={loading}
              />
            </View>
          </Modal>
        )}
      </ScrollView>
    );
  }

  let start;
  let end;
  let themeColor = ['rgb(151, 234, 255)', 'rgb(0, 131, 255)'];
  if (theme === 'black') {
    themeColor = ['#212733', '#212733'];
  } else if (theme === 'dark') {
    themeColor = ['#8888BC', '#A2A2E0'];
  }
  if (isTablet && isLandscape) {
    return (
      <LinearGradient
        colors={themeColor}
        style={[{flex: 1, flexDirection: 'row'}]}
        start={start}
        end={end}>
        {showTabBar && (
          <TabBar
            activeIndex={activeIndex}
            theme={theme}
            isLandscape={isLandscape}
          />
        )}
        <View style={[{flex: 1}, style && style]}>{children}</View>
        {loading && (
          <Modal
            animationType="none"
            transparent
            visible={loading}
            onRequestClose={() => {}}>
            <View style={styles.fadeView}>
              <ActivityIndicator
                color={Colors.primary}
                size="large"
                animating={loading}
              />
            </View>
          </Modal>
        )}
      </LinearGradient>
    );
  }
  return (
    <LinearGradient
      colors={themeColor}
      style={[{flex: 1}]}
      start={start}
      end={end}>
      <View style={[{flex: 1}, style && style]}>{children}</View>
      {showTabBar && (
        <TabBar
          activeIndex={activeIndex}
          theme={theme}
          isLandscape={isLandscape}
        />
      )}
      {loading && (
        <Modal
          animationType="none"
          transparent
          visible={loading}
          onRequestClose={() => {}}>
          <View style={styles.fadeView}>
            <ActivityIndicator
              color={Colors.primary}
              size="large"
              animating={loading}
            />
          </View>
        </Modal>
      )}
    </LinearGradient>
  );
};

Container.propTypes = {
  awareInput: PropTypes.bool,
  center: PropTypes.bool,
  children: PropTypes.node,
  contentContainerStyle: PropTypes.any,
  haveTextInput: PropTypes.bool,
  loading: PropTypes.bool,
  scrollEnabled: PropTypes.bool,
  style: PropTypes.any,
  activeIndex: PropTypes.number,
  theme: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fadeView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Container;
