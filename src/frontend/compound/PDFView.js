import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';

const PDFView = () => {
  const source = {
    uri: 'http://www.africau.edu/images/default/sample.pdf', // Or use local: require('../assets/report.pdf')
    cache: true,
  };

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});

export default PDFView;
