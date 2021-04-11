import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider} from 'react-native-paper';

const ListSeparator = () => {
  return <Divider style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    height: 2,
    marginHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.5)', // TODO: change according to the theme
  },
});

export default ListSeparator;
