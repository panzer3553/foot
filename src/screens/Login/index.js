import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import Container from '../../components/Container';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextInput, withTheme, HelperText } from 'react-native-paper';
import Button from '../../components/Button';
import { Heading1, Text, Heading4, Title, Heading5 } from '../../components/Text';
import { login } from '../../redux/auth/operations';
import { Colors, Layouts } from '../../themes';
import { i18nTranslator } from '../../i18n';
import { Navigation } from 'react-native-navigation';
import { routes, NavigationUtils } from '../../navigation';

const Login = ({exploreMode, componentId}) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(i18nTranslator('EMAIL_INVALID'))
        .required(i18nTranslator('EMAIL_REQUIRED')),
      password: Yup.string()
        .min(6, i18nTranslator('PASSWORD_MIN'))
        .max(20, i18nTranslator('PASSWORD_MAX'))
        .required(i18nTranslator('PASSWORD_REQUIRED')),
    }),
    onSubmit: async (values) => {
      await onPressLogin(values);
    },
  });

  const refPassword = useRef(null);

  const onPressLogin = async ({ email, password }) => {
    formik.setSubmitting(true);
    try {
      const result = await dispatch(login({ email, password }));
      if (result?.payload?.success) {
        if (exploreMode) {
          NavigationUtils.dismissAllModals();
        } else {
          Navigation.setRoot(routes.rootMainRoute);
        }
      } else {
        formik.setSubmitting(false);
      }
    } catch (err) {
      formik.setSubmitting(false);
      Alert.alert('Error', err.message || 'error');
    }
  };

  const onPressForgotPassword = () => {
    NavigationUtils.push({
      screen: 'forgotPassword',
      passProps: {
        loginId: componentId,
      },
    });
  };

  return (
      <Container haveTextInput style={styles.container}>
      <Heading1>{i18nTranslator('LABEL_LOGIN')}</Heading1>
      <Text style={ styles.txtWelcome }>{i18nTranslator('LABEL_WELCOME')}</Text>
      <Heading5>{i18nTranslator('LABEL_EMAIL')}</Heading5>
      <TextInput
        disabled={formik.isSubmitting}
        autoCapitalize="none"
        // label="email"
        placeholder={ i18nTranslator('PLACE_HOLDER_EMAIL') }
        mode="outlined"
        onBlur={ formik.handleBlur('email') }
        value={ formik.values.email }
        onChangeText={ formik.handleChange('email') }
        error={formik?.errors?.email}
        style={ styles.textInput }
        placeholderTextColor={ Colors.cadetBlue } // Not working for Android
        numberOfLines={ 1 }
        returnKeyType="next"
        onSubmitEditing={ () => refPassword && refPassword.current.focus() }
        theme={ { colors: { primary: Colors.purpleHeartFade200 } } }
      />
      <HelperText
        type="error"
        visible={!!formik?.errors?.email}
      >
        {formik?.errors?.email}
      </HelperText>
      <Heading5>{i18nTranslator('LABEL_PASSWORD')}</Heading5>
      <TextInput
        disabled={formik.isSubmitting}
        autoCapitalize="none"
        // label="password"
        placeholder={ i18nTranslator('PLACE_HOLDER_PASSWORD') }
        mode="outlined"
        onBlur={ formik.handleBlur('password') }
        value={ formik.values.password }
        onChangeText={ formik.handleChange('password') }
        error={formik?.errors?.password}
        secureTextEntry={ true }
        style={ styles.textInput }
        placeholderTextColor={ Colors.cadetBlue } // Not working for Android
        numberOfLines={ 1 }
        ref={ refPassword }
        returnKeyType="done"
        onSubmitEditing={ formik.handleSubmit }
        theme={ { colors: { primary: Colors.purpleHeartFade200 } } }
      />
      <HelperText
        type="error"
        visible={!!formik?.errors?.password}
      >
        {formik?.errors?.password}
      </HelperText>
      <TouchableOpacity
        style={{ marginHorizontal: 16, alignSelf: 'flex-end'}}
        onPress={onPressForgotPassword}
      >
        <Heading4 color={Colors.primary} style={{textAlign: 'right'}}>Forgot your password?</Heading4>
      </TouchableOpacity>
      <Button
        default
        full
        style={{marginVertical: 20, marginHorizontal: 16}}
        color="#000000"
        loading={ formik.isSubmitting }
        text={i18nTranslator('BTN_LOGIN')}
        onPress={ formik.handleSubmit }
      />
    </Container>
  );
};

export default withTheme(Login);

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 120,
  },
  textInput: {
    marginTop: 4,
    backgroundColor: 'white',
  },
  btnLogin: {
    marginTop: 30,
    backgroundColor: Colors.black,
    borderRadius: Layouts.btnBorderRadius,
  },
  btnLoginContent: {
    marginVertical: 6,
  },
  btnForgotPassword: {
    position: 'absolute',
    bottom: 24,
    maxWidth: 200,
    alignSelf: 'center',
  },
  txtLogin: {
    color: Colors.textBlack,
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 30,
    marginBottom: 10,
  },
  txtWelcome: {
    marginTop: 5,
    marginBottom: 15,
  },
  txtTitle: {
    fontWeight: 'bold',
  },
  txtFrgtPsswrd: {
    color: Colors.purpleHeart,
    fontSize: 14,
  },
  btnFrgtPsswrd: {
    marginTop: 10,
  },
});
