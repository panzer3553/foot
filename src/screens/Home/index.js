import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Container from '../../components/Container';
import {Heading1, Heading2, Text} from '../../components/Text';
import {hasNotch} from 'react-native-device-info';
import Carousel from 'react-native-snap-carousel';
import {Images} from '../../themes';
import Canvas from '../../components/Canvas';
import {NavigationUtils} from '../../navigation';
import {useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {useDeviceOrientation} from '@react-native-community/hooks';

let isTablet = DeviceInfo.isTablet();

const width = Dimensions.get('window').width;

export default function About({navigation}) {
  const record = useSelector((state) => state.record.data);

  const goToEdit = (item) => {
    NavigationUtils.push({
      screen: 'viewImage',
      isTopBarEnable: false,
      passProps: {
        data: item,
      },
    });
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => goToEdit(item)}>
        <Canvas
          imageSource={{uri: item.originalImage}}
          text={item.name}
          imageStyle={styles.image}
          style={styles.canvasStyle}
        />
      </TouchableOpacity>
    );
  };

  const welcome = (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.1)',
        margin: 20,
        padding: 20,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginTop: 35,
      }}>
      <Heading2>Welcome back, it has been a month for last footprint</Heading2>
    </View>
  );

  const renderTablet = (
    <View style={{flex: 1}}>
      {welcome}
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Heading2 style={{margin: 30}}>Latest Composition</Heading2>
        <ScrollView horizontal={true} contentContainerStyle={{height: 120}}>
          {record.map((e, i) => renderItem({item: e, index: i}))}
        </ScrollView>
      </View>
    </View>
  );
  return (
    <Container style={styles.container}>
      <Heading1 style={{paddingHorizontal: 20}}>Baby Footprints</Heading1>
      {!isTablet && (
        <Heading2 style={{marginBottom: 20, paddingHorizontal: 20}}>
          Latest pictures
        </Heading2>
      )}
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
      ) : isTablet ? (
        renderTablet
      ) : (
        <Carousel
          style={{flex: 1, alignSelf: 'center'}}
          data={record}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width - 130}
        />
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
    width: isTablet ? 150 : width - 135,
    height: isTablet ? 260 : (width - 135) * 1.5,
    borderRadius: 25,
  },
  canvasStyle: {
    marginHorizontal: isTablet ? 30 : 0,
  },
});
