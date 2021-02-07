import React from 'react';
import {View, StyleSheet} from 'react-native';

const ListSeparator = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    height: 2,
    marginHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.5)', // TODO: change according to the theme
  },
});

export default ListSeparator;
