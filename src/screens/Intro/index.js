import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
// import messaging from '@react-native-firebase/messaging';

import Button from '../../components/Button';
import {NavigationUtils} from '../../navigation';
import {Images, Colors, Layouts} from '../../themes';
import {i18nTranslator} from '../../i18n';
import {Navigation} from 'react-native-navigation';
import {routes} from '../../navigation';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const Logo_Ratio = 230 / 198;

const Intro = (props) => {
  const {colors} = props.theme;

  const onPressExplore = () => {
    NavigationUtils.push({
      screen: 'religion',
      title: 'Set Religion',
      passProps: {
        signup: true,
      },
    });
  };
  const onPressRegister = () => {
    NavigationUtils.push({screen: 'signup'});
  };
  const onPressLogin = () => {
    NavigationUtils.push({screen: 'login'});
  };

  return (
    <View style={[styles.safeView]}>
      <ImageBackground
        source={Images.INTRO_BG}
        resizeMode="repeat"
        style={styles.bgImage}>
        <View style={styles.container}>
          <View style={styles.center}>
            <Image source={Images.INTRO_IMAGE} style={styles.imgIntro} />
          </View>
          <View style={styles.btnGroup}>
            <Button
              default
              full
              uppercase={false}
              color="#B821CE"
              onPress={onPressExplore}
              text={i18nTranslator('BTN_EXPLORE')}
            />
            <Button
              default
              full
              color="#FF8900"
              uppercase={false}
              style={styles.btn}
              text={i18nTranslator('BTN_LOGIN')}
              onPress={onPressLogin}
            />
            <Button
              default
              full
              color="#000000"
              style={styles.btn}
              uppercase={false}
              text={i18nTranslator('BTN_REGISTER')}
              onPress={onPressRegister}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Intro;
const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btn: {
    marginTop: 16,
  },
  imgIntro: {
    alignSelf: 'center',
    height: SCREEN_WIDTH / 3 / Logo_Ratio,
    width: SCREEN_WIDTH / 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    lineHeight: 50,
    color: Colors.purpleHeart,
  },
  bgImage: {
    flex: 1,
  },
  btnGroup: {
    marginBottom: 70,
  },
});
