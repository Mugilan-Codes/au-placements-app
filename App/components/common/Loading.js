import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const Loading = ({size, color}) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

Loading.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

Loading.defaultProps = {
  size: 'large',
  color: '#6646ee',
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
