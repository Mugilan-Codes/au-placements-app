import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';

const ScreenHeader = ({title}) => {
  return (
    <View style={styles.content}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

ScreenHeader.propTypes = {
  title: PropTypes.string,
};

ScreenHeader.defaultProps = {
  title: 'ScreenHeader Title',
};

export default ScreenHeader;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 40,
  },
});
