import {Navigation} from 'react-native-navigation';
import {Linking, Alert} from 'react-native';
import VersionCheck from 'react-native-version-check';
import {startApp} from './App';

Navigation.events().registerAppLaunchedListener(() => {
  startApp();
  VersionCheck.needUpdate().then(async (res) => {
    if (res?.isNeeded) {
      Alert.alert(
        'New update',
        'New application version is available. Click Ok to upgrade now',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Ok', onPress: () => Linking.openURL(res.storeUrl)}, // open store if update is needed.                  ) }
        ],
        {cancelable: false},
      );
    }
  });
});
