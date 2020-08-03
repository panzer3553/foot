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
import {Heading1, Heading4, Text} from '../../components/Text';
import {hasNotch} from 'react-native-device-info';
import Button from '../../components/Button';
import DialogInput from '../../components/DialogInput';
import {Images} from '../../themes';
import {actions as recordActions} from '../../redux/record';
import {useDispatch} from 'react-redux';
import {NavigationUtils} from '../../navigation';
import {Navigation} from 'react-native-navigation';
const width = Dimensions.get('window').width;

export default function About({
  data,
  activeIndex,
  operation,
  callbackEdit,
  componentId,
}) {
  const [tempData, setData] = React.useState(data);
  const [closedModal, setClosedModal] = React.useState(false);
  const dispatch = useDispatch();

  const changeName = (name) => {
    setData({...tempData, name: name});
  };

  const openModal = () => {
    setClosedModal(true);
  };

  const onSave = () => {
    console.log(operation);
    if (operation === 'add') {
      dispatch(recordActions.add(tempData));
      Navigation.popToRoot(componentId);
      NavigationUtils.changeBottomTab(0);
    } else if (operation === 'edit') {
      dispatch(recordActions.update({id: tempData.id, data: tempData}));
      if (callbackEdit) {
        callbackEdit(tempData);
      }
      NavigationUtils.pop();
    }
  };

  const onCancel = () => {
    if (operation === 'add') {
      Navigation.popToRoot(componentId);
    } else if (operation === 'edit') {
      NavigationUtils.pop();
    }
  };

  const goToTemplate = () => {
    NavigationUtils.push({
      screen: 'template',
      isTopBarEnable: false,
      passProps: {
        data: tempData,
        callbackEdit: callbackEdit,
        callbackEdit1: setData,
      },
    });
  };

  return (
    <Container
      style={styles.container}
      activeIndex={activeIndex || 2}
      theme="dark">
      <Heading4>{tempData?.name}</Heading4>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={openModal}>
          <Image source={Images.pencil} style={{width: 25, height: 25}} />
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <Button text="Save" rounded light onPress={onSave} />
        <Button text="Cancel" rounded onPress={onCancel} />
      </View>
      <View style={{flex: 1, marginVertical: 10, borderRadius: 40}}>
        {tempData?.originalImage && (
          <Image
            source={{uri: tempData?.originalImage}}
            style={{flex: 1, width: width - 60, borderRadius: 40}}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={{height: 48, marginTop: 15}}>
        <ScrollView horizontal={true} contentContainerStyle={{height: 48}}>
          <Button text="Templates" rounded large light onPress={goToTemplate} />
          <Button text="Look" rounded large light />
          <Button text="Tool" rounded large light />
        </ScrollView>
      </View>
      <DialogInput
        isDialogVisible={closedModal}
        title={'Change name'}
        hintInput={'Enter name'}
        initValueTextInput={tempData.name}
        submitInput={(inputText) => {
          changeName(inputText);
          setClosedModal(false);
        }}
        closeDialog={() => {
          setClosedModal(false);
        }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: hasNotch() ? 45 : 15,
  },
  text: {
    color: '#fff',
    paddingHorizontal: 20,
    fontSize: (width * 42) / 375,
    fontWeight: '300',
  },
});
