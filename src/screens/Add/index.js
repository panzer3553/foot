import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import Container from '../../components/Container';
import Divider from '../../components/Divider';
import {Heading1, Heading4, Text} from '../../components/Text';
import {hasNotch} from 'react-native-device-info';
import {Images} from '../../themes';
import {RNCamera} from 'react-native-camera';
import {NavigationUtils} from '../../navigation';

const width = Dimensions.get('window').width;

export default function About({navigation}) {
  const camera = React.useRef(null);
  const [tabIndex, setTabIndex] = React.useState(0);
  const takePicture = async () => {
    const options = {
      quality: 1,
      base64: true,
      orientation: 'portrait',
      width: 996,
      height: 1560,
      fixOrientation: true,
    };
    const data = await camera.current.takePictureAsync(options);
    NavigationUtils.push({
      screen: 'preview',
      isTopBarEnable: false,
      isAnimation: false,
      passProps: {
        base64: data.base64,
        type: tabIndex,
      },
    });
  };

  return (
    <Container style={styles.container} activeIndex={1} theme="black">
      <View
        style={{
          flexDirection: 'row',
          height: 75,
          alignItems: 'center',
        }}>
        <TouchableHighlight
          style={{flex: 1, height: 75}}
          onPress={() => setTabIndex(0)}>
          <View style={{flex: 1, justifyContent: 'center', height: 75}}>
            <Heading4
              color={tabIndex === 0 && '#4A95D2'}
              style={{textAlign: 'center'}}>
              Footprint
            </Heading4>
          </View>
        </TouchableHighlight>
        <Divider type="vertical" />
        <TouchableHighlight
          style={{flex: 1, height: 75}}
          onPress={() => setTabIndex(1)}>
          <View style={{flex: 1, justifyContent: 'center', height: 75}}>
            <Heading4
              color={tabIndex === 1 && '#4A95D2'}
              style={{textAlign: 'center'}}>
              Handprint
            </Heading4>
          </View>
        </TouchableHighlight>
      </View>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <RNCamera
          ref={camera}
          style={styles.preview}
          captureAudio={false}
          type={RNCamera.Constants.Type.back}
          // flashMode={RNCamera.Constants.FlashMode.on}
          onTap={takePicture}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={tabIndex === 0 ? Images.foot : Images.hand} />
        </View>
      </View>
      <View style={styles.end}>
        <Heading4 style={{flex: 1, textAlign: 'center'}}>
          Hold still for a moment
        </Heading4>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: hasNotch() ? 15 : 0,
  },
  text: {
    color: '#fff',
    paddingHorizontal: 20,
    fontSize: (width * 42) / 375,
    fontWeight: '300',
  },
  slide: {
    backgroundColor: '#555575',
    borderRadius: 25,
    padding: 3,
  },
  image: {
    width: width - 135,
    height: (width - 135) * 1.5,
    borderRadius: 25,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  end: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
});
