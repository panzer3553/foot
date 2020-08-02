import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Container from '../../components/Container';
import Divider from '../../components/Divider';
import {Heading1, Heading4, Text} from '../../components/Text';
import {hasNotch} from 'react-native-device-info';
import {Images} from '../../themes';
import UUIDGenerator from 'react-native-uuid-generator';
import {NavigationUtils} from '../../navigation';
import {v4 as uuidv4} from 'uuid';

const width = Dimensions.get('window').width;

export default function About({base64, type}) {
  const [resultImage, setResultImage] = React.useState(null);
  const [mask, setMask] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const processImage = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('imgBase64', base64);
      formData.append('color', '#888888');
      const result = await fetch(
        type === 0
          ? 'https://footapp-api.hoangdabao.com/getMaskFoot'
          : 'https://footapp-api.hoangdabao.com/getMask',
        {
          method: 'POST',
          body: formData,
        },
      );
      const json = await result.json();
      setResultImage(json.image);
      setMask(json.mask);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const goToEditImage = async () => {
    const uuid = await UUIDGenerator.getRandomUUID();
    NavigationUtils.push({
      screen: 'editImage',
      isTopBarEnable: false,
      passProps: {
        data: {
          id: uuid,
          mask: mask,
          originalImage: resultImage,
          createdAt: new Date().toISOString(),
          name: new Date()
            .toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })
            .split(' ')
            .join('-'),
        },
        activeIndex: 1,
        operation: 'add',
      },
    });
  };
  return (
    <Container style={styles.container} activeIndex={1} theme="black">
      <View style={styles.end}>
        <Heading4 style={{flex: 1, textAlign: 'center'}}>Preview</Heading4>
      </View>
      <View style={{flex: 1}}>
        {base64 && (
          <Image
            source={{uri: resultImage || `data:image/png;base64,${base64}`}}
            style={{flex: 1}}
          />
        )}
        {loading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.3)',
              paddingHorizontal: 40,
            }}>
            <Heading4 style={{textAlign: 'center'}}>
              Please be patient. We are processing your image
            </Heading4>
          </View>
        )}
      </View>
      <View style={{flexDirection: 'row', height: 75, alignItems: 'center'}}>
        {!loading ? (
          <>
            <TouchableHighlight
              style={{flex: 1, height: 75}}
              onPress={() => NavigationUtils.pop()}>
              <View style={{flex: 1, justifyContent: 'center', height: 75}}>
                <Heading4 style={{textAlign: 'center'}}>Start again</Heading4>
              </View>
            </TouchableHighlight>
            <Divider type="vertical" />
            <TouchableHighlight
              style={{flex: 1, height: 75}}
              onPress={resultImage ? goToEditImage : processImage}>
              <View style={{flex: 1, justifyContent: 'center', height: 75}}>
                <Heading4 style={{textAlign: 'center'}}>
                  {resultImage ? 'Continue' : 'Process'}
                </Heading4>
              </View>
            </TouchableHighlight>
          </>
        ) : (
          <Heading4 style={{flex: 1, textAlign: 'center'}}>Loading</Heading4>
        )}
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
