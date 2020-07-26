import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

import { useDispatch } from 'react-redux';
import { Button, TextInput, Text, withTheme, List, Divider } from 'react-native-paper';
import { rootNavigate, rootReplace } from '../../navigation/services';
import { actions as authActions } from '../../redux/auth';

const Information = ({ theme }) => {
  const dispatch = useDispatch();

  useEffect(() => { }, []);

  return <View style={[styles.safeView]}><Text>Information</Text></View>;
};

export default withTheme(Information);

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
});
