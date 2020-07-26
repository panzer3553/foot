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
import {Heading1, Heading2, Text, Heading4} from '../../components/Text';
import {hasNotch} from 'react-native-device-info';
import Carousel from 'react-native-snap-carousel';
import {Images} from '../../themes';
import {NavigationUtils} from '../../navigation';
import {useSelector} from 'react-redux';

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
        <FlatList
          data={record}
          renderItem={({item, index, separators}) => (
            <Row item={item} index={index} length={record.length} />
          )}
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
