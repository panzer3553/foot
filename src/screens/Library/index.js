import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Container from '../../components/Container';
import Divider from '../../components/Divider';
import {Heading1, Heading2, Text, Heading4} from '../../components/Text';
import {hasNotch} from 'react-native-device-info';
import Carousel from 'react-native-snap-carousel';
import {Images} from '../../themes';
import {NavigationUtils} from '../../navigation';
import {useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {useDeviceOrientation} from '@react-native-community/hooks';
import Canvas from '../../components/Canvas';

let isTablet = DeviceInfo.isTablet();

const width = Dimensions.get('window').width;

const Row = ({item, index, separators, length}) => {
  const odd = index % 2 === 1;
  const end = index === length - 1;
  const image = (
    <View style={{flex: 1, alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          NavigationUtils.push({
            screen: 'viewImage',
            isTopBarEnable: false,
            passProps: {
              data: item,
            },
          });
        }}>
        <View
          style={{
            borderRadius: 8,
            backgroundColor: 'black',
            padding: 2,
          }}>
          <Image
            source={{uri: item.originalImage}}
            style={{width: 80, height: 120, borderRadius: 8}}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
  const text = (
    <View style={{flex: 1}}>
      <Heading4
        color="white"
        style={[
          {textAlign: odd ? 'left' : 'right'},
          !odd ? {marginRight: 20} : {marginLeft: 20},
        ]}>
        {item.name}
      </Heading4>
    </View>
  );

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {odd ? image : text}
      <View style={{height: '100%', alignItems: 'center'}}>
        <View
          style={{
            width: 3,
            backgroundColor: index === 0 ? 'transparent' : 'white',
            flex: 1,
          }}
        />
        <View
          style={{
            backgroundColor: 'transparent',
            borderRadius: 8,
            width: 16,
            height: 16,
            borderWidth: 3,
            borderColor: 'white',
          }}
        />
        <View style={{width: 3, backgroundColor: 'white', flex: 1}} />
      </View>
      {odd ? text : image}
    </View>
  );
};

const RowTablet = ({item, index, separators, length}) => {
  const odd = index % 2 === 1;
  const end = index === length - 1;
  const image = (
    <View style={{flex: 1, alignItems: 'center', marginTop: odd ? 100 : 0}}>
      <TouchableOpacity
        onPress={() => {
          NavigationUtils.push({
            screen: 'viewImage',
            isTopBarEnable: false,
            passProps: {
              data: item,
            },
          });
        }}>
        <Canvas
          imageSource={{uri: item.originalImage}}
          text={item.name}
          imageStyle={styles.canvasImage}
          style={styles.canvasStyle}
        />
      </TouchableOpacity>
    </View>
  );
  const text = (
    <View style={{flex: 1}}>
      <Heading4
        color="white"
        style={[
          {textAlign: odd ? 'left' : 'right'},
          !odd ? {marginRight: 20} : {marginLeft: 20},
        ]}>
        {item.name}
      </Heading4>
    </View>
  );

  return image;
};

export default function Library({}) {
  const record = useSelector((state) => state.record.data);
  return (
    <Container style={styles.container} activeIndex={2}>
      <Heading1 style={{paddingHorizontal: 20}}>Baby Footprints</Heading1>
      <Heading2 style={{marginBottom: 20, paddingHorizontal: 20}}>
        Library
      </Heading2>
      {record.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Heading2>No image available</Heading2>
        </View>
      ) : (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <FlatList
            style={{flex: 0.6}}
            data={record}
            numColumns={isTablet ? 2 : 1}
            renderItem={({item, index, separators}) =>
              isTablet ? (
                <RowTablet item={item} index={index} length={record.length} />
              ) : (
                <Row item={item} index={index} length={record.length} />
              )
            }
            ListFooterComponent={
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}} />
                <Divider type="haft-vertical" />
                <View style={{flex: 1}} />
              </View>
            }
          />
          {isTablet && (
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                flex: 0.4,
                marginRight: 30,
                borderRadius: 30,
                marginBottom: 20,
                padding: 20,
              }}>
              <Heading2>Filters</Heading2>
            </View>
          )}
        </View>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: hasNotch() ? 45 : 30,
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
  canvasImage: {
    width: isTablet ? 150 : width - 135,
    height: isTablet ? 260 : (width - 135) * 1.5,
    borderRadius: 25,
  },
  canvasStyle: {
    marginHorizontal: isTablet ? 30 : 0,
  },
});
