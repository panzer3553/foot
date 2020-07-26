import React from 'react';
import Proptypes from 'prop-types';
import { Button, withTheme } from 'react-native-paper';
import { i18nTranslator } from '../../i18n';
import styles from '../../themes/appStyles';
import { Colors } from '../../themes';

function BottomButton({ onPress, theme, title, style, contentStyle, disabled,...otherProps }) {
  const onPressButton = () => {
    if (typeof onPress === 'function') {
      onPress();
    }
  };

  return (
    <Button
      {...otherProps}
      mode="contained"
      theme={{
        colors: {
          primary: Colors.black,
        },
      }}
      style={[styles.bottomButton, style, disabled && styles.disabled]}
      contentStyle={[styles.bottomButtonContent, contentStyle]}
      onPress={onPressButton}
      disabled={disabled}
      labelStyle={{ color: theme.colors.primaryButtonLabel }}>
      {i18nTranslator(title)}
    </Button>
  );
}

BottomButton.propTypes = {
  onPress: Proptypes.func,
  disabled: Proptypes.bool,
};

BottomButton.defaultProps = {
  disabled: false,
  contentStyle: {},
  style: {},
};

export default withTheme(BottomButton);
