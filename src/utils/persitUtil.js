import AsyncStorage from '@react-native-community/async-storage';
import isNil from 'lodash.isnil';

export async function storeData(key, value) {
  try {
    if (!isNil(value)) {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    // saving error
  }
}

export async function getData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (e) {
    return null;
  }
}

export async function removeValue(key) {
  try {
    const result = await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
    // remove error
  }
}
