import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {Colors} from '../../styles';
import {Dimensions} from '../../utils';

const FormButton = ({label, ...props}) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.buttonLabel}>{label.toUpperCase()}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: Dimensions.WINDOW_WIDTH / 2,
    height: Dimensions.WINDOW_HEIGHT / 15,
    backgroundColor: Colors.SECONDARY,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 28,
    color: '#ffffff',
  },
});

export default FormButton;
