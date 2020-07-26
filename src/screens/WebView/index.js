import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator} from 'react-native';
import { withTheme } from 'react-native-paper';
import WebView from 'react-native-webview';

const About = ({link}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, []);
  console.log(loading);
  return (
    <View style={{flex: 1}}>
      <WebView source={{ uri: link }} onLoadStart={() => setLoading(true)} onLoadEnd={() => setLoading(false)}/>
      {loading && <View style={{position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, alignItem: 'center', 'justifyContent': 'center'}}>
        <ActivityIndicator />
      </View>}
    </View>
  );
};

export default withTheme(About);

