import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';

import { Paragraph, Text } from '../Text';
import { AppStyles } from '../../themes';


const WebsiteNote = ({ onPress, theme }) => {
  return (
    <Paragraph style={AppStyles.paragraphContent}>
        Visit <Text onPress={onPress} uppercase={false} mode="text" color={theme.colors.primary}>vorship.com</Text> for more information and support.
    </Paragraph>
  )
}

WebsiteNote.propTypes = {
  onPress: PropTypes.func,
};

WebsiteNote.defaultProps = {
  onPress: () => {}
};

export default withTheme(WebsiteNote);

const styles = StyleSheet.create({

});
