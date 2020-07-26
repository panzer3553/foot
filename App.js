import {Navigation} from 'react-native-navigation';
import {registerScreens, routes} from './src/navigation';

export const startApp = () => {
  registerScreens();
  try {
    Navigation.setRoot(routes.rootMainRoute);
  } catch (err) {
    console.log(err);
  }
};
