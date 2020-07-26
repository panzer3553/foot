import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Container from '../../components/Container';
import {Heading2, Heading4, Text} from '../../components/Text';
import {hasNotch} from 'react-native-device-info';
import Button from '../../components/Button';
import {Images} from '../../themes';
import {useDispatch} from 'react-redux';
import {NavigationUtils} from '../../navigation';
import {isNull} from 'lodash';
const width = Dimensions.get('window').width;

const templates = [
  {
    id: 1,
    temp: Images.temp1,
    params: {
      color: '#D8D8D8',
    },
  },
  {
    id: 2,
    temp: Images.temp2,
    params: {
      color: '#5CC7DB',
      backgroundId: '1',
    },
  },
  //   {
  //     id: 3,
  //     temp: Images.temp3,
  //   },
  {
    id: 4,
    temp: Images.temp4,
    params: {
      color: '#E90000',
    },
  },
  {
    id: 5,
    temp: Images.temp5,
    params: {
      color: '#5CC7DB',
    },
  },
  {
    id: 6,
    temp: Images.temp6,
    params: {
      color: '#5CC7DB',
      backgroundId: '2',
    },
  },
];
export default function About({
  data,
  callbackEdit1,
  callbackEdit,
  componentId,
}) {
  const [tempData, setData] = React.useState(data);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [choose, setChoose] = React.useState(null);

  const processImage = async (params, id) => {
    try {
      setLoading(true);
      setChoose(id);
      const formData = new FormData();
      formData.append('mask', tempData.mask);
      console.log(params);
      if (params?.color) {
        console.log(params?.color);
        formData.append('color', params?.color);
      }
      if (params?.backgroundId) {
        formData.append('backgroundId', params?.backgroundId);
      }
      const result = await fetch(
        'https://footapp-api.hoangdabao.com/changeBg',
        {
          method: 'POST',
          body: formData,
        },
      );
      const newImage = await result.text();
      setData({...tempData, originalImage: newImage});
      //   setResultImage(json.image);
      //   setMark(json.mark);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const onSave = () => {
    if (callbackEdit1) {
      console.log('here');
      callbackEdit1(tempData);
    }
    NavigationUtils.pop();
  };

  const onCancel = () => {
    NavigationUtils.pop();
  };
  return (
    <Container style={styles.container} showTabBar={false} theme="dark">
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Heading4>{tempData?.name}</Heading4>
        <View style={{flex: 1}} />
        <Button text="Choose" rounded light onPress={onSave} />
        <Button text="Cancel" rounded onPress={onCancel} />
      </View>
      <View style={{flex: 1, marginVertical: 10, borderRadius: 40}}>
        {tempData?.originalImage && (
          <Image
            resizeMode="contain"
            source={{uri: tempData?.originalImage}}
            style={{flex: 1, width: width - 40, borderRadius: 40}}
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
      <View style={{height: 140, marginTop: 10}}>
        <ScrollView horizontal={true} contentContainerStyle={{height: 120}}>
          {templates.map((e) => (
            <TouchableOpacity
              key={e.id}
              onPress={() => processImage(e.params, e.id)}
              style={{
                padding: 5,
                backgroundColor: choose === e.id ? '#C2C1D9' : 'transparent',
                marginHorizontal: 5,
                borderRadius: 8,
              }}>
              <Image
                source={e.temp}
                style={{
                  width: 80,
                  height: 110,
                  borderRadius: 8,
                }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: hasNotch() ? 45 : 30,
  },
  text: {
    color: '#fff',
    paddingHorizontal: 20,
    fontSize: (width * 42) / 375,
    fontWeight: '300',
  },
});
