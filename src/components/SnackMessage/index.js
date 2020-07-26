import React, { useState, useEffect } from 'react';
import { withTheme, Snackbar } from 'react-native-paper';

const SnackMessage = ({ theme, onPress, show, msg, style, onDismiss }) => {
  const [showSnack, setShowSnack] = useState(show);

  useEffect(() => {
    setShowSnack(show);
  }, [show]);

  if (show) {
    return (
      <Snackbar
        visible={showSnack}
        onDismiss={() => {
          setShowSnack(false);
          onDismiss();
        }}
        style={style}
      >
        {msg}
      </Snackbar>
    )
  }
  return null;
};

export default withTheme(SnackMessage);

SnackMessage.defaultProps = {
  show: false,
  msg: '',
  style: {},
  onDismiss: () => {}
};
