import React from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import Container from '../../components/Container';
import {Heading1, Heading2, Text} from '../../components/Text';
import {hasNotch} from 'react-native-device-info';
import Carousel from 'react-native-snap-carousel';
import {Images} from '../../themes';
import Canvas from '../../components/Canvas';
import {NavigationUtils} from '../../navigation';
import {useSelector} from 'react-redux';

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
        />
      </TouchableOpacity>
    );
  };

  return (
    <Container style={styles.container}>
      <Heading1 style={{paddingHorizontal: 20}}>Baby Footprints</Heading1>
      <Heading2 style={{marginBottom: 20, paddingHorizontal: 20}}>
        Latest pictures
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
    width: width - 135,
    height: (width - 135) * 1.5,
    borderRadius: 25,
  },
});
