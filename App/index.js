import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {displayName as appName} from '../app.json';

const App = () => {
  return (
    <View style={styles.genericView}>
      <Text style={styles.genericText}>{appName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  genericView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genericText: {
    fontSize: 40,
    color: 'red',
  },
});

export default App;
