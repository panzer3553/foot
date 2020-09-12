import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import Container from '../../components/Container';
import {Heading1, Heading2} from '../../components/Text';
import {hasNotch} from 'react-native-device-info';
import Divider from '../../components/Divider';
import {Images} from '../../themes';
import {NavigationUtils} from '../../navigation';
import {actions as recordActions} from '../../redux/record';
import {useDispatch} from 'react-redux';
import {useDeviceOrientation} from '@react-native-community/hooks';
import DeviceInfo from 'react-native-device-info';
import Canvas from '../../components/Canvas';

let isTablet = DeviceInfo.isTablet();

const width = Dimensions.get('window').width;

export default function ViewImage({data}) {
  const [tempData, setData] = React.useState(data);
  const dispatch = useDispatch();

  const onEdit = () => {
    NavigationUtils.push({
      screen: 'editImage',
      isTopBarEnable: false,
      passProps: {
        data: tempData,
        operation: 'edit',
        callbackEdit: setData,
      },
    });
  };

  const onDelete = () => {
    Alert.alert(
      'Are you sure to delete this?',
      "This image will be permanently deleted and can't be undone",
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(recordActions.remove(tempData.id));
            NavigationUtils.pop();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const toolbar = (
    <View style={!isTablet ? styles.toolBar : styles.toolBarTablet}>
      {[
        {name: 'pencil', onPress: onEdit},
        {name: 'share'},
        {name: 'delete', onPress: onDelete},
        {name: 'menu'},
      ].map((e) => (
        <TouchableOpacity
          onPress={e.onPress}
          style={styles.buttonBar}
          key={e.name}>
          <Image source={Images[e.name]} />
        </TouchableOpacity>
      ))}
    </View>
  );
  return (
    <Container style={styles.container} activeIndex={2} theme="dark">
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => NavigationUtils.pop()}
          style={styles.back}>
          <Image source={Images.back} />
        </TouchableOpacity>
        <Heading2 style={{marginLeft: 10, marginBottom: 10}}>
          {tempData?.name}
        </Heading2>
      </View>
      <View style={[isTablet && styles.containerTablet, {flex: 1}]}>
        {isTablet && <View style={{flex: 1}} />}
        <View
          style={{
            flex: 2,
            alignItems: 'center',
            marginBottom: isTablet ? 30 : 0,
          }}>
          <Image
            source={{uri: tempData?.originalImage}}
            style={{
              flex: 1,
              borderRadius: 20,
              width: isTablet ? '100%' : width - 40,
            }}
          />
        </View>
        {toolbar}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: hasNotch() ? 45 : 15,
  },
  containerTablet: {
    flexDirection: 'row',
  },
  back: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    paddingHorizontal: 20,
    fontSize: (width * 42) / 375,
    fontWeight: '300',
  },
  navBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  toolBar: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  toolBarTablet: {
    height: 400,
    width: 70,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginVertical: 20,
    marginHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
  },
  buttonBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
