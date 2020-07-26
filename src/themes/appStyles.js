import { StyleSheet } from 'react-native';
import * as Colors from './colors';

const styles = StyleSheet.create({
  bottomButton: {
    marginBottom: 6,
    justifyContent: 'center',
    backgroundColor: Colors.black,
    borderRadius: 25,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    elevation: 3,
    marginHorizontal: 16,
    height: 50,
  },
  bottomButtonContent: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
  },
  paragraphContent: {
    marginVertical: 6,
    marginHorizontal: 16,
    textAlign: 'justify'
  },
  disabled: {
    backgroundColor: Colors.lightGrey,
  }
});

export default styles;
