import React from 'react';
import {View, StyleSheet} from 'react-native';

const ListSeparator = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#000',
  },
});

export default ListSeparator;
