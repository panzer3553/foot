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
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          source={{uri: tempData?.originalImage}}
          style={{flex: 1, borderRadius: 20, width: width - 40}}
        />
      </View>
      <View style={styles.toolBar}>
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
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: hasNotch() ? 45 : 15,
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
  buttonBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
