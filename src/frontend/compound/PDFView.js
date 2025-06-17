import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';

const PdfView = () => (
  <View style={{ flex: 1 }}>
    <WebView
      source={{ uri: 'http://www.africau.edu/images/default/sample.pdf' }}
      style={{ flex: 1 }}
    />
  </View>
);

export default PdfView;
