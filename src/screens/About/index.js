import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Container from '../../components/Container';
import {Heading1, Heading2} from '../../components/Text';
import {hasNotch} from 'react-native-device-info';
import Divider from '../../components/Divider';
const width = Dimensions.get('window').width;

export default function About({navigation}) {
  return (
    <Container style={styles.container} activeIndex={3}>
      <Heading1 style={{marginBottom: 60}}>More</Heading1>
      <Divider />
      <Heading2>About</Heading2>
      <Divider />
      <Heading2>Terms and conditions</Heading2>
      <Divider />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: hasNotch() ? 45 : 30,
  },
  text: {
    color: '#fff',
    paddingHorizontal: 20,
    fontSize: (width * 42) / 375,
    fontWeight: '300',
  },
});
