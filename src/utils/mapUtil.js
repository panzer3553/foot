import GeoLocation from '@react-native-community/geolocation';
import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    const permissions =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    check(permissions)
      .then((status) => {
        if (status === RESULTS.DENIED) {
          return request(permissions);
        }

        return status;
      })
      .then((status) => {
        if (status === RESULTS.GRANTED) {
          GeoLocation.getCurrentPosition(
            (res) => {
              const { coords } = res;
              const { latitude, longitude } = coords;
              console.log('status', coords);
              resolve({
                latitude,
                longitude,
              });
            },
            (error) => {
              console.log('ERROR location', error);
              reject(error);
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
          );
        }
      });
  });
};
