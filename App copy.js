import { Navigation } from 'react-native-navigation';
import { registerScreens, routes } from './src/navigation';
import { getData } from './src/utils/persitUtil';
import { getConfig } from './src/redux/config/operations';
import { store } from './src/redux/store';

import * as Sentry from '@sentry/react-native';

Sentry.init({ 
  dsn: 'https://aa1df95984164d39a3073fbf913267c2@o390321.ingest.sentry.io/5270256', 
});


// Here some global listeners could be placed
// ...

export const startApp = () => {
  registerScreens();
  store.dispatch(getConfig());
  try {
    getData('access_token').then(token => {
      if (token) {
        Navigation.setRoot(routes.rootMainRoute);
      } else {
        Navigation.setRoot(routes.rootLoginRoute);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
